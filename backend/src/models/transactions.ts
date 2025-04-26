import { InferSchemaType, Schema, model, Types } from "mongoose";

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  to: { type: String },
  from: { type: String },
  dateTime: { type: Date, default: Date.now, required: true },
  fulfilled: { type: Boolean, default: false },
});

type Transaction = InferSchemaType<typeof transactionSchema>;
export default model<Transaction>("Transaction", transactionSchema);
