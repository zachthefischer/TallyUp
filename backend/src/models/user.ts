import { InferSchemaType, Schema, model, Types } from "mongoose";
import transactionSchema from "./transactions";
import { group } from "console";

// Define how the user stores groups
const userGroupSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  groupName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },

  paid: { type: Number, required: true },
  owed: { type: Number, required: true },
  transactions: [{ type: Types.ObjectId, required: true }],
  requests: [{ type: Types.ObjectId, required: true }],

  subGroups: [] // Temporary
});

userGroupSchema.add({
  subGroups: [userGroupSchema]  // Recursively refer to itself
});

// Define the user
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },

  totalOwed: { type: Number, required: true },
  totalPaid: { type: Number, required: true },
  balance: { type: Number, required: true },

  groups: {
    type: [userGroupSchema],
    required: true,
  },
});

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
