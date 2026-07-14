import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function SecurityCheck() {
  const navigate = useNavigate();

  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const question = localStorage.getItem("security_question");

    if (question) {
      setSecurityQuestion(question);
    } else {
      setMessage(
        "Security question not found. Please verify yourself again."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setMessage("User not verified.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/security-check/", {
        user_id: userId,
        security_answer: securityAnswer,
      });

      setIsSuccess(true);
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {

      setIsSuccess(false);

      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Verification failed.");
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          Security Verification
        </h1>

        <p className="form-subtitle">
          Answer your security question to continue.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">
              Security Question
            </label>

            <input
              className="form-input"
              value={securityQuestion}
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Security Answer
            </label>

            <input
              className="form-input"
              type={showAnswer ? "text" : "password"}
              value={securityAnswer}
              onChange={(e) =>
                setSecurityAnswer(e.target.value)
              }
              placeholder="Enter your answer"
              required
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={showAnswer}
                onChange={() =>
                  setShowAnswer(!showAnswer)
                }
              />{" "}
              Show Answer
            </label>
          </div>

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Verify Answer"}
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
          Need to verify another account?

          <br />
          <br />

          <button
            className="secondary-btn"
            onClick={() => navigate("/verify")}
          >
            Back to Verification
          </button>
        </div>

      </div>
    </div>
  );
}

export default SecurityCheck;