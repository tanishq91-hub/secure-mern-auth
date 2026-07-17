import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoute"
import { useAuth } from "./context/AuthContext"
import Admin from "./pages/Admin"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import VerifyEmail from "./pages/VerifyEmail"
import VerifyOtp from "./pages/VerifyOtp"

function Home() {
  const { isAuthenticated, checkingSession } = useAuth()
  if (checkingSession) {
    return (
      <div className="main">
        <div className="spinner" />
      </div>
    )
  }
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* Path must be /token/:token — that's what the backend actually emails
            (see backend/config/html.js getVerifyEmailHtml), even though the API
            endpoint underneath is POST /api/v1/verify/:token. */}
        <Route path="/token/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
