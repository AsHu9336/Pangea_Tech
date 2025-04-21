import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://pangea-tech-backend.onrender.com";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        setMessage(data.message || "Error resetting password");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-2xl">
        <div className="w-full p-8">
          <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="bg-gray-200 mb-2 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="bg-gray-200 mb-2 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
              Reset Password
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
