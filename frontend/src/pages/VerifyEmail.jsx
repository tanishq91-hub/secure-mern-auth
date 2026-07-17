import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function VerifyEmail() {
  const { token } = useParams()
  const { verifyEmail } = useAuth()
  const [status, setStatus] = useState("verifying") // verifying | success | error
  const [message, setMessage] = useState("")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await verifyEmail(token)
        if (!cancelled) {
          setStatus("success")
          setMessage(data.message)
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error")
          setMessage(err.response?.data?.message || "This link is invalid or has expired.")
        }
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div className="main">
      <div className="card">
        <p className="card-eyebrow">
          <span
            className="pulse-dot"
            style={{
              background:
                status === "success" ? "var(--success)" : status === "error" ? "var(--danger)" : "var(--accent)",
            }}
          />
          Step 2 of 2
        </p>
        <h1 className="card-title">
          {status === "verifying" && "Confirming your email…"}
          {status === "success" && "Email verified"}
          {status === "error" && "Verification failed"}
        </h1>

        {status === "verifying" && (
          <p className="card-subtitle">Hold on while we confirm your verification link.</p>
        )}
        {status === "success" && <div className="banner banner-success">{message}</div>}
        {status === "error" && <div className="banner banner-error">{message}</div>}

        {status !== "verifying" && (
          <div className="card-footer">
            {status === "success" ? (
              <Link to="/login">Continue to sign in</Link>
            ) : (
              <Link to="/register">Back to registration</Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
