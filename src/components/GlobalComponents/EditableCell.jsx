import React, { useState } from "react";

const EditableCell = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      type="text"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
};

export default EditableCell;
