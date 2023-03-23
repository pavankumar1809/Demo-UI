import React from "react";
import "../CSS/pages.css";
import SSOLogin from "./SSOLogin";

function Login() {
  return (
    <div>
      <form className="box">
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="button-1">
            Submit
          </button>
        </div>
        <br />
        <p className="forgot-password text-right">
          <a href="/">Forgot password?</a>
        </p>
      </form><br/>
      <SSOLogin />
    </div>
  );
}

export default Login;
