import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function Feedback() {
  const navigate = useNavigate();

  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackId, setFeedbackId] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/verify");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/feedback/", {
        user: userId,
        feedback_text: feedbackText,
      });

      setFeedbackId(response.data.feedback_id);
      setIsSuccess(true);
      setMessage("Thank you! Your feedback has been submitted.");

      setFeedbackText("");

    } catch (error) {

      setIsSuccess(false);

      if (error.response) {
        setMessage("Unable to submit feedback.");
      } else {
        setMessage("Server Error");
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          Submit Feedback
        </h1>

        <p className="form-subtitle">
          Help us improve by sharing your valuable feedback.
        </p>

        <form onSubmit={submitFeedback}>

          <div className="form-group">

            <label className="form-label">
              Your Feedback
            </label>

            <textarea
              className="form-textarea"
              rows="6"
              placeholder="Write your feedback here..."
              value={feedbackText}
              onChange={(e) =>
                setFeedbackText(e.target.value)
              }
              required
            />

          </div>

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
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

        {feedbackId && (

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f0fdf4",
              border: "1px solid #22c55e",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>Feedback ID</h3>

            <h2
              style={{
                color: "#2563eb",
              }}
            >
              {feedbackId}
            </h2>

            <p>
              Thank you for helping us improve our service.
            </p>

          </div>

        )}

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

export default Feedback;