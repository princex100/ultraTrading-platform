import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Holding } from "../models/Holding.js";
import { User } from "../models/User.js";

export const getUserPortfolio = asyncHandler(async (req, res) => {
    // 1. Get the ID of the user who is currently logged in
    const userId = req.user._id;

    // 2. Fetch all their stock holdings. 
    // We use .populate("stockId") to automatically pull in the full Stock data (like currentPrice, name, symbol) for each holding!
    const holdings = await Holding.find({ userId }).populate("stockId");

    // 3. Get the user's current virtual cash balance
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 4. Calculate their total investment value
    let totalInvestmentValue = 0;
    
    // We map over the holdings to format the data nicely for the frontend
    const formattedHoldings = holdings.map((holding) => {
        // The live price comes from the populated stock document
        const currentPrice = holding.stockId.currentPrice;
        const totalValue = currentPrice * holding.quantity;
        
        // Add this stock's value to their grand total
        totalInvestmentValue += totalValue;

        return {
            holdingId: holding._id,
            stock: {
                id: holding.stockId._id,
                symbol: holding.stockId.symbol,
                name: holding.stockId.name,
                currentPrice: currentPrice,
                logoUrl: holding.stockId.logoUrl
            },
            quantity: holding.quantity,
            totalValue: parseFloat(totalValue.toFixed(2))
        };
    });

    // 5. Calculate their overall net worth (Cash + Stock Value)
    const totalNetWorth = user.balance + totalInvestmentValue;

    // 6. Send the compiled portfolio data back to the frontend!
    return res.status(200).json(
        new ApiResponse(200, {
            virtualBalance: parseFloat(user.balance.toFixed(2)),
            totalInvestmentValue: parseFloat(totalInvestmentValue.toFixed(2)),
            totalNetWorth: parseFloat(totalNetWorth.toFixed(2)),
            holdings: formattedHoldings
        }, "Portfolio fetched successfully")
    );
});
