import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function ViewProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/verify");
      return;
    }

    try {
      const response = await API.get(`/profile/${userId}/`);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
      setMessage("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="form-page">
        <div className="form-card">
          <h2 style={{ textAlign: "center" }}>Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          My Profile
        </h1>

        <p className="form-subtitle">
          View your registered information.
        </p>

        {message && (
          <div className="error-message">
            {message}
          </div>
        )}

        {profile && (
          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={profile.full_name}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <input
                className="form-input"
                value={profile.gender}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                className="form-input"
                value={profile.age}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                value={profile.email}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                value={profile.phone}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className="form-input"
                value={profile.city}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                className="form-input"
                value={profile.state}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                className="form-input"
                value={profile.country}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Occupation</label>
              <input
                className="form-input"
                value={profile.occupation}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hobby</label>
              <input
                className="form-input"
                value={profile.hobby}
                readOnly
              />
            </div>

          </div>
        )}

        <button
          className="primary-btn"
          onClick={() => navigate("/update-profile")}
        >
          Edit Profile
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default ViewProfile;