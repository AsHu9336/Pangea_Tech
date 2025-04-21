import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = "https://pangea-tech-backend.onrender.com";

export default function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            console.log("Token received:", token);
            // Store token in localStorage
            localStorage.setItem("token", token);
            
            // Verify token with backend
            fetch(`${API_BASE_URL}/api/auth/verify`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    navigate("/home", { replace: true });
                } else {
                    throw new Error('Token verification failed');
                }
            })

            .catch(error => {
                console.error('Token verification error:', error);
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            });
        } else {
            console.error("No token received");
            navigate("/login", { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
                <p className="text-lg">
                    If you are not redirected automatically, click{" "}
                    <Link to="/login" className="text-blue-500 underline">
                        here
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
