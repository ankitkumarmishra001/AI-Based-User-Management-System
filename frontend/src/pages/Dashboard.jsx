import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaUser,
  FaUserEdit,
  FaQuestionCircle,
  FaSearch,
  FaCommentDots,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        navigate("/verify");
        return;
      }

      try {
        const response = await API.get(`/profile/${userId}/`);
        setUserName(response.data.full_name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const cards = [
    {
      title: "View Profile",
      description: "View your registered information.",
      icon: <FaUser className="dashboard-icon" />,
      path: "/profile",
    },
    {
      title: "Update Profile",
      description: "Edit your personal details.",
      icon: <FaUserEdit className="dashboard-icon" />,
      path: "/update-profile",
    },
    {
      title: "Raise Query",
      description: "Create a new support request.",
      icon: <FaQuestionCircle className="dashboard-icon" />,
      path: "/raise-query",
    },
    {
      title: "Track Query",
      description: "Check the status of your ticket.",
      icon: <FaSearch className="dashboard-icon" />,
      path: "/track-query",
    },
    {
      title: "Feedback",
      description: "Share your valuable feedback.",
      icon: <FaCommentDots className="dashboard-icon" />,
      path: "/feedback",
    },
    {
      title: "AI Chatbot",
      description: "Talk with your AI Assistant.",
      icon: <FaRobot className="dashboard-icon" />,
      path: "/chatbot",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("security_question");

    navigate("/verify");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>AI-Based Smart Query Management System</h1>

        <p>
          Welcome back, <strong>{userName}</strong> 👋
        </p>

        <p>
          Manage your profile, raise support requests, track tickets,
          submit feedback, and interact with the AI assistant from one
          place.
        </p>
      </div>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(card.path)}
          >
            {card.icon}

            <h3>{card.title}</h3>

            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt style={{ marginRight: "8px" }} />
        Logout
      </button>

      <div className="footer">
        © 2026 AI-Powered Smart User Registration and Query Management
        System
      </div>
    </div>
  );
}

export default Dashboard;