import { Link, useNavigate } from "react-router-dom";

export default function Navigations({ token, setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="material-icons" style={{ verticalAlign: "middle", marginRight: "8px", color: "#ff9500" }}>
          menu_book
        </span>
        <Link to="/books" style={{ fontSize: "2.5rem", fontWeight: "700", color: "#fcfcfc" }}>
          BookBuddy
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/books">Library</Link>
        {token && <Link to="/account">My Account</Link>}
        {!token && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {token && (
          <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}