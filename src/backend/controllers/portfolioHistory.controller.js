import { asyncHandler } from "../utils/asyncHandler.js";
import { PortfolioHistory } from "../models/portfolioHistory.models.js";


export const getPortfolioHistory=asyncHandler(async(req,res,next)=>{

    
    const user=req.user;

    if(!user){
        throw new APIError(400,"User not found");

    }

    
    const portfolioHistory=await PortfolioHistory.find({user:user._id}).sort({ createdAt: 1 });

    if(!portfolioHistory){
        throw new APIError(400,"Portfolio history not found");
    }

    return res.status(200).json({
        success:true,
        message:"Portfolio history fetched successfully",
        data:portfolioHistory
    });





})