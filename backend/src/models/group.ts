import { InferSchemaType, Schema, model, Types } from "mongoose";
import transactionSchema from "./transactions";

const groupUserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  userName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  transactions: [{ type: Types.ObjectId, required: true }],
  requests: [{ type: Types.ObjectId, required: true }],
});

const groupSchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, required: true },
  paid: { type: Number, required: true },
  owed: { type: Number, required: true },
  percentage: { type: Number, required: true },
  members: { type: [groupUserSchema], required: true },
  subGroups: [{ type: Schema.Types.ObjectId, ref: "Group", required: false }],
});

export type Group = InferSchemaType<typeof groupSchema>;
export default model<Group>("Group", groupSchema);
