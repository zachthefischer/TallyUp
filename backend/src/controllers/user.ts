import { RequestHandler } from "express-serve-static-core";
import UserModel from "../models/user";
import GroupModel from "../models/group";
import * as dotenv from "dotenv";
import { Types } from "mongoose";
import axios from "axios";

dotenv.config();

export const createUser: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, phone, balance } = req.body;
  try {
    const user = await UserModel.create({
      groups: [],
      totalOwed: 0,
      totalPaid: 0,
      firstName,
      lastName,
      email,
      phone,
      balance,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({ message: "Could not create user" });
  }
};

export const addBalance: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const newBalance = (user.balance += amount);
    const userFind = await UserModel.findByIdAndUpdate(
      id,
      { balance: newBalance },
      { new: false }
    );
    if (!userFind) {
      res.status(404).json({ message: "User not found v2" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error adding balance: ", error);
    res.status(500).json({ message: "Error adding balance" });
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// export const payGroup: RequestHandler = async (req, res) => {
//   const { id } = req.params;
//   const { amount, groupName } = req.body;
//   try {
//     const user = await UserModel.findById(id);
//     const groupNameStr = (groupName ?? "") as string;
//     console.log(groupNameStr);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     if (!user.groups.includes(groupNameStr)) {
//       console.log(user.groups);
//       res.status(400).json({ message: "User does not owe this group" });
//       return;
//     }
//     if (user.balance < amount) {
//       res.status(400).json({ message: "User does not have enough balance" });
//       return;
//     }
//     user.balance -= amount;
//     user.totalPaid += amount;
//     user.groups = user.groups.filter((group) => group !== groupNameStr);
//     user.totalOwed -= amount;

//     const group = await GroupModel.findOne({ name: groupNameStr });
//     if (!group) {
//       res.status(404).json({ message: "Group not found" });
//       return;
//     }
//     console.log("Sending request to group payment endpoint");
//     const sendRequest = await axios.post(
//       `http://localhost:${process.env.MAIN_PORT}/group/payment/${group._id}`,
//       {
//         amount,
//         userId: user._id,
//       }
//     );
//     await user.save();
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error paying group: ", error);
//     res.status(500).json({ message: "Error paying group" });
//   }
// };
