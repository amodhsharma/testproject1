import React, { useState } from "react";
import { API_ENDPOINTS } from "./config/apiEndpoints";

import ApiDropdown from "./components/ApiDropdown/ApiDropdown";
import JsonInput from "./components/JsonInput/JsonInput";
import AckOutput from "./components/AckOutput/AckOutput";
import MainOutput from "./components/MainOutput/MainOutput";

import ScriptToggle from "./components/ScriptToggle/ScriptToggle"; // <-- new import
import { applyScripts } from "./components/ScriptToggle/scripts"; // <-- new import

import "./App.css";

function App() {
  const [selectedApi, setSelectedApi] = useState(null);
  const [jsonRequest, setJsonRequest] = useState("");
  const [ackResponse, setAckResponse] = useState("");
  const [mainResponse, setMainResponse] = useState("");

  const [isScriptActive, setIsScriptActive] = useState(false); // <-- new state

  const handleToggleScripts = () => { // <-- new function
    setIsScriptActive((prev) => !prev);
  };

  const handleSendRequest = async () => {
    if (!selectedApi) {
      setAckResponse("Please select an API first!");
      return;
    }

    // Apply scripts only if toggle is active
    const finalRequest = applyScripts(jsonRequest, isScriptActive);

    try {
      // Send request to local server on port 8085
      const res = await fetch(selectedApi.path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: finalRequest, // <-- use finalRequest instead of jsonRequest
      });

      const ackData = await res.json();
      setAckResponse(JSON.stringify(ackData, null, 2));

      // After ack, call webhook on port 9095
      const webhookRes = await fetch("http://localhost:9095/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: finalRequest, // <-- use finalRequest here as well
      });

      const mainData = await webhookRes.json();
      setMainResponse(JSON.stringify(mainData, null, 2));
    } catch (error) {
      setAckResponse("Error sending request: " + error.message);
      setMainResponse("");
    }
  };

  return (
    <div className="app-container">
      <h2>B2B's Internal Use API Tester</h2>

      {/* API Dropdown */}
      <ApiDropdown
        apiList={API_ENDPOINTS}
        selectedApi={selectedApi}
        onApiSelect={setSelectedApi}
      />

      {/* JSON Input */}
      <JsonInput value={jsonRequest} onChange={setJsonRequest} />

      {/* Send button + Script Toggle */}
      <div style={{ margin: "10px 0", display: "flex", alignItems: "center", gap: "10px"}}>
        <button className="send-btn" onClick={handleSendRequest}>
          Send Request
        </button>
        <ScriptToggle
          isActive={isScriptActive}
          toggleScripts={handleToggleScripts}
        />
      </div>

      {/* Ack Output */}
      <AckOutput ackResponse={ackResponse} />

      {/* Main Output */}
      <MainOutput mainResponse={mainResponse} />
    </div>
  );
}

export default App;
