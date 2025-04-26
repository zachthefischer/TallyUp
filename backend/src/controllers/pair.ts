import { RequestHandler } from "express-serve-static-core";
import GroupModel from "../models/group";
import UserModel from "../models/user";
import TransactionModel from "../models/transactions";
import * as dotenv from "dotenv";
import { Types } from "mongoose";
import axios from "axios";
import { group } from "console";

dotenv.config();

export const addPair: RequestHandler = async (req, res) => {
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
    const userUpdate = await UserModel.findByIdAndUpdate(
      userId,
      {
        totalOwed: user ? user.totalOwed + amount : amount,
        $push: { groupsOwed: userGroup },
      },
      { new: false }
    );
    console.log("User updated: ", userUpdate);
    const groupUpdate = await GroupModel.findByIdAndUpdate(
      groupId,
      {
        owed: group ? group.owed + amount : amount,
        $push: { members: groupUser },
      },
      { new: false }
    );
    console.log("Group updated: ", groupUpdate);
    res.status(201).json({ message: "Paid added successfully" });
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
      { $inc: { amount: amount } },
      { new: false }
    );

    const userGroup = user.groupsOwed.find(
      (group) => group?.groupId?.toString() === groupId.toString()
    );
    if (userGroup) {
      userGroup.balance += amount;
      await user.save();
    } else {
      res.status(404).json({ message: "User group not found" });
      return;
    }

    const groupUser = group.members.find(
      (member) => member?.userId?.toString() === userId.toString()
    );
    if (groupUser) {
      groupUser.balance += amount;
      await group.save();
    } else {
      res.status(404).json({ message: "Group user not found" });
      return;
    }
  } catch (error) {
    console.error("Error updating request and pair: ", error);
    res.status(500).json({ message: "Error updating request and pair", error });
  }
};

export const deletePair: RequestHandler = async (req, res) => {
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
      await user.save();
    } else {
      res.status(404).json({ message: "User group not found" });
      return;
    }

    const groupUser = group.members.find(
      (member) => member?.userId?.toString() === userId.toString()
    );
    if (groupUser) {
      if (typeof groupUser.balance === "number") {
        groupUser.balance -= request.amount;
      }
      groupUser.transactions.pull(transactionId);
      await user.save();
    } else {
      res.status(404).json({ message: "User group not found" });
      return;
    }

    await TransactionModel.findByIdAndDelete(transactionId);
  } catch (error) {
    console.error("Error deleting pair: ", error);
    res.status(500).json({ message: "Error deleting pair", error });
  }
};
