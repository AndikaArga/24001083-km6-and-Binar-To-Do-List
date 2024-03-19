import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const increment2 = () => {
    setCount(count + 2);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Angka tidak boleh kurang dari 0");
    }
  };

  const reset = () => {
    if (count > 0) {
      setCount(0);
    } else {
      alert("angka udah 0 nih bro");
    }
  };

  return (
    <div>
      <p>Count : {count}</p>
      <div className="flex gap-4">
        <button onClick={increment}> Incerement</button>
        <button onClick={increment2}> Incerement+2</button>
        <button onClick={decrement}> Decerement</button>
        <button onClick={reset}> Reset</button>
      </div>
    </div>
  );
}

export default Counter;
