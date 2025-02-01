import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (imageString) => {
  try {
    if (!imageString) return null;
    
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
      folder: "social_media_app",
      allowed_formats: ["jpg", "png", "jpeg", "gif"],
      transformation: [
        { width: 1000, crop: "limit" },
        { quality: "auto" }
      ]
    });
    
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw new Error("Image upload failed");
  }
};

export default cloudinary;