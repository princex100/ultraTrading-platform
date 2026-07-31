import mongoose, { Schema } from "mongoose";

const holdingSchema = new Schema(
    {
        stockId: {
            type: Schema.Types.ObjectId,
            ref: "Stock",
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
       
    },
    {
        timestamps: true
    }
);

export const Holding = mongoose.model("Holding", holdingSchema);
