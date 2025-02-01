
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function for image upload
export const uploadImage = async (imageString) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
      upload_preset: "social_media_app"
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading to cloudinary:", error);
    throw error;
  }
};

export default cloudinary;