import React from "react";
import "./JsonInput.css";

const JsonInput = ({ value, onChange }) => {
  return (
    <textarea
      className="json-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste JSON request here..."
    />
  );
};

export default JsonInput;
