import { type Request, type Response } from "express";
import * as MealService from "../services/meal.service.ts";

export const addMeal = async (req: Request, res: Response) => {
  try {
    const mealData = req.body;

    // Hardcoding a user ID so we have something to show for the demo
    mealData.userId = "demo-user-123";

    const newMeal = await MealService.createMealLog(mealData);
    res.status(201).json(newMeal);
  } catch (error) {
    console.error("Error in addMeal:", error);
    res.status(500).json({ error: "Failed to save meal" });
  }
};

export const fetchMeals = async (req: Request, res: Response) => {
  try {
    // Hardcoding the exact same user ID to retrieve the demo data
    const userId = "demo-user-123";
    const date = req.query.date as string;

    if (!date) {
      res.status(400).json({ error: "Date parameter is required" });
      return;
    }

    const meals = await MealService.getMealsByDate(userId, date);
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error in fetchMeals:", error);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
};
export const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await MealService.deleteMealLog(id);
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMeal:", error);
    res.status(500).json({ error: "Failed to delete meal" });
  }
};
