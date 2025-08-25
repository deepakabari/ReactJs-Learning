import { useEffect, useState, type FC } from "react";

const FunctionCounter: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("FunctionCounter Mounted...");

    return () => {
      console.log("FunctionCounter Unmounted...");
    };
  }, []);

  useEffect(() => {
    if (count > 0) console.log("FunctionCounter Updated...");
  }, [count]);

  return (
    <div className="p-4 border rounded-xl shadow-md m-2">
      <h2 className="text-xl font-bold">Function Component Counter</h2>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Increment
      </button>
    </div>  
  );
};

export default FunctionCounter;
