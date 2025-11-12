import React, { useState } from "react";
import { API_ENDPOINTS } from "./config/apiEndpoints";

import ApiDropdown from "./components/ApiDropdown/ApiDropdown";
import JsonInput from "./components/JsonInput/JsonInput";
import AckOutput from "./components/AckOutput/AckOutput";
import MainOutput from "./components/MainOutput/MainOutput";

import "./App.css";

function App() {
  const [selectedApi, setSelectedApi] = useState(null);
  const [jsonRequest, setJsonRequest] = useState("");
  const [ackResponse, setAckResponse] = useState("");
  const [mainResponse, setMainResponse] = useState("");

  const handleSendRequest = async () => {
    if (!selectedApi) {
      setAckResponse("Please select an API first!");
      return;
    }

    try {
      // Send request to local server on port 8085
      const res = await fetch(selectedApi.path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonRequest,
      });

      const ackData = await res.json();
      setAckResponse(JSON.stringify(ackData, null, 2));

      // After ack, call webhook on port 9095
      const webhookRes = await fetch("http://localhost:9095/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonRequest,
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

      {/* Send button */}
      <div style={{ margin: "10px 0" }}>
        <button className="send-button" onClick={handleSendRequest}>
          Send Request
        </button>
      </div>

      {/* Ack Output */}
      <AckOutput ackResponse={ackResponse} />

      {/* Main Output */}
      <MainOutput mainResponse={mainResponse} />
    </div>
  );
}

export default App;
