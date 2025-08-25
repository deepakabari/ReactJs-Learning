import { useState, useCallback, memo, useEffect, useRef } from "react";
import "./UseCallbackdemo.css";

// Child component to show memoized vs non-memoized callbacks
const ChildButton = memo(
  ({ 
    onClick, 
    label, 
    renderCount 
  }: { 
    onClick: () => void; 
    label: string;
    renderCount: number;
  }) => {
    return (
      <div className="function-demo">
        <div className="render-count">{renderCount}</div>
        <button className="btn" onClick={onClick}>
          {label}
        </button>
      </div>
    );
  }
);

// Child component that receives a callback with dependencies
const TextDisplay = memo(({ 
  text, 
  onTransform 
}: { 
  text: string; 
  onTransform: (t: string) => void;
}) => {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="panel gradient-2">
      <header>
        <h3>Text Transformation</h3>
        <p className="muted">Renders: {renderCount.current}</p>
      </header>
      <p>Current text: "{text}"</p>
      <div className="row">
        <button className="btn" onClick={() => onTransform(text.toUpperCase())}>
          Uppercase
        </button>
        <button className="btn" onClick={() => onTransform(text.toLowerCase())}>
          Lowercase
        </button>
      </div>
    </div>
  );
});

// Component that demonstrates useCallback in effects
const TimerComponent = memo(({ onTick }: { onTick: () => void }) => {
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    const interval = setInterval(() => {
      onTick();
    }, 1000);
    return () => clearInterval(interval);
  }, [onTick]);

  return (
    <div className="panel gradient-3">
      <header>
        <h3>Timer Component</h3>
        <p className="muted">Renders: {renderCount.current}</p>
      </header>
      <p>This component uses setInterval with a callback</p>
    </div>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [timerCount, setTimerCount] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to add to log
  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
  }, []);

  // Track render counts for each button
  const inlineRenderCount = useRef(0);
  const stableRenderCount = useRef(0);
  const dependencyRenderCount = useRef(0);

  // Toggle theme function with useCallback
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
    addLog(`Theme changed to ${isDarkMode ? 'light' : 'dark'} mode`);
  }, [isDarkMode, addLog]);

  // 1. Normal inline function (new ref on each render)
  const incrementInline = () => {
    setCount((c) => c + 1);
    addLog("Inline function called");
    inlineRenderCount.current++;
  };

  // 2. useCallback with no dependency (same ref always)
  const incrementStable = useCallback(() => {
    setCount((c) => c + 1);
    addLog("Stable callback called");
    stableRenderCount.current++;
  }, [addLog]);

  // 3. useCallback with dependency (updates only when `text` changes)
  const logText = useCallback(() => {
    console.log("Current text:", text);
    addLog(`Text logged: "${text}"`);
    dependencyRenderCount.current++;
  }, [text, addLog]);

  // 4. Callback with transformed text
  const transformText = useCallback((newText: string) => {
    setTransformedText(newText);
    addLog(`Text transformed to: "${newText}"`);
  }, [addLog]);

  // 5. Callback for timer - stable identity important for effects
  const handleTimerTick = useCallback(() => {
    setTimerCount((c) => c + 1);
  }, []);

  // 6. Toggle timer component
  const toggleTimer = useCallback(() => {
    setShowTimer((prev) => !prev);
    addLog(`Timer ${showTimer ? "stopped" : "started"}`);
  }, [showTimer, addLog]);

  // 7. Expensive calculation demo
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const getEvenNumbers = useCallback(() => {
    addLog("Filtering even numbers...");
    return numbers.filter((n) => n % 2 === 0);
  }, [numbers, addLog]);

  // 8. Reset function
  const resetAll = useCallback(() => {
    setCount(0);
    setText("");
    setTransformedText("");
    setTimerCount(0);
    setLog([]);
    inlineRenderCount.current = 0;
    stableRenderCount.current = 0;
    dependencyRenderCount.current = 0;
    addLog("All states reset");
  }, [addLog]);

  return (
    <div className={`ucbdemo ${isDarkMode ? 'dark' : 'light'}`}>
      {/* App bar */}
      <div className="appbar">
        <h2 className="title">useCallback Demo</h2>
        <div className="controls">
          <button className="btn" onClick={toggleTheme}>
            Toggle Theme
          </button>
          <button className="btn" onClick={resetAll}>
            Reset All
          </button>
        </div>
      </div>

      <div className="grid">
        {/* Left Column */}
        <div>
          {/* Basic Concepts Panel */}
          <div className="panel gradient-1">
            <header>
              <h3>Basic Example</h3>
              <p className="muted">Compare inline vs memoized functions</p>
            </header>
            <p>
              Count: <b>{count}</b>
            </p>
            <div className="comparison">
              <div>
                <h4>Inline Function</h4>
                <p className="muted">New reference every render</p>
                <ChildButton 
                  onClick={inlineRenderCount.current === 0 ? incrementInline : () => {
                    inlineRenderCount.current++;
                    incrementInline();
                  }} 
                  label="Increment Inline" 
                  renderCount={inlineRenderCount.current}
                />
                <div className="code-block">
                  {`const incrementInline = () => {\n  setCount(c => c + 1);\n};`}
                </div>
              </div>
              <div>
                <h4>useCallback</h4>
                <p className="muted">Stable reference</p>
                <ChildButton 
                  onClick={stableRenderCount.current === 0 ? incrementStable : () => {
                    stableRenderCount.current++;
                    incrementStable();
                  }} 
                  label="Increment useCallback" 
                  renderCount={stableRenderCount.current}
                />
                <div className="code-block">
                  {`const incrementStable = useCallback(() => {\n  setCount(c => c + 1);\n}, []);`}
                </div>
              </div>
            </div>
          </div>

          {/* Dependency Array Panel */}
          <div className="panel gradient-2">
            <header>
              <h3>Dependency Array</h3>
              <p className="muted">
                Callback updates only when dependencies change
              </p>
            </header>
            <input
              className="input"
              type="text"
              placeholder="Type something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="row">
              <ChildButton 
                onClick={dependencyRenderCount.current === 0 ? logText : () => {
                  dependencyRenderCount.current++;
                  logText();
                }} 
                label="Log Text (memoized)" 
                renderCount={dependencyRenderCount.current}
              />
            </div>
            <div className="dependency-list">
              <span className="dependency-chip">text: "{text}"</span>
            </div>
            <div className="code-block">
              {`const logText = useCallback(() => {\n  console.log("Current text:", text);\n}, [text]);`}
            </div>
          </div>

          {/* Timer Example */}
          <div className="panel gradient-3">
            <header>
              <h3>useCallback in Effects</h3>
              <p className="muted">Stable callbacks prevent effect re-runs</p>
            </header>
            <p>Timer count: {timerCount}</p>
            <div className="row">
              <button className="btn" onClick={toggleTimer}>
                {showTimer ? "Stop Timer" : "Start Timer"}
              </button>
            </div>
            {showTimer && <TimerComponent onTick={handleTimerTick} />}
            <div className="code-block">
              {`const handleTimerTick = useCallback(() => {\n  setTimerCount(c => c + 1);\n}, []);`}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Text Transformation Example */}
          <TextDisplay text={text} onTransform={transformText} />
          {transformedText && (
            <div className="panel">
              <header>
                <h3>Transformed Text</h3>
              </header>
              <p>"{transformedText}"</p>
            </div>
          )}

          {/* Expensive Calculation */}
          <div className="panel gradient-4">
            <header>
              <h3>Performance Example</h3>
              <p className="muted">Avoid re-running heavy calculations</p>
            </header>
            <div className="row">
              <button
                className="btn"
                onClick={() => {
                  const evens = getEvenNumbers();
                  addLog(`Even numbers: [${evens.join(", ")}]`);
                }}
              >
                Get Even Numbers
              </button>
            </div>
            <div className="dependency-list">
              <span className="dependency-chip">numbers: [1, 2, ..., 10]</span>
            </div>
            <div className="code-block">
              {`const getEvenNumbers = useCallback(() => {\n  return numbers.filter(n => n % 2 === 0);\n}, [numbers]);`}
            </div>
          </div>

          {/* Notes Panel */}
          <div className="panel">
            <header>
              <h3>Key Takeaways</h3>
            </header>
            <ul className="list">
              <li>
                <b>Inline functions</b> create new references every render → causes re-renders in optimized children.
              </li>
              <li>
                <b>useCallback</b> memoizes function references between renders when dependencies don't change.
              </li>
              <li>
                The <b>dependency array</b> determines when the callback gets recreated.
              </li>
              <li>
                Essential for:
                <ul>
                  <li>Passing stable callbacks to optimized child components</li>
                  <li>Preventing unnecessary effect re-runs</li>
                  <li>Memoizing expensive calculations</li>
                  <li>Event handlers that depend on state/props</li>
                </ul>
              </li>
              <li>
                <b>Don't overuse</b> - only when you need referential equality
              </li>
            </ul>
          </div>

          {/* Log Panel */}
          <div className="panel log">
            <header>
              <h3>Activity Log</h3>
              <p className="muted">Track function calls and re-renders</p>
            </header>
            <div className="loglist">
              {log.map((entry, index) => (
                <div key={index} className="log-entry">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}