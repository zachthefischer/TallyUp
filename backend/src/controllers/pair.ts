import { RequestHandler } from "express-serve-static-core";
import GroupModel from "../models/group";
import UserModel from "../models/user";
import TransactionModel from "../models/transactions";
import * as dotenv from "dotenv";
import { Types } from "mongoose";
import axios from "axios";

dotenv.config();

export const addTransaction: RequestHandler = async (req, res) => {
  const { userId, groupId, amount, description } = req.body;
  let to = groupId;
  let from = userId;
  if (amount <= 0) {
    to = userId;
    from = groupId;
  }
  try {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found " });
      return;
    }
    const request = await TransactionModel.create({
      amount,
      description,
      to,
      from,
      dateTime: Date.now(),
      fulfilled: false,
      history: [`User requested to pay ${amount} to ${group.name}`],
    });
    console.log("Transaction request created: ", request);
    const userGroup = {
      groupId: group._id,
      groupName: group.name,
      isAdmin: false,
      balance: amount,
      transactions: [],
      requests: [request._id],
    };
    console.log("userGroup created: ", userGroup);
    const groupUser = {
      userId: user?._id,
      userName: user?.firstName + " " + user?.lastName,
      isAdmin: false,
      balance: amount,
      transactions: [],
      requests: [request._id],
    };
    console.log("groupUser created: ", groupUser);

    const existingUserGroup = user.groupsOwed.find(
      (group) => group?.groupId?.toString() === groupId.toString()
    );
    if (existingUserGroup) {
      existingUserGroup.balance += amount;
      existingUserGroup.requests.push(request._id);
    } else {
      user.groupsOwed.push(userGroup);
    }
    user.totalOwed += amount;
    user.save();
    console.log("User group updated: ", user);

    // const userUpdate = await UserModel.findByIdAndUpdate(
    //   userId,
    //   {
    //     $inc: { totalOwed: amount },
    //     $addToSet: { groupsOwed: userGroup },
    //   },
    //   { new: false }
    // );
    // console.log("User updated: ", userUpdate);

    const existingGroupUser = group.members.find(
      (member) => member?.userId?.toString() === userId.toString()
    );
    if (existingGroupUser) {
      existingGroupUser.balance += amount;
      existingGroupUser.requests.push(request._id);
    } else {
      group.members.push(groupUser);
    }
    group.owed += amount;
    group.save();
    console.log("Group updated: ", group);

    // const groupUpdate = await GroupModel.findByIdAndUpdate(
    //   groupId,
    //   {
    //     $inc: { owed: amount },
    //     $addToSet: { members: groupUser },
    //   },
    //   { new: false }
    // );
    // console.log("Group updated: ", groupUpdate);

    res.status(201).json({ message: "Paid added successfully", request });
  } catch (error) {
    console.error("Error creating request and pair: ", error);
    res.status(500).json({ message: "Error creating request and pair", error });
  }
};

export const updateRequest: RequestHandler = async (req, res) => {
  const { userId, groupId, transactionId, amount } = req.body;
  try {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found " });
      return;
    }
    const request = await TransactionModel.findById(transactionId);
    if (!request) {
      res.status(404).json({ message: "Request not found" });
      return;
    }

    const updatedRequest = await TransactionModel.findByIdAndUpdate(
      transactionId,
      {
        $inc: { amount: amount },
        $push: { history: `${group.name} updated the request to ${amount}` },
      },
      { new: true }
    );

    const userGroup = user.groupsOwed.find(
      (group) => group?.groupId?.toString() === groupId.toString()
    );
    if (userGroup) {
      userGroup.balance += amount;
      user.totalOwed += amount;
      group.markModified("toalOwed");
      await user.save();
    } else {
      res.status(404).json({ message: "User group not found" });
      return;
    }
    console.log("User updated: ", user);

    const groupUser = group.members.find(
      (member) => member?.userId?.toString() === userId.toString()
    );
    if (groupUser) {
      groupUser.balance += amount;
      group.owed += amount;
      group.markModified("owed");
      await group.save();
    } else {
      res.status(404).json({ message: "Group user not found" });
      return;
    }
    console.log("Group updated: ", group);

    res
      .status(200)
      .json({ message: "Request updated successfully", updatedRequest });
  } catch (error) {
    console.error("Error updating request and pair: ", error);
    res.status(500).json({ message: "Error updating request and pair", error });
  }
};

export const deleteTransaction: RequestHandler = async (req, res) => {
  const { userId, groupId, transactionId } = req.body;
  try {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found " });
      return;
    }
    const request = await TransactionModel.findById(transactionId);
    if (!request) {
      res.status(404).json({ message: "Request not found" });
      return;
    }

    const userGroup = user.groupsOwed.find(
      (group) => group?.groupId?.toString() === groupId.toString()
    );
    if (userGroup) {
      if (typeof userGroup.balance === "number") {
        userGroup.balance -= request.amount;
      }
      userGroup.transactions.pull(transactionId);
      user.totalOwed = (user.totalOwed as number) - request.amount;
      user.markModified("totalOwed");
      await user.save();
    } else {
      res.status(404).json({ message: "User group not found" });
      return;
    }
    console.log("User updated: ", user);

    const groupUser = group.members.find(
      (member) => member?.userId?.toString() === userId.toString()
    );
    if (groupUser) {
      if (typeof groupUser.balance === "number") {
        groupUser.balance -= request.amount;
      }
      groupUser.transactions.pull(transactionId);
      group.owed = (group.owed as number) - request.amount;
      group.markModified("owed");
      await group.save();
    } else {
      res.status(404).json({ message: "User group not found" });
      return;
    }
    console.log("Group updated: ", group);

    await TransactionModel.findByIdAndDelete(transactionId);
    res.status(200).json({ message: "Pair deleted successfully" });
  } catch (error) {
    console.error("Error deleting pair: ", error);
    res.status(500).json({ message: "Error deleting pair", error });
  }
};
