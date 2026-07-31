import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        age:{
            type: Number,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        avatar:{
            type: String,
        },
        balance:{
            type: Number,
            required: true
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        phone:{
            type: String,
            required: true
        },
        countryCode:{
            type: String,
            required: true,
            default:"+91"
        },
        refreshToken:{
            type: String,
        },
        refreshTokenExpiry:{
            type: Date,
        },
        emailVerificationToken:{
            type: String,
        },
        emailVerificationTokenExpiry:{
            type: Date,
        },
        // forgotPasswordToken:{
        //     type: String,
        // },
        // forgotPasswordTokenExpiry:{
        //     type: Date,
        // }
        catagory:{
            type: String,
    enum: [
        "Beginner Trader",
        "Swing Trader",
        "Day Trader",
        "Long-term Investor",
        "Value Investor",
        "Growth Investor",
        "Technical Analyst",
        "Fundamental Analyst"
    ],
    default: "Beginner Trader",
    required: true
        },
        level:{
            type: String,
            enum:["Level 1","Level 2","Level 3","Level 4","Level 5"],
            required: true
        },
        description:{
            type: String,
            required: true
        },
        

        
    },
    {
        
        timestamps: true
    }
);


userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};




userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};


userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};


export const User = mongoose.model("User", userSchema);
