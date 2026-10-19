import type { Types } from "mongoose";

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