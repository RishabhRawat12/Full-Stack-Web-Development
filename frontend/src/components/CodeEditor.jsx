import { useMemo, useRef, useState } from "react";

function formatBytes(bytes) {
  if (bytes === undefined || bytes === null) return "N/A";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function CodeEditor() {
  const [code, setCode] = useState(`#include <stdio.h>

int main() {
  printf("Hello, C world!\n");
  return 0;
}\n`);
  const [output, setOutput] = useState("");
  const [timeTakenMs, setTimeTakenMs] = useState(null);
  const [memoryUsed, setMemoryUsed] = useState(null);
  const [error, setError] = useState("");
  const outputRef = useRef(null);

  const runtimeInfo = useMemo(() => {
    const memory = memoryUsed ? formatBytes(memoryUsed) : "N/A";
    const time = timeTakenMs != null ? `${timeTakenMs.toFixed(2)} ms` : "N/A";
    return { memory, time };
  }, [memoryUsed, timeTakenMs]);

  const handleRun = async () => {
    setError("");
    setOutput("Compiling...");
    setTimeTakenMs(null);
    setMemoryUsed(null);

    try {
      const start = performance.now();
      const resp = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const end = performance.now();
      setTimeTakenMs(end - start);

      if (!resp.ok) {
        const body = await resp.text();
        throw new Error(body || `Server returned ${resp.status}`);
      }

      const data = await resp.json();
      setOutput(data.output ?? "(no output)");
      setMemoryUsed(typeof data.memory === "number" ? data.memory : null);
    } catch (err) {
      setError(err.message || String(err));
      setOutput("(No output)");
    } finally {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }
  };

  const handleClear = () => {
    setOutput("");
    setError("");
    setTimeTakenMs(null);
    setMemoryUsed(null);
  };

  return (
    <div
      style={{
        padding: "1rem",
        minHeight: "100vh",
        backgroundColor: "#f4f6fb",
        color: "#1b1b1f",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
        }}
      >
        <header
          style={{
            padding: "1rem 1.25rem",
            borderRadius: 12,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h2 style={{ margin: 0, color: "#1b1b1f" }}>C Code Compiler</h2>
          <p style={{ margin: 0, color: "#4b4b57" }}>
            Write C code in the editor below. Click <strong>Compile</strong> to send your code to the compiler and view output.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={handleRun}
              style={{
                padding: "0.6rem 1rem",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "white",
                fontWeight: 600,
              }}
            >
              Compile
            </button>
            <button
              onClick={handleClear}
              style={{
                padding: "0.6rem 1rem",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                cursor: "pointer",
                backgroundColor: "white",
                color: "#1b1b1f",
                fontWeight: 600,
              }}
            >
              Clear
            </button>
          </div>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "1rem",
            alignItems: "stretch",
          }}
        >
          <section
            style={{
              borderRadius: 12,
              backgroundColor: "#ffffff",
              padding: "1rem",
              boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              minHeight: 520,
            }}
          >
            <h3 style={{ margin: 0 }}>Code</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                flex: 1,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                fontSize: "0.95rem",
                lineHeight: 1.4,
                padding: "0.75rem",
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                resize: "vertical",
                minHeight: 380,
              }}
            />
          </section>

          <aside
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateRows: "auto 1fr",
            }}
          >
            <section
              style={{
                borderRadius: 12,
                backgroundColor: "#ffffff",
                padding: "1rem",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Output</h3>
              <pre
                ref={outputRef}
                style={{
                  flex: 1,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  padding: "0.75rem",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#f7f8fb",
                  overflowY: "auto",
                  minHeight: 180,
                }}
              >
                {error ? `Error: ${error}` : output || "(No output yet)"}
              </pre>
            </section>

            <section
              style={{
                borderRadius: 12,
                backgroundColor: "#ffffff",
                padding: "1rem",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
              }}
            >
              <h3 style={{ margin: 0 }}>Execution Info</h3>
              <div style={{ display: "grid", gap: "0.5rem", marginTop: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Time taken</span>
                  <strong>{runtimeInfo.time}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Memory used</span>
                  <strong>{runtimeInfo.memory}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Engine</span>
                  <strong>{typeof navigator !== "undefined" ? navigator.userAgent : "—"}</strong>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
