import mongoose from "mongoose";


const portfoliohistorySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    walletBalance:{
        type:Number,
        required:true
    },
    holdingValue:{
        type:Number,
        required:true
    },
    portfolioValue:{
        type:Number,
        required:true
    },
    
},{timestamps:true})

export const PortfolioHistory = mongoose.model("PortfolioHistory",portfoliohistorySchema);