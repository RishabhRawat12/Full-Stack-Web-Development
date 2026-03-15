function Secondbar({ icon, title, desc }) {
  return (
    <div className="second-card" style={{ backgroundColor: "#f5f5f5" }}>
      <br />
      <div className="icon">{icon}</div>
      <h3 style={{ color: "#007BFF" }}>{title}</h3>
      <h3 style={{ color: "#000000" }}>{desc}</h3>
    </div>
  );
}
export default Secondbar;