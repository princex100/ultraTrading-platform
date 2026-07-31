import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      stockId: {
        type: Schema.Types.ObjectId,
        ref: "Stock",
        required: true
      },
      type: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
    
    },
    {
        timestamps: true
    }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
