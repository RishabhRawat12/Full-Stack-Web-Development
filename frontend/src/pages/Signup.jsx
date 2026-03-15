import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    alert(`Signup submitted:\nemail: ${email}`);
  };

  return (
    <div style={{height: "100vh", width: "100vw", backgroundColor: "white", color: "black", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: "2rem" }}>
      <h1 style={{ color: "navy" }}>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label style={{ display: "grid", gap: "0.25rem" }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
          />
        </label>
        <label style={{ display: "grid", gap: "0.25rem" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
          />
        </label>
        <label style={{ display: "grid", gap: "0.25rem" }}>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: "0.75rem", borderRadius: 6, border: "none", backgroundColor: "#007bff", color: "white" }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
