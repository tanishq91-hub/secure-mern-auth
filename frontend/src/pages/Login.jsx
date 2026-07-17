import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(form)
      navigate("/verify-otp", { state: { email: form.email } })
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign in. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main">
      <div className="card">
        <p className="card-eyebrow">
          <span className="pulse-dot" style={{ background: "var(--text-faint)" }} />
          Step 1 of 2
        </p>
        <h1 className="card-title">Sign in</h1>
        <p className="card-subtitle">
          Enter your password, and we'll send a one-time code to confirm it's you.
        </p>

        {error && <div className="banner banner-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={8}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Checking…" : "Continue"}
          </button>
        </form>

        <div className="card-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  )
}
