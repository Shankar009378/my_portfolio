import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDB() {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MongoDB connection string is missing in .env file");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

