import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function VerifyOtp() {
  const { verifyOtp, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const emailFromLogin = location.state?.email || ""

  const [email, setEmail] = useState(emailFromLogin)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await verifyOtp({ email, otp })
      navigate("/dashboard", { replace: true, state: { welcome: data.message } })
    } catch (err) {
      setError(err.response?.data?.message || "That code didn't work. Try again.")
    } finally {
      setLoading(false)
    }
  }

  // Re-triggers step 1 without a password field visible again — only useful
  // if the user still has their password entered in the previous step's
  // session; in practice this just prompts them back to /login.
  const handleResendHint = () => {
    setResendMessage("Codes expire after 5 minutes. Go back to sign in again to get a new one.")
    setResending(false)
  }

  return (
    <div className="main">
      <div className="card">
        <p className="card-eyebrow">
          <span className="pulse-dot" />
          Step 2 of 2
        </p>
        <h1 className="card-title">Enter your code</h1>
        <p className="card-subtitle">
          We sent a 6-digit code to <strong>{email || "your email"}</strong>. It expires in 5
          minutes.
        </p>

        {error && <div className="banner banner-error">{error}</div>}
        {resendMessage && <div className="banner banner-info">{resendMessage}</div>}

        <form onSubmit={handleSubmit}>
          {!emailFromLogin && (
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          )}
          <div className="field otp-field">
            <label htmlFor="otp">One-time code</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading || otp.length !== 6}>
            {loading ? "Verifying…" : "Verify and sign in"}
          </button>
        </form>

        <div className="card-footer">
          <button className="link-btn" onClick={handleResendHint} disabled={resending}>
            Didn't get a code?
          </button>
          {"  ·  "}
          <Link to="/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  )
}
