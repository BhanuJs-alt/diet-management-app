import "./DashboardHeader.css";

export const DashboardHeader = ({ mealCount, onOpenModal }: any) => {
  return (
    <header className="dashboard-header">
      <div className="header-titles">
        <h1>Hello,Make a diet Plan</h1>
        <div className="header-subtitle">
          <span>Wednesday, 14 October · {mealCount} meals logged</span>
          <span className="status-pill">● On track</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="btn-primary" onClick={onOpenModal}>
          + Log food
        </button>
      </div>
    </header>
  );
};
