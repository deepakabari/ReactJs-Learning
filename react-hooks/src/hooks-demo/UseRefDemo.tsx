import { useRef, useState } from "react";
import "./UseRefDemo.css";

export default function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const focusInput = () => {
    inputRef.current?.focus();
    addLog("Focused input field");
  };

  const changeDivColor = () => {
    if (divRef.current) {
      divRef.current.style.background = `hsl(${Math.floor(
        Math.random() * 360
      )}, 80%, 50%)`;
      addLog("Changed div color using ref");
    }
  };

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  return (
    <div className={`urfdemo ${theme}`}>
      <header className="appbar">
        <h2 className="title">useRef Demo</h2>
        <div className="controls">
          <button
            className="btn ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle Theme
          </button>
        </div>
      </header>

      <div className="grid">
        {/* Panel 1: Input focus demo */}
        <div className="panel gradient-2">
          <header>
            <h3>Focus Input</h3>
            <p className="muted">Control input directly with ref</p>
          </header>
          <input
            ref={inputRef}
            className="input"
            type="text"
            placeholder="Click button to focus me"
          />
          <div className="row">
            <button className="btn" onClick={focusInput}>
              Focus Input
            </button>
          </div>
        </div>

        {/* Panel 2: Div style demo */}
        <div className="panel gradient-4">
          <header>
            <h3>Change Box Color</h3>
            <p className="muted">Manipulate DOM element with ref</p>
          </header>
          <div ref={divRef} className="colorbox"></div>
          <div className="row">
            <button className="btn" onClick={changeDivColor}>
              Change Color
            </button>
          </div>
        </div>

        {/* Panel 3: Logs */}
        <div className="panel gradient-5 log">
          <header>
            <h3>Logs</h3>
            <p className="muted">Actions performed with refs</p>
          </header>
          <ul className="loglist">
            {log.map((l, i) => (
              <li key={i}>{l}</li>
            ))} 
          </ul>
        </div>
      </div>

      <footer className="footer">
        <small>
          Patterns: DOM access • mutable values without render • previous values
        </small>
      </footer>
    </div>
  );
}
