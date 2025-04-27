import { RequestHandler } from "express-serve-static-core";
import GroupModel from "../models/group";
import UserModel from "../models/user";
import * as dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

const findGroupOrSubGroup = (groups: any[], targetGroupId: string): any | null => {
  for (const group of groups) {
    if (group.groupId.toString() === targetGroupId) {
      return group;
    }
    const foundSubGroup = findGroupOrSubGroup(group.subGroups, targetGroupId);
    if (foundSubGroup) {
      return foundSubGroup;
    }
  }
  return null;
}

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
      joinCode: Math.random().toString(36).substring(2, 8),
    });
    console.log("Group created: ", group);
    res.status(201).json(group);
  } catch (error) {
    console.error("Error creating group: ", error);
    res.status(500).json({ message: "Error creating group" });
  }
};

export const addSubGroup: RequestHandler = async (req, res) => {
  let { parentGroupId, childGroupId, subGroupName } = req.body;

  // If only parentGroupId is provided - add directly to parentGroup
  
  // If both are provided - find parentGroupId, then add childGroupId to it



  try {
    console.log("Adding subgroup to group: ", childGroupId, subGroupName);
    const subgroup = await GroupModel.create({
      name: subGroupName,
      total: 0,
      paid: 0,
      owed: 0,
      percentage: 0,
      members: [],
    });
    
    console.log("Subgroup created: ", subgroup);

    const childGroup = await GroupModel.findByIdAndUpdate(
      childGroupId,
      { $push: { subGroups: subgroup._id } },
      { new: true }
    );

    if (!childGroup) {
      res.status(404).json({ message: "Child group not found" });
      return;
    }

    console.log(childGroup.members);
    console.log(`Subgroup created inside : ${childGroup}`, subgroup);

    if (childGroup.members && childGroup.members.length > 0) {
      for (const member of childGroup.members) {
        console.log("Member: ", member);

        const user = await UserModel.findById(member.userId);
        console.log("User: ", user);

        const groupUser = await childGroup.members.find(
          (member) => member.userId.toString() === user?._id.toString()
        );
        
        let userGroup;

        if (parentGroupId) {
          const userParentGroup = await user?.groups.find(
            (g) => g.groupId?.toString() === parentGroupId.toString()
          );
          const userGroup = await userParentGroup?.subGroups.find(
            (g) => g.groupId?.toString() === childGroup._id.toString()
          )
        }
        if (!parentGroupId) {
          const userGroup = await user?.groups.find(
            (g) => g.groupId?.toString() === childGroup._id.toString()
          );
        }

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
