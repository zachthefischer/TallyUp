import { InferSchemaType, Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  groupsOwed: { type: [String], required: true },
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
