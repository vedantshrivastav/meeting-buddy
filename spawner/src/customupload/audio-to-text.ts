// Install dependencies:
// npm install axios fs dotenv @google/generative-ai

import axios from "axios";
import fs from "fs/promises";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const ASSEMBLY_API_KEY = process.env.ASSEMBLY_API_KEY!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const assemblyBaseUrl = "https://api.assemblyai.com";
const assemblyHeaders = {
  authorization: ASSEMBLY_API_KEY,
  "content-type": "audio/mpeg",
};

// ---------- STEP 1: Transcription ----------
async function transcribeAudio(path: string): Promise<string> {
  // Upload audio file
  const audioData = await fs.readFile(path);
  const uploadResponse = await axios.post(
    `${assemblyBaseUrl}/v2/upload`,
    audioData,
    { headers: assemblyHeaders }
  );
  const audioUrl = uploadResponse.data.upload_url;

  // Request transcription
  const transcriptResponse = await axios.post(
    `${assemblyBaseUrl}/v2/transcript`,
    { audio_url: audioUrl, speech_model: "universal" },
    { headers: assemblyHeaders }
  );

  const transcriptId = transcriptResponse.data.id;
  const pollingEndpoint = `${assemblyBaseUrl}/v2/transcript/${transcriptId}`;

  // Poll until transcription is done
  while (true) {
    const pollingResponse = await axios.get(pollingEndpoint, {
      headers: assemblyHeaders,
    });
    const transcriptionResult = pollingResponse.data;

    if (transcriptionResult.status === "completed") {
      return transcriptionResult.text;
    } else if (transcriptionResult.status === "error") {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

// ---------- STEP 2: Summarization ----------
async function summarizeWithGemini(transcribedText: string): Promise<string> {
  const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const prompt = `Summarize the following meeting transcript in clear, concise bullet points:\n\n${transcribedText}`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return response.text!;
}

// ---------- STEP 3: Orchestrator ----------
async function main() {
  try {
    console.log("🎤 Transcribing audio...");
    console.log("the assembly api key is ",ASSEMBLY_API_KEY)
    const transcription = await transcribeAudio(
      "./assets/meeting_audio.mp3"
    );
    console.log("✅ Transcription:\n", transcription);

    console.log("\n🤖 Summarizing with Gemini...");
    const summary = await summarizeWithGemini(transcription);
    console.log("📊 Summary:\n", summary);
    // store the summary in database 
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();
