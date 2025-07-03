import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [name, setName] = useState("");

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center  p-4">
      <input
        type="text"
        placeholder="Enter room name"
        className="border-2 border-gray-300 rounded-lg p-2 mb-4 w-full max-w-md"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="text-center">
        <Link to={`/room/?name=${name}`}>Join</Link>
      </div>
    </div>
  );
}
