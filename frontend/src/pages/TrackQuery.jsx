import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function TrackQuery() {
  const navigate = useNavigate();

  const [ticketId, setTicketId] = useState("");
  const [queryData, setQueryData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const trackQuery = async (e) => {
    e.preventDefault();

    if (!ticketId.trim()) {
      setMessage("Please enter a Ticket ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setQueryData(null);

    try {
      const response = await API.get(`/track-query/${ticketId}/`);

      setQueryData(response.data);

    } catch (error) {

      setMessage("Ticket not found.");

    } finally {

      setLoading(false);

    }
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "OPEN":
        return "#ef4444";

      case "IN_PROGRESS":
        return "#f59e0b";

      case "RESOLVED":
        return "#22c55e";

      default:
        return "#6b7280";
    }

  };

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          Track Query
        </h1>

        <p className="form-subtitle">
          Enter your Ticket ID to check the latest status of your query.
        </p>

        <form onSubmit={trackQuery}>

          <div className="form-group">

            <label className="form-label">
              Ticket ID
            </label>

            <input
              className="form-input"
              type="text"
              placeholder="Example: TKT-AB12CD34"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              required
            />

          </div>

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Searching..." : "Track Query"}
          </button>

        </form>

        {message && (

          <div className="error-message">
            {message}
          </div>

        )}

        {queryData && (

          <div
            style={{
              marginTop: "30px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "25px",
              background: "#f9fafb",
            }}
          >

            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              Ticket Details
            </h2>

            <p>
              <strong>Ticket ID:</strong>
              <br />
              {queryData.ticket_id}
            </p>

            <br />

            <p>
              <strong>Query:</strong>
              <br />
              {queryData.query_text}
            </p>

            <br />

            <p>
              <strong>Status:</strong>

              <span
                style={{
                  marginLeft: "10px",
                  background: getStatusColor(queryData.status),
                  color: "#fff",
                  padding: "6px 15px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                {queryData.status.replace("_", " ")}
              </span>

            </p>

            <br />

            <p>
              <strong>Admin Response:</strong>
            </p>

            <div
              style={{
                marginTop: "10px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              {queryData.admin_response
                ? queryData.admin_response
                : "No response from admin yet."}
            </div>

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

export default TrackQuery;