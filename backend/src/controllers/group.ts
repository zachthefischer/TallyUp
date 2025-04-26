import { RequestHandler } from "express-serve-static-core";
import GroupModel from "../models/group";
import * as dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

export const createGroup: RequestHandler = async (req, res) => {
  const { name, total, paid, members, subGroups } = req.body;
  const owed = total - paid;
  const percentage = paid / total;
  try {
    const group = await GroupModel.create({
      name,
      total,
      paid,
      owed,
      percentage,
      members: members.map((member: string) => new Types.ObjectId(member)),
      paidMembers: [],
      owedMembers: members.map((member: string) => new Types.ObjectId(member)),
      subGroups: subGroups
        ? subGroups.map((subGroup: string) => new Types.ObjectId(subGroup))
        : [],
    });
    res.status(201).json(group);
  } catch (error) {
    console.error("Error creating group: ", error);
    res.status(500).json({ message: "Error creating group" });
  }
};

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

export const receivePayment: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { amount, userId } = req.body;
  try {
    console.log("Received payment: ", amount, userId);
    const group = await GroupModel.findById(id);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    const user = group.members.find(
      (member: { _id: Types.ObjectId }) => member._id.toString() === userId
    );
    if (!user) {
      res.status(404).json({ message: "User not found in group" });
      return;
    }
    console.log("Updating values");
    group.paid += amount;
    group.owed -= amount;
    console.log("Paid: ", group.paid, " Owed: ", group.owed);
    group.paidMembers.push(new Types.ObjectId(userId));
    console.log("Paid members: ", group.paidMembers);
    group.owedMembers = group.owedMembers.filter(
      (member: any) => member.toString() !== userId
    ) as unknown as typeof group.owedMembers;
    console.log("Owed members: ", group.owedMembers);
    await group.save();
    console.log("Payment received and group updated");
    res.status(200).json(group);
  } catch (error) {
    console.error("Error receiving payment: ", error);
    res.status(500).json({ message: "Error receiving payment" });
  }
};
