import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



import { ApiError } from '../utils/ApiError.js';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Safely delete file asynchronously
        if (fs.existsSync(localFilePath)) {
            await fs.promises.unlink(localFilePath).catch(err => console.error("FS unlink error:", err));
        }
        return response;
    } catch (error) {
        // Safely delete file asynchronously if it exists
        if (fs.existsSync(localFilePath)) {
            await fs.promises.unlink(localFilePath).catch(err => console.error("FS unlink error:", err));
        }
        
        throw new ApiError(500, error?.message || "Failed to upload file to Cloudinary");
    }
};

export { uploadOnCloudinary };