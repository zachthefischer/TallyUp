import { InferSchemaType, Schema, model, Types } from "mongoose";
import transactionSchema from "./transactions";

// Define how the group stores members
const groupMemberSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  userName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  transactions: [{ type: Types.ObjectId, required: true }],
  requests: [{ type: Types.ObjectId, required: true }],
});

const groupSchema = new Schema({
  name: { type: String, required: true },
  paid: { type: Number, required: true },
  owed: { type: Number, required: true },

  members: { type: [groupMemberSchema], required: true },
  subGroups: [{ type: Types.ObjectId, ref: "Group", required: false }],
});

export type Group = InferSchemaType<typeof groupSchema>;
export default model<Group>("Group", groupSchema);
