import React, { useReducer } from "react";
import "./UseReducerDemo.css";

type State = {
  count: number;
  todos: string[];
  theme: "light" | "dark";
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "addTodo"; payload: string }
  | { type: "removeTodo"; payload: number }
  | { type: "toggleTheme" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    case "addTodo":
      return { ...state, todos: [...state.todos, action.payload] };
    case "removeTodo":
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== action.payload),
      };
    case "toggleTheme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

const initialState: State = {
  count: 0,
  todos: ["Learn useReducer", "Build a demo"],
  theme: "dark",
};

const UseReducerDemo: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [todoInput, setTodoInput] = React.useState("");

  return (
    <div className={`uedemo ${state.theme}`}>
      <div className="appbar">
        <h2 className="title">⚡ useReducer Hook Demo</h2>
        <div className="controls">
          <button
            className="btn ghost"
            onClick={() => dispatch({ type: "toggleTheme" })}
          >
            Toggle Theme
          </button>
        </div>
      </div>

      <div className="grid">
        <div className="panel gradient-1">
          <header>
            <h3>Counter Example</h3>
            <p className="muted">
              Dispatch actions to modify <code>count</code>.
            </p>
          </header>

          <div className="stats">
            <div className="stat">
              <span className="label">Count</span>
              <span className="value">{state.count}</span>
            </div>
          </div>

          <div className="row">
            <button
              className="btn"
              onClick={() => dispatch({ type: "increment" })}
            >
              ➕ Increment
            </button>
            <button
              className="btn"
              onClick={() => dispatch({ type: "decrement" })}
            >
              ➖ Decrement
            </button>
            <button
              className="btn ghost"
              onClick={() => dispatch({ type: "reset" })}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        <div className="panel gradient-2">
          <header>
            <h3>Todo List Example</h3>
            <p className="muted">
              A more advanced reducer handling arrays & payloads.
            </p>
          </header>

          <div className="row">
            <input
              className="input"
              type="text"
              placeholder="Enter todo..."
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                if (todoInput.trim()) {
                  dispatch({ type: "addTodo", payload: todoInput });
                  setTodoInput("");
                }
              }}
            >
              ➕ Add
            </button>
          </div>

          <ul className="list">
            {state.todos.map((todo, index) => (
              <li key={index} className="row">
                <span>{todo}</span>
                <button
                  className="btn ghost"
                  onClick={() =>
                    dispatch({ type: "removeTodo", payload: index })
                  }
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel gradient-3">
          <header>
            <h3>Why useReducer?</h3>
          </header>
          <ul className="list">
            <li>✔ Best when state is complex or has multiple sub-values.</li>
            <li>✔ Keeps state logic in one place (the reducer function).</li>
            <li>✔ Makes state transitions predictable.</li>
            <li>✔ Easy to test reducers separately.</li>
            <li>⚠ Overkill for very simple state (useState is fine).</li>
          </ul>
        </div>

        <div className="panel gradient-4">
          <header>
            <h3>Key Takeaways</h3>
          </header>
          <ul className="list">
            <li>
              Reducer: <code>(state, action) ⇒ newState</code>
            </li>
            <li>
              Actions can carry extra <b>payload</b>.
            </li>
            <li>
              Good for: <b>forms, counters, complex UI state</b>.
            </li>
            <li>Think of it like a mini Redux inside your component.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseReducerDemo;
