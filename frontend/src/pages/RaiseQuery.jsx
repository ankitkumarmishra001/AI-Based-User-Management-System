import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function RaiseQuery() {
  const navigate = useNavigate();

  const [queryText, setQueryText] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/verify");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/raise-query/", {
        user: userId,
        query_text: queryText,
      });

      setIsSuccess(true);
      setMessage("Query submitted successfully.");
      setTicketId(response.data.ticket_id);
      setQueryText("");

    } catch (error) {

      setIsSuccess(false);

      if (error.response) {
        setMessage("Unable to submit query.");
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
          Raise a Query
        </h1>

        <p className="form-subtitle">
          Describe your issue and we'll generate a support ticket.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label className="form-label">
              Describe Your Query
            </label>

            <textarea
              className="form-textarea"
              rows="6"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Explain your issue here..."
              required
            />

          </div>

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Query"}
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

        {ticketId && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #22c55e",
              borderRadius: "10px",
              background: "#f0fdf4",
              textAlign: "center",
            }}
          >
            <h3>Your Ticket ID</h3>

            <h2
              style={{
                color: "#2563eb",
              }}
            >
              {ticketId}
            </h2>

            <p>
              Save this Ticket ID to track your query later.
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

export default RaiseQuery;