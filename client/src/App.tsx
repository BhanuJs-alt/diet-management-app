import { useState, useEffect } from "react";
import "./App.css";
import { DashboardHeader } from "./components/DashboardHeader/DashboardHeader";
import { EnergyCard } from "./components/EnergyCard/EnergyCard";
import { MacroCard } from "./components/MacroCard/MacroCard";
import { MealListCard } from "./components/MealList/MealList";
import LogMealModal from "./components/LogMealModal/LogMealModal";

export default function App() {
  const [meals, setMeals] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load budget from localStorage or default to 1900
  const [dailyBudget, setDailyBudget] = useState(() => {
    const saved = localStorage.getItem("dailyBudget");
    return saved ? parseInt(saved) : 1900;
  });

  const today = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";

  const fetchMeals = () => {
    fetch("http://localhost:5000/api/meals?date=" + today)
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((err) => console.error("Error fetching meals:", err));
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAddMeal = async (mealData: any) => {
    try {
      const payload = { ...mealData, loggedAt: today };
      await fetch("http://localhost:5000/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsModalOpen(false);
      fetchMeals();
    } catch (error) {
      console.error("Failed to add meal", error);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/meals/${id}`, {
        method: "DELETE",
      });
      fetchMeals();
    } catch (error) {
      console.error("Failed to delete meal", error);
    }
  };

  // Save budget to localStorage whenever it changes
  const handleUpdateBudget = (newBudget: number) => {
    setDailyBudget(newBudget);
    localStorage.setItem("dailyBudget", newBudget.toString());
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.totalCalories, 0);

  let totalProtein = 0,
    totalCarbs = 0,
    totalFat = 0;
  meals.forEach((meal) => {
    meal.foodItems.forEach((item: any) => {
      totalProtein += item.protein;
      totalCarbs += item.carbs;
      totalFat += item.fat;
    });
  });

  return (
    <div className="dashboard-container">
      <DashboardHeader
        mealCount={meals.length}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="dashboard-grid">
        <div className="card">
          <EnergyCard
            totalCalories={totalCalories}
            dailyBudget={dailyBudget}
            onUpdateBudget={handleUpdateBudget}
          />
        </div>
        <div className="card">
          <MacroCard protein={totalProtein} carbs={totalCarbs} fat={totalFat} />
        </div>
        <div className="card">
          <MealListCard meals={meals} onDeleteMeal={handleDeleteMeal} />
        </div>
      </div>

      <LogMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMeal={handleAddMeal}
      />
    </div>
  );
}
