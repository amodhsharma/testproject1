import React from "react";
import "./scripts.css";

export default function ScriptToggle({ isActive, toggleScripts }) {
  return (
    <button
      onClick={toggleScripts}
      className={isActive ? "active-script-btn" : "inactive-script-btn"}
    >
      {isActive ? "Deactivate Scripts" : "Activate Scripts"}
    </button>
  );
}
