import { User } from "../models/User.js";
import { Holding } from "../models/Holding.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatbotcontext = async (req, res) => {
    try {
        const userId = req.user._id || req.user.userId; 
        
        // Ensure user message is provided
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        // 1. Fetch user data
        const user = await User.findById(userId);
        const userBalance = user.balance; 
        
        // 2. Fetch user's holdings
        const userHoldings = await Holding.find({ userId: userId }).populate('stockId');
        
        // Format holdings for the prompt
        const holdingsText = userHoldings.length > 0 
            ? userHoldings.map(h => `${h.quantity} shares of ${h.stockId?.symbol || 'Unknown'}`).join(', ')
            : "No stocks currently held.";

        // 3. Construct System Prompt
        const systemPrompt = `You are a helpful and professional AI trading assistant for a paper trading platform.
The user you are talking to is named ${user.name}.
Their current available cash balance is $${userBalance}.
Their current portfolio holdings are: ${holdingsText}.
Answer the user's trading questions based on this context. Keep answers concise.

User Message: "${message}"`;

        // 4. Send to Google Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const result = await model.generateContent(systemPrompt);
        const aiResponse = result.response.text();

        // 5. Return response to frontend
        return res.status(200).json({
            success: true,
            response: aiResponse
        });

    } catch (error) {
        console.error("Chatbot Error:", error);
        return res.status(500).json({ success: false, message: "Error communicating with AI" });
    }
};


// General chatbot for unauthenticated users
export const generalChatbotContext = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const systemPrompt = `You are a helpful and professional AI trading assistant for a paper trading platform.
The user you are talking to is not logged in. Answer general trading questions and encourage them to sign up to use the platform's features. Keep answers concise.

User Message: "${message}"`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const result = await model.generateContent(systemPrompt);
        const aiResponse = result.response.text();

        return res.status(200).json({
            success: true,
            response: aiResponse
        });

    } catch (error) {
        console.error("General Chatbot Error:", error);
        return res.status(500).json({ success: false, message: "Error communicating with AI" });
    }
    
};