import { Router } from "express";
import {
  addMeal,
  deleteMeal,
  fetchMeals,
} from "../controllers/meal.controller.ts";

const router = Router();

// POST /api/meals -> adds a meal
router.post("/", addMeal);

// GET /api/meals -> fetches meals
router.get("/", fetchMeals);
router.delete("/:id", deleteMeal);

export default router;
