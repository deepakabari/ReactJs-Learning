import { createContext, useContext, useState, type ReactNode } from "react";
import "./UseContextDemo.css";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`ucdemo ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

const AppBar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="appbar">
      <h2 className="title">useContext Demo</h2>
      <div className="controls">
        <button className="btn" onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};

const UserCard = () => {
  const { theme } = useTheme();
  return (
    <div className="panel gradient-2">
      <h3>User Profile</h3>
      <p className="muted">
        This card automatically adapts to the <b>{theme}</b> theme via Context.
      </p>
    </div>
  );
};

const SettingsPanel = () => {
  const { theme } = useTheme();
  return (
    <div className="panel gradient-3">
      <h3>Settings</h3>
      <p className="muted">
        Current theme is <span className="badge">{theme}</span>.
      </p>
    </div>
  );
};

const UseContextDemo = () => {
  return (
    <ThemeProvider>
      <AppBar />
      <div className="grid">
        <UserCard />
        <SettingsPanel />
      </div>
    </ThemeProvider>
  );
};

export default UseContextDemo;
