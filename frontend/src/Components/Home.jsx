// In your /home component (Home.jsx or Home.js)
import { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";

const API_BASE_URL = "https://pangea-tech-backend.onrender.com";

export default function Home() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/teams`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch teams");
      })
      .then((data) => {
        // console.log(data);
        setTeams(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading teams...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="pb-4">
      {/* Header Nav */}
      <div className="flex overflow-x-auto gap-4 mb-6 border-b p-4 bg-blue-700">
        {teams.map((team) => (
          <button
            key={team._id}
            className="text-white hover:underline whitespace-nowrap"
            onClick={() => navigate(`/teams/${team._id}`)}
          >
            {team.team_name}
          </button>
        ))}
      </div>

      {/* Card Layout */}
      <div className="mx-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white shadow-md rounded-2xl p-4 hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/teams/${team._id}`)}
          >
            <img
              src={team.logoUrl || "/placeholder.png"}
              alt={team.team_name}
              className="h-32 w-full object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-center">
              {team.team_name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
