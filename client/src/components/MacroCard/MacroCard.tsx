import "./MacroCard.css";

export const MacroCard = ({
  protein,
  carbs,
  fat,
}: {
  protein: number;
  carbs: number;
  fat: number;
}) => {
  // Hardcoded goals for the UI demo based on the design
  const pGoal = 100,
    cGoal = 220,
    fGoal = 60;

  return (
    <div className="macro-card">
      <h3 className="card-title">MACROS</h3>
      <div className="macro-rows">
        <MacroRow
          label="Protein"
          current={protein}
          goal={pGoal}
          color="#1a66cc"
        />
        <MacroRow label="Carbs" current={carbs} goal={cGoal} color="#d97a00" />
        <MacroRow label="Fat" current={fat} goal={fGoal} color="#804d99" />
      </div>
    </div>
  );
};

const MacroRow = ({ label, current, goal, color }: any) => {
  const pct = Math.min((current / goal) * 100, 100);
  return (
    <div className="macro-row">
      <div className="macro-text">
        <strong>{label}</strong>
        <span>
          {current} / {goal} g
        </span>
      </div>
      <div className="macro-bar-bg">
        <div
          className="macro-bar-fill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};
