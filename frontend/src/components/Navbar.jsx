import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate("/login")
    }
  }

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <span className="brand-mark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 5v6c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5l-8-3z"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Authentication App
      </Link>
      <div className="topbar-actions">
        {isAuthenticated ? (
          <>
            <span className="topbar-user">{user.email}</span>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Sign out
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-ghost btn-sm">
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}
