// TODO: Implement add stock to watchlist
// TODO: Implement remove stock from watchlist
// TODO: Implement get user watchlist

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Watchlist } from "../models/Watchlist.js";



export const addStockToWatchlist = asyncHandler(async (req, res) => {
    const { stockId, userId } = req.body;


    if (!stockId || !userId) {
        throw new ApiError(400, "Stock id and user id are required");
    }


    const existingWatchlist = await Watchlist.findOne({ userId });


    if (existingWatchlist) {

        // Check if stock already exists in the watchlist
        const stockExists = existingWatchlist.stocks.some(
            (id) => id.toString() === stockId
        );


        if (stockExists) {
            return res.status(200).json(
                new ApiResponse(200, existingWatchlist, "Stock is already in watchlist")
            );
        }


        existingWatchlist.stocks.push(stockId);
        
        await existingWatchlist.save();


        return res.status(200).json(
            new ApiResponse(200, existingWatchlist, "Stock added to watchlist")
        );

    }


    // Create a new watchlist if it doesn't exist for the user
    const newWatchlist = await Watchlist.create({
        userId,
        stocks: [stockId]
    });


    return res.status(201).json(
        new ApiResponse(201, newWatchlist, "Watchlist created and stock added")
    );
});
    

export const getwatchlist = asyncHandler(async (req, res) => {
    const user = req.user;


    if (!user) {
        throw new ApiError(400, "User not found");
    }


    const watchlist = await Watchlist.findOne({ userId: user._id });
    

    if (!watchlist) {
        return res.status(404).json(
            new ApiResponse(404, {}, "Watchlist not found")
        );
    }


    const populatedWatchlist = await watchlist.populate("stocks");


    return res.status(200).json(
        new ApiResponse(200, populatedWatchlist.stocks, "Watchlist fetched successfully")
    );
});