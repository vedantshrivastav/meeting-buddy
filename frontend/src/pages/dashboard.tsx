import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const [meetId, setMeetId] = useState("");

  if (!isSignedIn) {
    return (
      <p className="text-center mt-10">
        Please sign in to access the dashboard.
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetId.trim()) return alert("Enter a valid Google Meet ID");
    console.log("Google Meet ID entered:", meetId);
    // 👉 here you can call your backend service with meetId
    await fetch("https://meeting-buddy.onrender.com/start-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetUrl: meetId, userId: user.id }),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.firstName} 👋</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Google Meet ID"
          value={meetId}
          onChange={(e) => setMeetId(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
