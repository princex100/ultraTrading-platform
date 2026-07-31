import { User } from "../models/User.js";
import { Stock } from "../models/Stock.js";
import { Transaction } from "../models/Transaction.js";
import { Holding } from "../models/Holding.js";

export const buyStock = async (req, res) => {
    try {
        const { stockId, quantity } = req.body;
        if (!stockId || !quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Valid stockId and quantity are required." });
        }

        const userId = req.user._id || req.user.userId;
        const user = await User.findById(userId);
        const stock = await Stock.findById(stockId);

        if (!user) return res.status(404).json({ success: false, message: "User not found." });
        if (!stock) return res.status(404).json({ success: false, message: "Stock not found." });

        const totalCost = stock.currentPrice * quantity;
        if (user.balance < totalCost) {
            return res.status(400).json({ success: false, message: "Insufficient balance." });
        }

        user.balance -= totalCost;
        await user.save({ validateBeforeSave: false });

        const transaction = new Transaction({
            userId,
            stockId,
            type: "BUY",
            quantity,
            price: stock.currentPrice
        });
        await transaction.save();

        let holding = await Holding.findOne({ userId, stockId });
        if (holding) {
            holding.quantity += quantity;
            await holding.save();
        } else {
            holding = new Holding({
                userId,
                stockId,
                quantity
            });
            await holding.save();
        }

        return res.status(200).json({
            success: true,
            message: `Successfully bought ${quantity} shares of ${stock.symbol}.`,
            transaction
        });

    } catch (error) {
        console.error("Buy stock error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const sellStock = async (req, res) => {
    try {
        const { stockId, quantity } = req.body;
        if (!stockId || !quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Valid stockId and quantity are required." });
        }

        const userId = req.user._id || req.user.userId;
        const user = await User.findById(userId);
        const stock = await Stock.findById(stockId);

        if (!user) return res.status(404).json({ success: false, message: "User not found." });
        if (!stock) return res.status(404).json({ success: false, message: "Stock not found." });

        const holding = await Holding.findOne({ userId, stockId });
        if (!holding || holding.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Insufficient stock quantity to sell." });
        }

        const totalRevenue = stock.currentPrice * quantity;
        user.balance += totalRevenue;
        await user.save({ validateBeforeSave: false });

        const transaction = new Transaction({
            userId,
            stockId,
            type: "SELL",
            quantity,
            price: stock.currentPrice
        });
        await transaction.save();

        holding.quantity -= quantity;
        if (holding.quantity === 0) {
            await Holding.findByIdAndDelete(holding._id);
        } else {
            await holding.save();
        }

        return res.status(200).json({
            success: true,
            message: `Successfully sold ${quantity} shares of ${stock.symbol}.`,
            transaction
        });

    } catch (error) {
        console.error("Sell stock error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user._id || req.user.userId;
        const transactions = await Transaction.find({ userId }).populate("stockId").sort({ createdAt: -1 });
        
        return res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        console.error("Get transactions error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const depositFunds = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Please provide a valid deposit amount." });
        }

        const userId = req.user._id || req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        user.balance += Number(amount);
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            success: true,
            message: `Successfully deposited $${amount}.`,
            newBalance: user.balance
        });
    } catch (error) {
        console.error("Deposit error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const withdrawFunds = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Please provide a valid withdrawal amount." });
        }

        const userId = req.user._id || req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.balance < Number(amount)) {
            return res.status(400).json({ success: false, message: "Insufficient balance for withdrawal." });
        }

        user.balance -= Number(amount);
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            success: true,
            message: `Successfully withdrew $${amount}.`,
            newBalance: user.balance
        });
    } catch (error) {
        console.error("Withdraw error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
