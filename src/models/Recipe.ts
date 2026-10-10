import { Schema, model } from "mongoose";
import type { RecipeDoc } from "../types/index";

const recipeSchema = new Schema<RecipeDoc>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: {
      values: ["breakfast", "lunch", "dinner", "dessert"],
      message: "{VALUE} is not a valid category",
    },
    required: [true, "category is required"],
  },
  prepTimeMinutes: {
    type: Number,
    required: [true, "prepTimeMinutes is required"],
    min: [1, "prepTimeMinutes must be at least 1"],
    max: [1440, "prepTimeMinutes cannot exceed 1440"],
  },
  createdAt: { type: Date, default: Date.now },
});

recipeSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Recipe = model<RecipeDoc>("Recipe", recipeSchema);