import { ApiError } from "./ApiError.js"
import { User } from "../models/User.js";
import { Holding } from "../models/Holding.js";
import { PortfolioHistory } from "../models/portfolioHistory.models.js";

export const createPortfolioSnapshot=async(userId)=>{


    if(!userId){
        throw new ApiError("User not found",404)
    }

    const user=await User.findById(userId);

    if(!user){
        throw new ApiError("User not found",404)
    }

    const holdings=await Holding.find({user:user._id});

    if(!holdings){
        throw new ApiError("Holdings not found",404)
    }

    const walletBalance=user.balance ||0;
    const holdingValue=holdings.reduce((acc,holding)=>acc+holding.totalValue,0)
    const portfolioValue=walletBalance+holdingValue ||0;
    
    const snapshot=new PortfolioHistory({
        user:user._id,
        portfolioValue:portfolioValue,
        walletBalance:walletBalance,
        holdingValue:holdingValue
    })

    await snapshot.save();

    return snapshot;
}

