import express from 'express'
import cors from 'cors'
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'
import { uploadAndConvertAudio } from './audio-from-video';
dotenv.config()
const app = express()
const PORT = 3000

 let latestAudioURL: string | null = null; // store latest audio URL

const supabase =  createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
 
// middleware
app.use(cors({origin : "*"}))
app.use(express.raw({ type: "application/octet-stream", limit: "200mb" }));


app.post('/upload', async(req,res) => {
    try{
        const buffer = req.body
        const {data,error} = await supabase.storage.from("fathom").upload("videos/meeting.webm", buffer, {
        contentType: "video/webm",
        upsert: true,
      });
      if(error){
        console.log("Upload error:",error)
        return res.status(500).json({error : "upload error"})
      }
       const audioURL = await uploadAndConvertAudio(
      "https://pgrstjvawbkjoqliajdj.supabase.co/storage/v1/object/public/fathom/videos/meeting.webm"
    );
    console.log(audioURL)
    latestAudioURL = audioURL
      res.json({success : true,data,audioURL})
    }
    catch(err){
        console.error('Server Error',err)
        res.status(500).json({err : "Server Error"})
    }
})
//get latest audio 
app.get('/latest-audio', (req, res) => {
  if (!latestAudioURL) return res.status(404).json({ error: "No audio yet" });
  res.json({ audioURL: latestAudioURL });
});
app.listen(PORT,()=>{
    console.log(`The server is running on port`,PORT)
})
