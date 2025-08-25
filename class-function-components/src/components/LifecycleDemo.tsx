import { useState, type FC } from "react";
import ClassCounter from "./ClassCounter";
import FunctionCounter from "./FunctionCounter";

const LifecycleDemo: FC = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class vs Function Components</h1>
      <button
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md"
        onClick={() => setShow(!show)}
      >
        Toggle Components
      </button>

      {show && (
        <div className="grid grid-cols-2 gap-4">
          <ClassCounter />
          <FunctionCounter />
        </div>
      )}
    </div>
  );
};

export default LifecycleDemo;
