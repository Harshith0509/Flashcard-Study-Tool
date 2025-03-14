import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const Login = (props) => {
  // Defining a function to check if field is empty
  const isEmpty = (value) => value.trim() === "";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  // If a field is invalid, stop displaying the loading icon and instead show the error message
  const validate = () => {
    let errors = {};

    if (isEmpty(form.username)) {
      errors.username = "Username is required";
      setLoading(false);
    }

    if (isEmpty(form.password)) {
      errors.password = "Password is required";
      setLoading(false);
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // If validate returned true, attempt to log in
    if (validate(form)) {
      try {
        await AuthService.login(form.username, form.password);
        props.onLoggedIn();
      } catch {
        setLoading(false);
        // If log in fails, display error message
        setMessage("Username and/or password is not valid");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-12 ">
          <section className="row">
            <h2 className="display-5 text-white">
            Welcome to Flashcards—an interactive learning tool designed to help you master new concepts with ease.
            </h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  className="form-control-lg w-50"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => updateForm({ username: e.target.value })}
                  autoFocus={true}
                />
              </div>
              {formErrors.username && (
                <div className="text-warning ms-1">{formErrors.username}</div>
              )}
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  className="form-control-lg w-50"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                />
                {formErrors.password && (
                  <div className="text-warning ms-1">{formErrors.password}</div>
                )}
                {message && <div className="text-warning ms-1">{message}</div>}
              </div>
              <div className="form-group py-4">
                <button className="btn btn-dark px-3 fs-3" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Sign In</span>
                </button>
              </div>
            </form>

            <span className="text-white">Not registered yet? </span>
            <Link to={"/register"} className="link-light">
              Sign up here
            </Link>
            <br />
            <br />
            <span className="text-white">
              Or try the demo... <br />
              username: <span className="fw-bold">demo</span> | password:{" "}
              <span className="fw-bold">letsgo</span>
            </span>
          </section>
        </div>

        <div className="col-sm d-none d-lg-block">
          <i className="bi bi-lightning-fill fa-10x lightning-large"></i>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
