import Secondbar from "./Secondbar";
function Secondbars() {
  return (
    <div className="second-section" style={{ backgroundColor: "#f5f5f5" }}>

      <h1 style={{ color: "#007BFF" }}>APIs, Editor embedding & more</h1>

      <div className="second-container">

        <Secondbar
          icon="🌐"
          title="Embed Editor & Challenges"
          desc="Embed our Editor & Challenges as an iframe into your website to get code execution capabilities in minutes."
        />

        <Secondbar
          icon="</>"
          title="APIs to run code"
          desc="Build more complex use cases by calling our APIs from backend applications to run code."
        />

        <Secondbar
          icon="📈"
          title="Reach Out"
          desc="Reach out to us for more similar builds and to share your use case with us. We are always excited to hear from you!"
        />

      </div>

      <p className="link">Yash Rawat Github</p>

    </div>
  );
}
export default Secondbars;