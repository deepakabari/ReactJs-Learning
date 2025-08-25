import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const tabs = [
    { name: "useState", path: "/useState" },
    { name: "useEffect", path: "/useEffect" },
    { name: "useCallback", path: "/useCallback" },
    { name: "useContext", path: "/useContext" },
    { name: "useMemo", path: "/useMemo" },
    { name: "useReducer", path: "/useReducer" },
    { name: "useRef", path: "/useRef" },
  ];

  // Toggle theme
  const toggleTheme = () => {
    if (theme === "dark") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setTheme("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setTheme("dark");
    }
  };

  return (
    <header className="header">
      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
      </button>
    </header>
  );
};

export default Header;
