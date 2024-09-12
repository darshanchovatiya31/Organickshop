import React, { useState } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch(
        "https://organickbackend.onrender.com/user/user-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess("Login successful!");
        setError(null);
        localStorage.setItem("isLogin", true);
        navigate("/");
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      setError("Error occurred during login. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <>
      <section className="login-section d-flex align-items-center justify-content-center">
        <div className="login-container p-4 shadow rounded">
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="mb-1">
                Email :{" "}
              </label>
              <input
                type="email"
                className="form-control mb-3"
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mb-1">
                Password :{" "}
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-3 "
                  id="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block w-100 mt-2"
            >
              Login
            </button>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {success && (
              <div className="alert alert-success mt-2">{success}</div>
            )}
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?
              <Link to={"/signup"} className="text-primary fw-bold ms-2">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
