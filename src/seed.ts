import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db";
import { CourseModel } from "./models/Course";
import { User } from "./models/User"; // If your file exports User, or change to UserModel
import { coursesData } from "./data/courses";

async function seed() {
  try {
    await connectDB();

    // Seed Courses
    for (const course of coursesData) {
      await CourseModel.updateOne(
        { code: course.code },
        { $set: course },
        { upsert: true }
      );
    }

    // Seed Test User Account
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.updateOne(
      { email: "student@example.com" },
      {
        $set: {
          name: "Student User",
          email: "student@example.com",
          password: hashedPassword,
          role: "student",
          isActive: true,
        },
      },
      { upsert: true }
    );

    console.log("Database seeded successfully with courses and test user.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();