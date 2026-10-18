import "./MealList.css";

export const MealListCard = ({
  meals,
  onDeleteMeal,
}: {
  meals: any[];
  onDeleteMeal: (id: string) => void;
}) => {
  return (
    <div className="meal-list-card">
      <div className="meal-list-header">
        <h3 className="card-title">TODAY'S MEALS</h3>
      </div>
      <div className="meal-items">
        {meals.length === 0 ? (
          <p className="empty-state">No meals logged yet.</p>
        ) : (
          meals.map((meal, idx) => (
            <div key={idx} className="meal-item">
              <div className="meal-dot">●</div>
              <div className="meal-info">
                <div className="meal-title-row">
                  <strong>{meal.mealType}</strong>
                  <div className="meal-actions">
                    <span className="meal-cals">{meal.totalCalories} kcal</span>
                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="btn-delete"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="meal-foods">
                  {meal.foodItems.map((f: any) => f.foodName).join(", ")}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
