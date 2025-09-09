import { useState } from "react";

function App() {
  const [meetId, setMeetId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Google Meet ID:", meetId);
    console.log("before making call to the backend");
    await fetch("http://localhost:3001/start-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetUrl: meetId }),
    });
    console.log("request sent to backend");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center", // horizontal center
        alignItems: "center",
        marginLeft: "500px", // vertical center
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Enter your Google Meet ID</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="e.g. abc-defg-hij"
            value={meetId}
            onChange={(e) => setMeetId(e.target.value)}
            style={{ padding: "8px", fontSize: "16px" }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
