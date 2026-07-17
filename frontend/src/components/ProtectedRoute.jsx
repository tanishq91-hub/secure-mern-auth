import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function ProtectedRoute() {
  const { isAuthenticated, checkingSession } = useAuth()

  if (checkingSession) {
    return (
      <div className="main">
        <div className="spinner" />
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export function AdminRoute() {
  const { user, isAuthenticated, checkingSession } = useAuth()

  if (checkingSession) {
    return (
      <div className="main">
        <div className="spinner" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />

  return <Outlet />
}
