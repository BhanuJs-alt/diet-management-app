import { useState } from "react";
import "./LogMealModal.css";

const LogMealModal = ({ isOpen, onClose, onAddMeal }: any) => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState("BREAKFAST");
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  // This function fetches the exact macros from the USDA database
  const handleSearchFood = async () => {
    if (!foodName) return;
    setIsSearching(true);

    try {
      // Using DEMO_KEY so you don't have to configure environment variables tonight
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${foodName}&pageSize=1`,
      );
      const data = await response.json();

      if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];

        // Helper to extract the specific nutrients from the USDA JSON response
        const getNutrient = (name: string) => {
          const nut = food.foodNutrients.find((n: any) =>
            n.nutrientName.toLowerCase().includes(name),
          );
          return nut ? Math.round(nut.value) : 0;
        };

        // USDA measures are typically per 100g
        setCalories(getNutrient("energy").toString());
        setProtein(getNutrient("protein").toString());
        setCarbs(getNutrient("carbohydrate").toString());
        setFat(getNutrient("lipid").toString()); // USDA catalogs fat as 'lipid'
      } else {
        alert(
          "Food not found in database. You can still enter macros manually.",
        );
      }
    } catch (error) {
      console.error("Failed to fetch food data", error);
      alert("API error. Please enter macros manually.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMeal({
      mealType,
      totalCalories: Number(calories),
      foodItems: [
        {
          foodName,
          servingGrams: 100,
          calories: Number(calories),
          protein: Number(protein),
          carbs: Number(carbs),
          fat: Number(fat),
        },
      ],
    });

    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Log Food</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="SNACK">Snack</option>
          </select>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Food Name (e.g., Banana)"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleSearchFood}
              disabled={isSearching}
              style={{
                padding: "0 16px",
                background: "#e0e0e0",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {isSearching ? "Searching..." : "Search USDA"}
            </button>
          </div>

          <input
            type="number"
            placeholder="Total Calories (per 100g)"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />

          <div className="macro-inputs" style={{ display: "flex", gap: "8px" }}>
            <input
              type="number"
              placeholder="Protein (g)"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              required
              style={{ width: "100%" }}
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              required
              style={{ width: "100%" }}
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogMealModal;
