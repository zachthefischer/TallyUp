import { InferSchemaType, Schema, model, Types } from "mongoose";

const groupSchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, required: true },
  paid: { type: Number, required: true },
  owed: { type: Number, required: true },
  percentage: { type: Number, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  paidMembers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  owedMembers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  subGroups: [{ type: Schema.Types.ObjectId, ref: "Group", required: false }],
});

export type Group = InferSchemaType<typeof groupSchema>;
export default model<Group>("Group", groupSchema);
