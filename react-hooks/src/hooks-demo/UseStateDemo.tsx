import React, { useState } from "react";
import "./UseStateDemo.css";

function heavyComputation() {
  console.log("Heavy computation run...");
  return 42;
}

const UseStateDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Arcade");
  const [isVisible, setIsVisible] = useState(false);
  const [profile, setProfile] = useState({
    username: "arcade_user",
    age: 30,
    country: "India",
  });
  const [items, setItems] = useState<string[]>([]);
  const [steps, setSteps] = useState(0);
  const [magicNumber] = useState(() => heavyComputation());
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const resetAll = () => {
    setCount(0);
    setName("Arcade");
    setIsVisible(false);
    setProfile({ username: "arcade_user", age: 30, country: "India" });
    setItems([]);
    setSteps(0);
  };

  return (
    <div className={`uedemo ${theme}`}>
      <header className="appbar">
        <h2 className="title">useState Hook Demo</h2>
        <div className="controls">
          <button
            className="btn ghost"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            Toggle {theme === "light" ? "Dark" : "Light"}
          </button>
          <button className="btn danger" onClick={resetAll}>
            Reset All
          </button>
        </div>
      </header>

      <main className="grid">
        <section className="panel gradient-1">
          <h3>1. Number state</h3>
          <p>
            <strong>Count:</strong> {count}
          </p>
          <div className="row">
            <button className="btn primary" onClick={() => setCount(count + 1)}>
              Increment
            </button>
            <button className="btn accent" onClick={() => setCount(count - 1)}>
              Decrement
            </button>
            <button className="btn danger" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </section>

        <section className="panel gradient-2">
          <h3>2. String state</h3>
          <label>
            <span>Name: </span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p>
            👋 Hello, <code>{name}</code>!
          </p>
        </section>

        <section className="panel gradient-3">
          <h3>3. Boolean state</h3>
          <button
            className="btn accent"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            Toggle Message
          </button>
          {isVisible && <p>🎉 This text is visible!</p>}
        </section>

        <section className="panel gradient-4">
          <h3>4. Object state</h3>
          <p>
            <strong>Profile:</strong> Age {profile.age}, Country{" "}
            {profile.country}
          </p>
          <div className="row">
            <button
              className="btn primary"
              onClick={() => setProfile({ ...profile, age: profile.age + 1 })}
            >
              Increase Age
            </button>
            <button
              className="btn accent"
              onClick={() => setProfile({ ...profile, country: "USA" })}
            >
              Change Country
            </button>
          </div>
        </section>

        <section className="panel gradient-5">
          <h3>5. Array state</h3>
          <div className="row">
            <button
              className="btn primary"
              onClick={() => setItems([...items, `Item ${items.length + 1}`])}
            >
              Add Item
            </button>
            <button className="btn danger" onClick={() => setItems([])}>
              Clear Items
            </button>
          </div>
          {items.length > 0 ? (
            <ul className="tags">
              {items.map((item, idx) => (
                <li className="tag" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No items yet — add one!</p>
          )}
        </section>

        <section className="panel gradient-6">
          <h3>6. Functional updates</h3>
          <p>
            <strong>Steps:</strong> {steps}
          </p>
          <button
            className="btn primary"
            onClick={() => setSteps((s) => s + 1)}
          >
            Add Step (safe)
          </button>
        </section>

        <section className="panel gradient-0">
          <h3>7. Lazy initialization</h3>
          <p>
            <strong>Magic number:</strong> {magicNumber}
          </p>
          <p className="muted">
            This value was computed once during the first render.
          </p>
        </section>
      </main>

      <footer className="footer">
        <small>
          Patterns: number • string • boolean • object • array • functional
          updates • lazy init
        </small>
      </footer>
    </div>
  );
};

export default UseStateDemo;
