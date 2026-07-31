import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
let cachedNews = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1 * 60 * 1000;
export const getMarketNews = asyncHandler(async (req, res) => {
    const currentTime = Date.now();

    if (cachedNews && (currentTime - lastFetchTime < CACHE_DURATION)) {
        return res.status(200).json(
            new ApiResponse(200, cachedNews, "News fetched from cache successfully")
        );
    }

    const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${process.env.FINHUB_API_KEY}`
    );
    if (!response.ok) {
        throw new ApiError(500, "Failed to fetch news from external API");
    }
    const data = await response.json();

    cachedNews = data.slice(0, 10);
    lastFetchTime = currentTime;

    return res.status(200).json(
        new ApiResponse(200, cachedNews, "Fresh news fetched successfully")
    );
});
