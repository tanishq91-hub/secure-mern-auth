import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="main">
      <div className="card" style={{ textAlign: "center" }}>
        <p className="card-eyebrow" style={{ justifyContent: "center" }}>
          404
        </p>
        <h1 className="card-title">Page not found</h1>
        <p className="card-subtitle">That route doesn't exist.</p>
        <Link to="/" className="btn btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
          Back to home
        </Link>
      </div>
    </div>
  )
}
