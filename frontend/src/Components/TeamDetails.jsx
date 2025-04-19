import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiEdit2Line } from "react-icons/ri";

export default function TeamDetails() {
  const { teamId } = useParams();
  console.log(teamId);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/teams/${teamId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch team details");
      })
      .then((data) => {
        console.log("team:", data);
        setTeam(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching team details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [teamId]);

  const handleMetadataChange = (key, value) => {
    setTeam({ ...team, [key]: value });
  };

  const saveMetadata = async () => {
    try {
      await axios.put(`http://localhost:5000/api/teams/${teamId}`, team);
      setIsEditingTeam(false);
    } catch (error) {
      console.error("Error saving metadata:", error);
      setError("Failed to save metadata changes");
    }
  };

  const handlePlayerEdit = (index, key, value) => {
    const updatedPlayers = [...team.players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [key]: value,
    };
    setTeam({ ...team, players: updatedPlayers });
  };

  const savePlayer = async (index) => {
    try {
      const player = team.players[index];
      console.log("Saving player:", player);
      await axios.put(
        `http://localhost:5000/api/teams/${teamId}/players/${index}`,
        player
      );
      setEditingPlayerIndex(null);
    } catch (error) {
      console.error("Error saving player:", error);
      setError("Failed to save player changes");
    }
  };

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

      <div className="mx-32">
        <div className="border rounded shadow p-6">
          <div className="flex flex-row items-center space-x-6">
            <img
              src={team.logoUrl}
              alt={team.team_name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="border-l border-gray-300 h-32"></div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{team.team_name}</h2>
              <div className="mt-4 space-y-2">
                {["captain", "head_coach", "owners", "support_staff"].map((key) => (
                  <div key={key} className="flex items-center">
                    <label className="font-medium capitalize mr-2 w-32">
                      {key.replace("_", " ")}:
                    </label>
                    {isEditingTeam ? (
                      <div className="flex-1">
                        <input
                          type="text"
                          value={
                            Array.isArray(team[key])
                              ? team[key].join(", ")
                              : team[key]
                          }
                          onChange={(e) =>
                            handleMetadataChange(
                              key,
                              key === "owners" || key === "support_staff"
                                ? e.target.value.split(",").map((s) => s.trim())
                                : e.target.value
                            )
                          }
                          className="w-full border rounded p-1"
                        />
                      </div>
                    ) : (
                      <span className="flex-1">
                        {Array.isArray(team[key])
                          ? team[key].join(", ")
                          : team[key]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <RiEdit2Line
                  className="text-xl cursor-pointer hover:text-blue-500"
                  onClick={() => setIsEditingTeam(!isEditingTeam)}
                />
                {isEditingTeam && (
                  <button
                    onClick={saveMetadata}
                    className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl mt-6 text-center font-bold">Players</h2>
      <div className="mx-32 grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.players?.map((player, index) => (
          <div key={index} className="border rounded shadow">
            {/* edit option  */}

            <img
              src={player.image}
              alt={player.name}
              className="w-full h-80 px-2 object-cover"
            />
            {/* //horizontal line  */}
            <div className="border-b border-gray-300"></div>

            <div>
              <h3 className="text-xl font-bold mt-2 text-center ">
                {player.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">{player.role}</p>
            </div>
            <div className="flex justify-center mt-2">
              <RiEdit2Line
                className="text-xl cursor-pointer hover:text-blue-500"
                onClick={() => setEditingPlayerIndex(index)}
              />
            </div>
            {editingPlayerIndex === index && (
              <div className="p-4 space-y-2">
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerEdit(index, "name", e.target.value)
                  }
                  className="w-full mt-2 border p-1 rounded"
                  placeholder="Player Name"
                />
                <input
                  type="text"
                  value={player.role}
                  onChange={(e) =>
                    handlePlayerEdit(index, "role", e.target.value)
                  }
                  className="w-full mt-2 border p-1 rounded"
                  placeholder="Player Role"
                />
                <input
                  type="text"
                  value={player.image}
                  onChange={(e) =>
                    handlePlayerEdit(index, "image", e.target.value)
                  }
                  className="w-full mt-2 border p-1 rounded"
                  placeholder="Image URL"
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => savePlayer(index)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPlayerIndex(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
