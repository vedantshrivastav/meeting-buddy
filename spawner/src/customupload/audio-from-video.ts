import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAndConvertAudio(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    public_id: "meeting_audio",
    format: "mp3",   // converts automatically to audio
  });
  console.log(result.secure_url)
  return result.secure_url; // direct URL to the converted audio
}
