import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from environment variables.");
        }

        const uri = process.env.MONGODB_URI.endsWith('/') 
            ? process.env.MONGODB_URI.slice(0, -1) 
            : process.env.MONGODB_URI;

        const connectionInstance = await mongoose.connect(`${uri}/papertrade`);


            
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

        

        
    } catch (error) {
        console.error("MONGODB connection FAILED: ", error);
        process.exit(1);
    }
};

export default connectDB;
