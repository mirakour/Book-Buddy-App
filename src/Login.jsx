import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api";

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { token } = await loginUser(form);
      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        navigate("/account");
      } else {
        setError("Login failed. Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}