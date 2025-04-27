import { RequestHandler } from "express-serve-static-core";
import GroupModel from "../models/group";
import UserModel from "../models/user";
import * as dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

export const createGroup: RequestHandler = async (req, res) => {
  const { name, subGroups } = req.body;
  try {
    console.log("Creating group: ", name, subGroups);
    const group = await GroupModel.create({
      name,
      total: 0,
      paid: 0,
      owed: 0,
      percentage: 0,
      members: [],
      subGroups: subGroups
        ? subGroups.map((subGroup: string) => new Types.ObjectId(subGroup))
        : [],
    });
    console.log("Group created: ", group);
    res.status(201).json(group);
  } catch (error) {
    console.error("Error creating group: ", error);
    res.status(500).json({ message: "Error creating group" });
  }
};

export const addSubGroup: RequestHandler = async (req, res) => {
  const { groupId, subGroupName } = req.body;

  try {
    console.log("Adding subgroup to group: ", groupId, subGroupName);
    const subgroup = await GroupModel.create({
      name: subGroupName,
      total: 0,
      paid: 0,
      owed: 0,
      percentage: 0,
      members: [],
    });
    
    console.log("Subgroup created: ", subgroup);

    const group = await GroupModel.findByIdAndUpdate(
      groupId,
      { $push: { subGroups: subgroup._id } },
      { new: true }
    );

    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    console.log(group.members);
    console.log("Subgroup created: ", subgroup);

    if (group.members && group.members.length > 0) {
      for (const member of group.members) {
        console.log("Member: ", member);
        
        const user = await UserModel.findById(member.userId);
        console.log("User: ", user);

        const groupUser = await group.members.find(
          (member) => member.userId.toString() === user?._id.toString()
        );

        const userGroup = await user?.groups.find(
          (g) => g.groupId?.toString() === group._id.toString()
        );
        console.log("User group: ", userGroup);
        
        if (user) {
          const existingSubGroup = userGroup?.subGroups.find(
            (g) => g.groupId?.toString() == subgroup._id.toString()
          );

          if (!existingSubGroup) {
            userGroup?.subGroups.push({
              groupId: subgroup._id,
              groupName: subgroup.name,
              isAdmin: groupUser.isAdmin,
              balance: 0,
              transactions: [],
              requests: [],
            });
            await user.save();
          }

          subgroup.members.push({
            userId: user._id,
            userName: user.firstName + " " + user.lastName,
            isAdmin: groupUser.isAdmin,
            balance: 0,
            transactions: [],
            requests: [],
          })
        }
      }
    }
    await subgroup.save();
    console.log("Subgroup members updated: ", subgroup.members);
    res.status(201).json(subgroup);
  } catch (error) {
    console.error("Error creating subgroup: ", error);
    res.status(500).json({ message: "Error creating subgroup" });
  }
}

export const getGroupById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await GroupModel.findById(id)
      .populate("members")
      .populate("paidMembers")
      .populate("owedMembers")
      .populate("subGroups");
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group: ", error);
    res.status(500).json({ message: "Error fetching group" });
  }
};

export const getAllGroups: RequestHandler = async (req, res) => {
  try {
    const groups = await GroupModel.find()
      .populate("members")
      .populate("paidMembers")
      .populate("owedMembers")
      .populate("subGroups");
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    res.status(500).json({ message: "Error fetching groups" });
  }
};

// export const receivePayment: RequestHandler = async (req, res) => {
//   const { id } = req.params;
//   const { amount, userId } = req.body;
//   try {
//     console.log("Received payment: ", amount, userId);
//     const group = await GroupModel.findById(id);
//     if (!group) {
//       res.status(404).json({ message: "Group not found" });
//       return;
//     }
//     const user = group.members.find(
//       (member: { _id: Types.ObjectId }) => member._id.toString() === userId
//     );
//     if (!user) {
//       res.status(404).json({ message: "User not found in group" });
//       return;
//     }

//     console.log("Updating values");
//     group.paid += amount;
//     group.owed -= amount;
//     group.percentage = group.paid / group.total;
//     console.log("Paid: ", group.paid, " Owed: ", group.owed);

//     const previousPaid = group.paidMembers.get(userId) || 0;
//     group.paidMembers.set(userId, previousPaid + amount);
//     const previousOwed = group.owedMembers.get(userId) || 0;
//     group.owedMembers.set(userId, previousOwed - amount);

//     console.log("Paid members: ", group.paidMembers);
//     console.log("Owed members: ", group.owedMembers);

//     await group.save();
//     console.log("Payment received and group updated");
//     res.status(200).json(group);
//   } catch (error) {
//     console.error("Error receiving payment: ", error);
//     res.status(500).json({ message: "Error receiving payment" });
//   }
// };
