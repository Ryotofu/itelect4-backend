import type { CourseDoc } from "../types";

export const coursesData: CourseDoc[] = [
  {
    code: "ITELECT4",
    title: "Web Systems and Technologies",
    description: "Comprehensive course on full-stack web development with Node.js, Express, TypeScript, and MongoDB.",
    units: 3,
    category: "Major",
    prerequisites: ["IT101"],
  },
  {
    code: "IT101",
    title: "Introduction to Computing",
    description: "Foundational concepts of computing, programming logic, and system architecture.",
    units: 3,
    category: "Core",
    prerequisites: [],
  },
  {
    code: "IT102",
    title: "Computer Programming 1",
    description: "Fundamentals of structured programming using modern software engineering principles.",
    units: 3,
    category: "Core",
    prerequisites: ["IT101"],
  }
];