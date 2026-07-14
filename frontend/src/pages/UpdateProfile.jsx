import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function UpdateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    hobby: "",
    security_question: "",
    security_answer: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/verify");
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get(`/profile/${userId}/`);

      setFormData(response.data);
    } catch (error) {
      setMessage("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await API.put(
        `/update-profile/${userId}/`,
        formData
      );

      setIsSuccess(true);
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/profile");
      }, 1500);

    } catch (error) {

      setIsSuccess(false);

      if (error.response) {
        setMessage(
          JSON.stringify(error.response.data)
        );
      } else {
        setMessage("Server Error");
      }

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return (
      <div className="form-page">
        <div className="form-card">
          <h2 style={{ textAlign: "center" }}>
            Loading Profile...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          Update Profile
        </h1>

        <p className="form-subtitle">
          Edit your profile information.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">
                Full Name
              </label>

              <input
                className="form-input"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Gender
              </label>

              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Age
              </label>

              <input
                className="form-input"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email
              </label>

              <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone
              </label>

              <input
                className="form-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                City
              </label>

              <input
                className="form-input"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                State
              </label>

              <input
                className="form-input"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Country
              </label>

              <input
                className="form-input"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Occupation
              </label>

              <input
                className="form-input"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Hobby
              </label>

              <input
                className="form-input"
                name="hobby"
                value={formData.hobby}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Security Question
              </label>

              <input
                className="form-input"
                name="security_question"
                value={formData.security_question}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Security Answer
              </label>

              <input
                className="form-input"
                name="security_answer"
                value={formData.security_answer}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="primary-btn"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Profile"}
          </button>

        </form>

        {message && (
          <div
            className={
              isSuccess
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </div>
        )}

        <button
          className="secondary-btn"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default UpdateProfile;