export default function About() {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "white", color: "black", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: "2rem" }}>
      <h1 style={{ color: "navy" }}>About WebCompiler</h1>
      <p>
        WebCompiler is a lightweight web-based C compiler frontend. It lets you write C code in the browser and
        send it to a compiler backend for build and execution. This demo focuses on fast feedback and a clean UI.
      </p><br />
      <p>
        Behind the scenes, the frontend makes a POST request to <code>/api/compile</code> with your source code.
        The backend is responsible for compiling and returning the output and any errors.
      </p><br />
      <p>
        This project is built using React for the frontend and can be easily extended to support more languages,
        additional features, and a more robust backend. The goal is to provide a simple and intuitive interface for
        compiling code directly in the browser.
      </p>
    </div>
  );
}
