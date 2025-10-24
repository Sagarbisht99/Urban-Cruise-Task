import mongoose from "mongoose";

let isConnected = false; // Track connection state

export async function connectDb() {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL as string);
    isConnected = true;
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
