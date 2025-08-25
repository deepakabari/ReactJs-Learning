import { useMemo, useState } from "react";
import "./UseMemoDemo.css";

const expensiveCalculation = (num: number): number => {
  console.log("⚡ Running expensive calculation...");
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += num * 2;
  }
  return result;
};

const items = ["React", "Angular", "Vue", "Express"];

const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

  const memoizedValue = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  const isEven = useMemo(() => {
    console.log("Checking even/odd...");
    return count % 2 === 0;
  }, [count]);

  const sortedItems = useMemo(() => {
    console.log("Sorting items...");
    return [...items].sort();
  }, []);

  return (
    <div className="umdemo light">
      <header className="appbar">
        <h2 className="title">useMemo Demo</h2>
      </header>

      <div className="grid">
        <div className="panel gradient-1">
          <h3>Counter Example</h3>
          <p>
            Count: <span className="badge">{count}</span>
          </p>
          <button className="btn" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <p className="muted">
            This number is <b>{isEven ? "Even" : "Odd"}</b>.
          </p>
        </div>

        <div className="panel gradient-2">
          <h3>Expensive Calculation</h3>
          <p>Enter a number:</p>
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          />
          <p className="muted">Memoized result:</p>
          <p className="highlight">{memoizedValue}</p>
        </div>

        <div className="panel gradient-3">
          <h3>Sorted List</h3>
          <ul className="list">
            {sortedItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="muted">
            List is memoized, so it won't re-sort unnecessarily.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseMemoDemo;
