import { Stock } from "../models/Stock.js";
import { io } from "../app.js";

export const startStockSimulator = () => {

    console.log("Stock simulator service initialized.");


    setInterval(async () => {

        try {

            const stocks = await Stock.find();


            if (!stocks || stocks.length === 0) {
                return;
            }


            const bulkOperations = stocks.map((stock) => {

                const oldPrice = stock.currentPrice;
                
                // Calculate new price: random fluctuation between -5 and +5
                let newPrice = oldPrice + (Math.random() - 0.5) * 10;
                

                // Prevent price from dropping to zero or negative
                if (newPrice < 0.01) {
                    newPrice = 0.01;
                }


                const marketCap = newPrice * stock.numberofshares;
                const priceDifference = newPrice - oldPrice;
                const percentageChange = (priceDifference / oldPrice) * 100;
                const isPriceDown = newPrice < oldPrice;


                // Update high and low tracking if necessary
                const high = newPrice > stock.high ? newPrice : stock.high;
                const low = newPrice < stock.low ? newPrice : stock.low;


                return {
                    updateOne: {
                        filter: { _id: stock._id },
                        update: {
                            $set: {
                                currentPrice: newPrice,
                                marketCap: marketCap,
                                high: high,
                                low: low,
                                percentageChange: percentageChange,
                                priceDown: isPriceDown
                            }
                        }
                    }
                };

            });


            await Stock.bulkWrite(bulkOperations);

            const updatedStocks = await Stock.find();

            io.emit("stock", updatedStocks);

            
            console.log(`Updated prices for ${stocks.length} stocks.`);

        } catch (error) {

            console.error("Error updating stock prices in simulator:", error);

        }

    }, 10000);

};
