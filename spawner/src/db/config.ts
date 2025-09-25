import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URL
export const connectDb = async() => {
    try{
     await mongoose.connect(MONGO_URI!)
   console.log("MONGO DB CONNECTED")
    }catch(e){
       console.error("SOME ERROR OCCURED WHILE CONNECTING TO DB",e)
    }
}