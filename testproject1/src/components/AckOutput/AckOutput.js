import React from "react";
import "./AckOutput.css";

const AckOutput = ({ ack }) => {
  return (
    <div className="ack-output">
      <strong>Ack/Nack Response:</strong>
      <pre>{ack ? JSON.stringify(ack, null, 2) : "No response yet."}</pre>
    </div>
  );
};

export default AckOutput;
