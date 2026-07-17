import axios from "axios"
import { getCookie } from "./cookies"

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"

const api = axios.create({
  baseURL,
  withCredentials: true, // required: access/refresh/csrf tokens all travel as cookies
})

// Attach the CSRF token to every state-changing request. Read fresh from the
// cookie each time (rather than caching it in JS state) since /refresh-csrf
// rotates it and a stale in-memory copy would start failing silently.
api.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase()
  if (method !== "get") {
    const csrfToken = getCookie("csrfToken")
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken
    }
  }
  return config
})

// Endpoints that should never trigger a refresh-and-retry loop.
const NO_REFRESH_RETRY = ["/login", "/verify", "/refresh", "/register"]

let refreshPromise = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (!response || !config) return Promise.reject(error)

    const isExemptPath = NO_REFRESH_RETRY.some((path) => config.url?.startsWith(path))

    if (response.status === 401 && !config._retry && !isExemptPath) {
      config._retry = true
      try {
        // Coalesce concurrent 401s into a single refresh call.
        refreshPromise = refreshPromise || api.post("/refresh")
        await refreshPromise
        refreshPromise = null
        return api(config)
      } catch (refreshError) {
        refreshPromise = null
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
