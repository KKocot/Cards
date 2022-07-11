export const Card = ({ label }) => {
  return (
    <div>
      <h3>Table</h3>
      <div className="card-front">
        <span className="symbol-on-card-top">{label}</span>
        <span className="symbol-on-card-bottom">{label}</span>
      </div>
    </div>
  );
};
