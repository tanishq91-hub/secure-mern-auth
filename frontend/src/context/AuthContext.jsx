import { createContext, useCallback, useContext, useEffect, useState } from "react"
import api from "../api/axios"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [sessionInfo, setSessionInfo] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)

  const fetchMe = useCallback(async () => {
    const { data } = await api.get("/me")
    setUser(data.user)
    setSessionInfo(data.sessionInfo)
    return data.user
  }, [])

  // On first load, see if an existing accessToken/refreshToken cookie pair
  // still represents a valid session, so a page refresh doesn't force login.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await fetchMe()
      } catch {
        // no valid session — that's fine, land on the login screen
      } finally {
        if (!cancelled) setCheckingSession(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [fetchMe])

  const register = useCallback(async ({ name, email, password }) => {
    const { data } = await api.post("/register", { name, email, password })
    return data.message
  }, [])

  const verifyEmail = useCallback(async (token) => {
    const { data } = await api.post(`/verify/${token}`)
    return data
  }, [])

  const login = useCallback(async ({ email, password }) => {
    const { data } = await api.post("/login", { email, password })
    return data.message
  }, [])

  const verifyOtp = useCallback(async ({ email, otp }) => {
    const { data } = await api.post("/verify", { email, otp })
    setUser(data.user)
    setSessionInfo(data.sessionInfo)
    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post("/logout")
    } finally {
      setUser(null)
      setSessionInfo(null)
    }
  }, [])

  const refreshCsrf = useCallback(async () => {
    const { data } = await api.post("/refresh-csrf")
    return data.csrfToken
  }, [])

  const value = {
    user,
    sessionInfo,
    checkingSession,
    isAuthenticated: !!user,
    register,
    verifyEmail,
    login,
    verifyOtp,
    logout,
    refreshCsrf,
    fetchMe,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
