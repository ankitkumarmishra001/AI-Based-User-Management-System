import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function VerifyUser() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/verify-user/", {
        email_or_phone: emailOrPhone,
      });

      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      localStorage.setItem(
        "security_question",
        response.data.security_question
      );

      setIsSuccess(true);
      setMessage("✅ User verified successfully.");

      setTimeout(() => {
        navigate("/security-check");
      }, 1500);

    } catch (error) {

      setIsSuccess(false);

      if (error.response) {

        if (error.response.data.error) {
          setMessage(error.response.data.error);
        } else {
          setMessage("Verification failed.");
        }

      } else {

        setMessage("Server not responding.");

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h1 className="form-title">
          User Verification
        </h1>

        <p className="form-subtitle">
          Verify your registered Email Address or Phone Number
          to continue.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label className="form-label">
              Email or Phone Number
            </label>

            <input
              className="form-input"
              type="text"
              placeholder="Enter Email or Phone"
              value={emailOrPhone}
              onChange={(e) =>
                setEmailOrPhone(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify User"}
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

          Don't have an account?

          <br />
          <br />

          <button
            className="secondary-btn"
            onClick={() => navigate("/")}
          >
            Register Here
          </button>

        </div>

      </div>

    </div>
  );
}

export default VerifyUser;