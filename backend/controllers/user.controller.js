import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";



const generateAcessAndRefreshTokens = async (userid) => {
    try {
        
        const user=await User.findById(userid);

        if(!user){
            throw new ApiError(404, "User not found")
        }

        const refreshToken= await user.generateRefreshToken()
        const accessToken= await user.generateAccessToken()

        user.refreshToken=refreshToken
        user.refreshTokenExpiry=Date.now() + 60 * 60 * 1000 * 7 // 7 days


        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}
            

        
    } catch (error) {
        
    }
}



const mailgenContent = (name, verificationUrl) => {

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Ultra Trading",
            link: process.env.FRONTEND_URL || "http://localhost:5174"
        }
    });


    const email = {
        body: {
            name: name,
            intro: "Welcome to Ultra Trading! We're very excited to have you on board.",
            action: {
                instructions: "To get started with Paper Trading, please click here to verify your email:",
                button: {
                    color: "#0a66c2",
                    text: "Verify your account",
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    };


    const emailHtml = mailGenerator.generate(email);
    const emailText = mailGenerator.generatePlaintext(email);

    return { emailHtml, emailText };

};


const sendVerificationEmail = async (email, name) => {
    
    try {
        
        const token = crypto.randomBytes(16).toString("hex");

        const hashedToken = await bcrypt.hash(token, 10);
        

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User not found");
        }


        user.emailVerificationToken = hashedToken;
        user.emailVerificationTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save({ validateBeforeSave: false }); // Skip validation for other missing fields during this update
        

        const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:5174"}/verify-email?token=${token}&email=${email}`;
        
        const { emailHtml, emailText } = mailgenContent(name, verificationUrl);


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        const mailOptions = {
            from: `"Ultra Trading" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Ultra Trading Account",
            text: emailText,
            html: emailHtml
        };


        await transporter.sendMail(mailOptions);


    } catch (error) {

        console.error("Error sending verification email:", error);
        throw new ApiError(500, "Failed to send verification email");

    }
    
};


export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }


    const userExists = await User.findOne({ email });

    if (userExists && userExists.isVerified) {
        throw new ApiError(400, "User already exists");
    }


    // Provided dummy values for missing schema constraints to prevent crash
    const user = await User.create({
        name, 
        email, 
        password,
        age: 18,
        balance: 100000,
        phone: "0000000000",
        catagory: "Beginner Trader",
        level: "Level 1",
        description: "New Trader"
    });


    await sendVerificationEmail(user.email, user.name);
    

    res.status(200).json(
        new ApiResponse(200, user, "User registered successfully! Please check your email for verification.")
    );

});


export const verifyEmail = asyncHandler(async (req, res) => {

    const { token, email } = req.query; // Assuming token and email are passed as query params


    if (!token || !email) {
        throw new ApiError(400, "Token and email are required");
    }


    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }


    if (!user.emailVerificationToken) {
        throw new ApiError(400, "User is already verified or invalid token");
    }


    const isTokenValid = await bcrypt.compare(token, user.emailVerificationToken);

    if (!isTokenValid) {
        throw new ApiError(400, "Invalid or expired token");
    }


    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    
    await user.save({ validateBeforeSave: false });


    res.status(200).json(
        new ApiResponse(200, user, "Email verified successfully")
    );

});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    

    if (email?.trim() === "" || password?.trim() === "") {
        throw new ApiError(400, "All fields are required");
    }


    const user = await User.findOne({ email });


    if (!user) {
        throw new ApiError(404, "User not found");
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password");
    }


    const { accessToken, refreshToken } = await generateAcessAndRefreshTokens(user._id);


    const options = {
        httpOnly: true,
        secure: true
    };


    const userResponse = user.toObject();
    userResponse.accessToken = accessToken;
    userResponse.refreshToken = refreshToken;


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, userResponse, "User logged in successfully")
        );

});


export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

import jwt from "jsonwebtoken";



export const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const {accessToken,refreshToken } = await generateAcessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    { accessToken, refreshToken }, 
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});



import {Stock} from "../models/Stock.js";
import {Holding} from "../models/Holding.js";
import {createPortfolioSnapshot} from "../utils/createPortfolioSanpshot.js";
const buyStock = asyncHandler(async (req, res) => {

    const stockId=req.params.stockId;
    const {quantity}=req.body;
    const user=req.user;

    if(!stockId || !quantity || !user){
        throw new ApiError(400,"All fields are required");
    }

    const stock=await Stock.findById(stockId);
    if(!stock){
        throw new ApiError(404,"Stock not found");
    }
    const totalValue=stock.price*quantity;
    if(user.balance<totalValue){
        throw new ApiError(400,"Insufficient balance");
    }
    user.balance-=totalValue;
    
    await user.save();

    const existingHolding=await Holding.findOne({
        userId:req.user._id,
        stockId:stockId
    });
    if(existingHolding){
        existingHolding.quantity+=quantity;
        await existingHolding.save();
    }

    const holding=new Holding({
        userId:req.user._id,
        stockId:stockId,
        quantity:quantity,
        
    });

    await holding.save();
    await createPortfolioSnapshot(user._id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Stock bought successfully"));
});



import {oauth2Client} from "google-auth-library"
export const googleOauth=asyncHandler(async(req,res,next)=>{

    const token=req.body.token;

    if(!token){
        throw new ApiError(400,"Token not received")
    }

    const client=new oauth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket=await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
    })

    const payload=ticket.getPayload();

    const {email,name,picture}=payload;

    if(!email){
        throw new ApiError(400,"Email not found")
    }

    if(!payload.email_verified){
        throw new ApiError(400,"Email not verified")
    }

    const user=await User.findOne({email});

    if(!user){
        user=await User.create({
            email,
            name,
            avatar:picture,
            isVerified:true,
        })

        
    }
   

    



    
})