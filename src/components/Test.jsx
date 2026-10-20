import { useState } from "react";

function App() {
  // Declare a state variable called "count"
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Counter App</h1>

      <p className="text-2xl mb-4">You clicked {count} times</p>

      <div className="flex gap-4">
        {/* Increase */}
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        >
          +
        </button>

        {/* Decrease */}
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          -
        </button>

        {/* Reset */}
        <button
          onClick={() => setCount(0)}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
