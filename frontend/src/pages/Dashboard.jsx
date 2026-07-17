import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { getCookie } from "../api/cookies"
import { useAuth } from "../context/AuthContext"

function formatTimestamp(iso) {
  if (!iso) return "—"
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "medium",
    })
  } catch {
    return iso
  }
}

function initials(name) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function Dashboard() {
  const { user, sessionInfo, refreshCsrf, fetchMe } = useAuth()
  const location = useLocation()
  const [csrfBusy, setCsrfBusy] = useState(false)
  const [csrfMessage, setCsrfMessage] = useState("")
  const [refreshBusy, setRefreshBusy] = useState(false)
  const [refreshMessage, setRefreshMessage] = useState("")

  const hasCsrfCookie = !!getCookie("csrfToken")

  const handleRefreshCsrf = async () => {
    setCsrfBusy(true)
    setCsrfMessage("")
    try {
      await refreshCsrf()
      setCsrfMessage("CSRF token rotated.")
    } catch {
      setCsrfMessage("Couldn't rotate the CSRF token.")
    } finally {
      setCsrfBusy(false)
    }
  }

  const handleRefreshSession = async () => {
    setRefreshBusy(true)
    setRefreshMessage("")
    try {
      await fetchMe()
      setRefreshMessage("Session details refreshed.")
    } catch {
      setRefreshMessage("Couldn't refresh session details.")
    } finally {
      setRefreshBusy(false)
    }
  }

  if (!user) return null

  return (
    <div className="main align-top">
      <div className="console-wrap">
        <div className="page-heading">
          <div>
            <h1>Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}</h1>
            <p>Here's what's active on your account right now.</p>
          </div>
          <span className={`role-badge ${user.role === "admin" ? "admin" : ""}`}>
            {user.role || "user"}
          </span>
        </div>

        {location.state?.welcome && (
          <div className="banner banner-success">{location.state.welcome}</div>
        )}

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Profile</span>
          </div>
          <div className="panel-body">
            <div className="profile-row">
              <div className="avatar">{initials(user.name)}</div>
              <div>
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">
              <span className="pulse-dot" />
              Session console
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-faint)" }}>
              live
            </span>
          </div>
          <div className="panel-body">
            <dl className="session-log">
              <dt>session_id</dt>
              <dd className="accent">{sessionInfo?.sessionId || "—"}</dd>

              <dt>login_time</dt>
              <dd>{formatTimestamp(sessionInfo?.loginTime)}</dd>

              <dt>last_activity</dt>
              <dd>{formatTimestamp(sessionInfo?.lastActivity)}</dd>

              <dt>access_token</dt>
              <dd className="ok">active · 15 min lifetime, cookie-based</dd>

              <dt>csrf_cookie</dt>
              <dd className={hasCsrfCookie ? "ok" : ""}>
                {hasCsrfCookie ? "present" : "not found"}
              </dd>
            </dl>
          </div>
          <div className="panel-footer">
            <button className="btn btn-ghost btn-sm" onClick={handleRefreshCsrf} disabled={csrfBusy}>
              {csrfBusy ? "Rotating…" : "Rotate CSRF token"}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleRefreshSession} disabled={refreshBusy}>
              {refreshBusy ? "Refreshing…" : "Refresh session details"}
            </button>
          </div>
          {(csrfMessage || refreshMessage) && (
            <div style={{ padding: "0 20px 18px" }}>
              <div className="banner banner-info" style={{ marginBottom: 0 }}>
                {csrfMessage || refreshMessage}
              </div>
            </div>
          )}
        </div>

        {user.role === "admin" && (
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Admin</span>
            </div>
            <div className="panel-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="center-note" style={{ textAlign: "left" }}>
                You have admin access on this account.
              </span>
              <Link to="/admin" className="btn btn-ghost btn-sm">
                Open admin panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
