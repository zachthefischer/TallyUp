import { InferSchemaType, Schema, model, Types } from "mongoose";
import transactionSchema from "./transactions";

const userGroupSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  groupName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  transactions: [{ type: Types.ObjectId, required: true }],
  requests: [{ type: Types.ObjectId, required: true }],
});

const userSchema = new Schema({
  groupsOwed: { type: [userGroupSchema], required: true },
  totalOwed: { type: Number, required: true },
  totalPaid: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  balance: { type: Number, required: true },
});

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
