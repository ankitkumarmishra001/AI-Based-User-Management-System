import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function Register() {
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

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Processing...");
    setIsSuccess(false);

    try {
      await API.post("/register/", formData);

      setIsSuccess(true);
      setMessage("🎉 Registration Successful!");

      setTimeout(() => {
        navigate("/verify");
      }, 2000);

    } catch (error) {

      setIsSuccess(false);

      if (error.response) {
        setMessage(
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        setMessage("Server Connection Failed");
      }
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          AI Smart Registration
        </h1>

        <p className="form-subtitle">
          Create your account to access the AI-Powered Smart User Registration
          and Query Management System.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                className="form-input"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className="form-input"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                className="form-input"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                className="form-input"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Occupation</label>
              <input
                className="form-input"
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hobby</label>
              <input
                className="form-input"
                type="text"
                name="hobby"
                value={formData.hobby}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Security Question</label>
              <input
                className="form-input"
                type="text"
                name="security_question"
                placeholder="Example: What is your favourite pet's name?"
                value={formData.security_question}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Security Answer</label>
              <input
                className="form-input"
                type="text"
                name="security_answer"
                value={formData.security_answer}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Create Account
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

        <div className="form-footer">
          Already registered?
          <br /><br />

          <button
            className="secondary-btn"
            onClick={() => navigate("/verify")}
          >
            Verify Yourself
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;