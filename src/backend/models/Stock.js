import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
    {
        symbol: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        currentPrice: {
            type: Number,
            required: true
        },
        high: {
            type: Number,
            required: true
        },
        low: {
            type: Number,
            required: true
        },
        sector:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        logoUrl:{
            type: String,
        },
        marketCap:{
            type: Number,
            required: true
        },
       priceDown:{
        type:Boolean,
        required:true,
       },
       numberofshares:{   
            type:Number,
            required:true,
       },
       percentageChange:{   
            type:Number,
            required:true,
       },
       
      
    },
    {
        timestamps: true
    }
);

export const Stock = mongoose.model("Stock", stockSchema);
