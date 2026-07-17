import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)
    try {
      const msg = await register(form)
      setMessage(msg)
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.")
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
        <h1 className="card-title">Create your account</h1>
        <p className="card-subtitle">
          We'll email a verification link before your account is created — nothing is
          stored until you confirm it's really you.
        </p>

        {error && <div className="banner banner-error">{error}</div>}
        {message && <div className="banner banner-success">{message}</div>}

        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                minLength={3}
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
              />
            </div>
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
                autoComplete="new-password"
                minLength={8}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Sending verification email…" : "Create account"}
            </button>
          </form>
        )}

        <div className="card-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
