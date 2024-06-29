import React, { useState } from "react";

const Counter = ({ label, initialCount, onChange }) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    onChange(newCount);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCount(0);
      onChange(0);
    } else {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setCount(intValue);
        onChange(intValue);
      }
    }
  };

  return (
    <div className="counter-wrapper">
      <label className="form-label">{label}</label>
      <div className="counter-container justify-content-between">
        <button
          type="button"
          className="counter-button"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          type="text"
          className="counter-input"
          value={count}
          onChange={handleChange}
        />
        <button
          type="button"
          className="counter-button"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
