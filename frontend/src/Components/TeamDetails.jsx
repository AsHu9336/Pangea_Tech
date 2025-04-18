import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeamDetails() {
  const { teamId } = useParams();
  console.log(teamId);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const handlePlayerEdit = (index, field, value) => {
  //   const updatedPlayers = [...team.players];
  //   updatedPlayers[index] = {
  //     ...updatedPlayers[index],
  //     [field]: value
  //   };
  //   setTeam({
  //     ...team,
  //     players: updatedPlayers
  //   });
  // };

  // const savePlayer = async (index) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/teams/${teamId}/players/${index}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(team.players[index])
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save player');
  //     }
  //   } catch (error) {
  //     console.error('Error saving player:', error);
  //     setError('Failed to save player changes');
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/teams/${teamId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch team details');
      })
      .then((data) => {
        console.log('team:', data);
        setTeam(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching team details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [teamId]);

  // const savePlayer = async (index) => {
  //   const player = team.players[index];
  //   await axios.put(`http://localhost:5000/api/teams/${id}/players/${index}`, player);
  // };

  if (loading) {
    return <div className="text-center mt-4">Loading team details...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  if (!team) {
    return <div className="text-center mt-4">No team data found</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">{team.team_name}</h1>

      <div className="space-y-2">
        {["captain", "head_coach", "owners", "support_staff"].map((key) => (
          <div key={key}>
            <label className="font-medium capitalize">
              {key.replace("_", " ")}:{" "}
            </label>
            <input
              type="text"
              value={
                Array.isArray(team[key]) ? team[key].join(", ") : team[key]
              }
              // onChange={(e) =>
              //   handleMetadataChange(
              //     key,
              //     key === "owners" || key === "support_staff"
              //       ? e.target.value.split(",").map((s) => s.trim())
              //       : e.target.value
              //   )
              // }
              className="border rounded p-1 ml-2"
            />
          </div>
        ))}
        <button
          // onClick={saveMetadata}
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
        >
          Save Metadata
        </button>
      </div>

      <h2 className="text-2xl mt-6 text-center font-bold">Players</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.players?.map((player, index) => (
          <div key={index} className="border p-2 rounded shadow">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-32 object-cover"
            />
            <input
              type="text"
              value={player.name}
              onChange={(e) => handlePlayerEdit(index, "name", e.target.value)}
              className="w-full mt-2 border p-1"
            />
            <input
              type="text"
              value={player.role}
              onChange={(e) => handlePlayerEdit(index, "role", e.target.value)}
              className="w-full mt-2 border p-1"
            />
            <input
              type="text"
              value={player.image}
              onChange={(e) => handlePlayerEdit(index, "image", e.target.value)}
              placeholder="Image URL"
              className="w-full mt-2 border p-1"
            />
            <button
              onClick={() => savePlayer(index)}
              className="mt-2 w-full bg-green-500 text-white py-1 rounded"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
