import { useState } from "react";
import "./EnergyCard.css";

export const EnergyCard = ({
  totalCalories,
  dailyBudget,
  onUpdateBudget,
}: {
  totalCalories: number;
  dailyBudget: number;
  onUpdateBudget: (val: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(dailyBudget.toString());

  const left = Math.max(dailyBudget - totalCalories, 0);
  const percentage = Math.min((totalCalories / dailyBudget) * 100, 100);

  const handleSave = () => {
    const val = parseInt(editValue);
    if (!isNaN(val) && val > 0) {
      onUpdateBudget(val);
    }
    setIsEditing(false);
  };

  return (
    <div className="energy-card">
      <h3 className="card-title">TODAY'S ENERGY</h3>
      <div className="energy-content">
        <div
          className="energy-circle"
          style={{
            background: `conic-gradient(#1d5f42 ${percentage}%, #e0e0e0 ${percentage}%)`,
          }}
        >
          <div className="energy-inner">
            <span className="energy-number">{left}</span>
            <span className="energy-label">kcal left</span>
          </div>
        </div>

        <div className="energy-stats">
          <div className="stat-row">
            <span className="stat-label">Eaten</span>
            <span className="stat-val">{totalCalories}</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">Daily budget</span>
            {isEditing ? (
              <input
                type="number"
                className="budget-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
            ) : (
              <div className="budget-display">
                <span className="stat-val">{dailyBudget}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-edit-budget"
                >
                  ✎
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
