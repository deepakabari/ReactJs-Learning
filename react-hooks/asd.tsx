import React, { useState } from "react";
import "./useStateDemo.css";

const UseStateDemo: React.FC = () => {
  // 1. Basic counter
  const [count, setCount] = useState(0);

  // 2. Text input
  const [name, setName] = useState("Arcade");

  // 3. Boolean toggle
  const [isVisible, setIsVisible] = useState(true);

  // 4. Array state
  const [items, setItems] = useState<string[]>([]);

  // 5. Object state
  const [profile, setProfile] = useState({
    age: 20,
    country: "India",
  });

  return (
    <div className="demo-wrapper theme-dark">
      <div className="card">
        <h2>useState Hook Demo</h2>
        <p className="muted">
          <strong>useState</strong> lets you add local state to function
          components. Updating state triggers re-render.
        </p>

        {/* Counter Example */}
        <div className="section">
          <p>
            <strong>Count:</strong> {count}
          </p>
          <div className="btn-group">
            <button className="btn primary" onClick={() => setCount((c) => c + 1)}>
              Increment
            </button>
            <button className="btn danger" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </div>

        {/* Input Example */}
        <div className="section">
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
        </div>

        {/* Toggle Example */}
        <div className="section">
          <button
            className="btn accent"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            Toggle Message
          </button>
          {isVisible && <p>🎉 This text is visible!</p>}
        </div>

        {/* Array Example */}
        <div className="section">
          <button
            className="btn primary"
            onClick={() => setItems([...items, `Item ${items.length + 1}`])}
          >
            Add Item
          </button>
          <ul>
            {items.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>

        {/* Object Example */}
        <div className="section">
          <p>
            <strong>Profile:</strong> Age {profile.age}, Country {profile.country}
          </p>
          <div className="btn-group">
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
        </div>
      </div>
    </div>
  );
};

export default UseStateDemo;
