import { Schema, model } from "mongoose";
import type { CourseDoc } from "../types";

const courseSchema = new Schema<CourseDoc>(
  {
    code: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    units: { type: Number, required: true },
    category: { type: String, required: true },
    prerequisites: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model<CourseDoc>("Course", courseSchema);