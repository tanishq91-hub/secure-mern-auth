import { useEffect, useState } from "react"
import api from "../api/axios"

export default function Admin() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get("/admin")
        if (!cancelled) setMessage(data.message)
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Couldn't load the admin panel.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="main align-top">
      <div className="console-wrap">
        <div className="page-heading">
          <div>
            <h1>Admin panel</h1>
            <p>Restricted to accounts with the admin role.</p>
          </div>
          <span className="role-badge admin">admin</span>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">/api/v1/admin</span>
          </div>
          <div className="panel-body">
            {loading && <div className="spinner" />}
            {!loading && error && <div className="banner banner-error">{error}</div>}
            {!loading && message && <div className="banner banner-success">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
