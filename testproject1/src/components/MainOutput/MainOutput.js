import React from "react";
import "./MainOutput.css";

function MainOutput({ mainOutput }) {
  return (
    <div className="main-output">
      <strong>Webhook (9095) Output</strong>
      <pre>{mainOutput ? JSON.stringify(mainOutput, null, 2) : "Waiting for response..."}</pre>
    </div>
  );
}

export default MainOutput;
