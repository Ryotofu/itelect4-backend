import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { CourseModel } from "./models/Course";
import { coursesData } from "./data/courses";

async function seed() {
  try {
    await connectDB();

    for (const course of coursesData) {
      await CourseModel.updateOne(
        { code: course.code },
        { $set: course },
        { upsert: true }
      );
    }

    console.log("Database seeded successfully.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();