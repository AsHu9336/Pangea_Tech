// In your /home component (Home.jsx or Home.js)
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  //   const location = useLocation();
    const navigate = useNavigate();

  //   useEffect(() => {
  //     const params = new URLSearchParams(location.search);
  //     const token = params.get("token");
  //     if (token) {
  //       localStorage.setItem("token", token);
  //       // Optionally clean URL
  //       navigate("/home", { replace: true });
  //     }
  //   }, [location, navigate]);

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data);
        setTeams(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  return (
    <>
      
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
    
    </>
  );
}
