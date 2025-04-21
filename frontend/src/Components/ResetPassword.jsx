import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = "https://pangea-tech-backend.onrender.com";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password reset successful!');
        navigate('/login');
      } else {
        setMessage(data.message || 'Error resetting password');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <form  className="w-full max-w-md">
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="New Password"
        //   value={password}
        //   onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Confirm Password"
        //   value={confirm}
        //   onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Reset Password
        </button>
      </form>
      {/* {message && <p className="mt-4 text-sm text-red-500">{message}</p>} */}
    </div>
  );
}
