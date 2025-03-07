import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [missingFields, setMissingFields] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse(null);
    setMissingFields(null);

    try {
      const res = await fetch("https://5s6t4kg9vb.execute-api.us-west-2.amazonaws.com/production/rental/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, username: "test_user" })
      });
      const data = await res.json();
      if (data.success) {
        navigate("/rental/chat-result", { state: { output: data.output } });
      } else if (data.missing_fields) {
        setMissingFields(data.missing_fields);
      } else {
        setResponse("Error: " + data.message);
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2>Car Rental Chatbot</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your rental request..."
      ></textarea>
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Processing..." : "Send"}
      </button>
      {missingFields && (
        <div className="missing-fields">
          <h4>Missing Information:</h4>
          <ul>
            {Object.keys(missingFields).map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}
      {response && <div className="response-box">{response}</div>}
    </div>
  );
};

export default Chatbot;
