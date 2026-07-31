import mongoose, { Schema } from "mongoose";

const watchlistSchema = new Schema(
    {
       stocks:{
        type: [Schema.Types.ObjectId],
        ref: "Stock"
       },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);


export const Watchlist = mongoose.model("Watchlist", watchlistSchema);
