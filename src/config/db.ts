import mongoose from "mongoose";

let cachedPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URL is missing in environment variables.");
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = mongoose.connect(uri);
  return cachedPromise;
}