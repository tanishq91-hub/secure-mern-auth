# Frontend — Authentication App

React + Vite client for the `backend/` API. Plain CSS (design tokens in `src/index.css`), no UI framework.

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your backend if not localhost:5000
npm run dev
```

## How it maps to the API

| Route | Backend call | Purpose |
|---|---|---|
| `/register` | `POST /register` | Collects name/email/password, triggers a verification email |
| `/token/:token` | `POST /verify/:token` | Landing page for the emailed verification link; creates the account |
| `/login` | `POST /login` | Password check, triggers an OTP email |
| `/verify-otp` | `POST /verify` | Exchanges the OTP for a session (sets cookies, returns user + session info) |
| `/dashboard` | `GET /me` | Protected profile + session console |
| `/admin` | `GET /admin` | Protected, admin-role only |
| — | `POST /refresh` | Called automatically by the axios interceptor whenever a request gets a 401 |
| — | `POST /logout`, `POST /refresh-csrf` | Triggered from buttons on the dashboard |

## Session handling, in plain terms

The backend issues three cookies on successful login (`accessToken`, `refreshToken`, both `httpOnly`, plus a readable `csrfToken`). The frontend never stores tokens in JS state or `localStorage` — it relies entirely on the cookies:

- **`src/api/axios.js`** attaches `x-csrf-token` (read fresh from the cookie) to every non-`GET` request, and transparently calls `/refresh` and retries once if any request comes back `401`.
- **`src/context/AuthContext.jsx`** holds only the `user` object and the last `sessionInfo` payload returned by the API — both are UI state, not credentials.
- A hard refresh of the page re-runs `GET /me` once on load to restore `user` from the still-valid cookies, so sessions survive reloads without any token sitting in browser storage.

## Structure

```
src/
  api/          axios instance + cookie helper
  context/      AuthContext (user, session, auth actions)
  components/   Navbar, route guards
  pages/        Register, VerifyEmail, Login, VerifyOtp, Dashboard, Admin, NotFound
  index.css     design tokens + all styling (no CSS framework)
```
