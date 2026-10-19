import { Router, type Request, type Response, type NextFunction } from "express";
import { CourseModel } from "../models/Course";

export const courseRouter = Router();

courseRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

courseRouter.get("/:code", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await CourseModel.findOne({ code: req.params.code });
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
});