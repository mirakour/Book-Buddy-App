import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigations from "./Navigations";
import Books from "./Books";
import Single from "./SingleBook";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  return (
    <>
      {/* Top nav bar */}
      <Navigations token={token} setToken={setToken} />

      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<Single token={token} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/account"
          element={
            token ? <Account token={token} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </>
  );
}