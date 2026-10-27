import type { Document, Types } from "mongoose";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  id?: string;
  code: string;
  title: string;
  description: string;
  units: number;
  category: string;
  prerequisites?: string[];
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type CourseDoc = Pick<
  Course,
  "code" | "title" | "description" | "units" | "category" | "prerequisites"
>;

// ===== RECIPE TYPES =====
export interface RecipeDoc extends Document {
  userId: string | Types.ObjectId;
  title: string;
  ingredients?: string[];
  instructions?: string;
  category?: string;
  prepTime?: number;
  cookTime?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface NewRecipeBody {
  title: string;
  ingredients?: string[];
  instructions?: string;
  category?: string;
  prepTime?: number;
  cookTime?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
}