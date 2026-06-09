import { createGoogleGenerativeAI } from "@ai-sdk/google"

/** Proveedor Gemini configurado con la llave GEMINI_API_KEY. */
export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export const CHAT_MODEL = "gemini-3.5-flash"
