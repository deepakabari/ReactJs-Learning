import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import UseStateDemo from "./hooks-demo/UseStateDemo";
import UseEffectDemo from "./hooks-demo/UseEffectDemo";
import UseRefDemo from "./hooks-demo/UseRefDemo";
import UseContextDemo from "./hooks-demo/UseContextDemo";
import GrandParent from "./hooks-demo/UseContextDemo1";
import UseMemoDemo from "./hooks-demo/UseMemoDemo";
import UseCallbackDemo from "./hooks-demo/UseCallbackDemo";
import UseReducerDemo from "./hooks-demo/UseReducerDemo";
import type { JSX } from "react";
import Header from "./components/Header";

function DynamicComponent() {
  const { demoName } = useParams<{ demoName: string }>();
  const navigate = useNavigate();

  const demoComponents: Record<string, JSX.Element> = {
    useState: <UseStateDemo />,
    useEffect: <UseEffectDemo />,
    useRef: <UseRefDemo />,
    useContext: <UseContextDemo />,
    useContext1: <GrandParent />,
    useMemo: <UseMemoDemo />,
    useCallback: <UseCallbackDemo />,
    useReducer: <UseReducerDemo />,
  };

  if (!demoName || !demoComponents[demoName]) {
    navigate("/usestate", { replace: true });
    return null;
  }

  return demoComponents[demoName];
}

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/:demoName" element={<DynamicComponent />} />
          <Route path="*" element={<UseStateDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
