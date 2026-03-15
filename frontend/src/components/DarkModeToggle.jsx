import { useState, useEffect } from "react";

const darkStyles = `
  body {
    background-color: #1a1a1a !important;
    color: #f0f0f0 !important;
  }
  nav {
    background-color: #111 !important;
  }
  nav a {
    color: #f0f0f0 !important;
  }
  section {
    background-color: #1a1a1a !important;
  }
  section h1 {
    color: #a0c4ff !important;
  }
  section h3 {
    color: #f0f0f0 !important;
  }
  .second-section {
    background: #2a2a2a !important;
  }
  .second-card {
    background: #333 !important;
    color: #f0f0f0 !important;
    border-color: #555 !important;
  }
  h1, h2, h3 {
    color: #a0c4ff !important;
  }
  .app-footer {
    background-color: #111 !important;
  }
  input, textarea, select {
    background-color: #333 !important;
    color: #f0f0f0 !important;
    border-color: #555 !important;
  }
  button {
    background-color: #007bff !important;
    color: white !important;
  }
  label {
    color: #f0f0f0 !important;
  }
`;

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let styleTag = document.getElementById("dark-mode-styles");

    if (darkMode) {
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "dark-mode-styles";
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = darkStyles;
    } else {
      if (styleTag) {
        styleTag.innerHTML = "";
      }
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default DarkModeToggle;