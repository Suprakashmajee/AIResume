import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '../types/auth'
import {
  fetchProfile,
  getGoogleClientId,
  loadGoogleScript,
  loadStoredSession,
  loginAccount,
  loginGoogleAccount,
  logoutAccount,
  registerAccount,
  saveStoredSession,
  updateProfile,
  userFromGoogleCredential,
} from '../utils/auth'

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  ready: boolean
  googleConfigured: boolean
  loginError: string
  clearLoginError: () => void
  logout: () => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<boolean>
  registerWithEmail: (name: string, email: string, password: string) => Promise<boolean>
  setUserFromGoogleCredential: (credential: string) => Promise<boolean>
  saveProfile: (name: string) => Promise<boolean>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const stored = loadStoredSession()
  const [user, setUser] = useState<AuthUser | null>(stored?.user ?? null)
  const [token, setToken] = useState<string | null>(stored?.token ?? null)
  const [ready, setReady] = useState(false)
  const [loginError, setLoginError] = useState('')
  const clientId = getGoogleClientId()
  const googleConfigured = Boolean(clientId)

  useEffect(() => {
    let cancelled = false
    async function boot() {
      if (token) {
        const result = await fetchProfile(token)
        if (!cancelled) {
          if (result.ok) {
            setUser(result.user)
            saveStoredSession({ token, user: result.user })
          } else {
            setUser(null)
            setToken(null)
            saveStoredSession(null)
          }
        }
      }
      if (clientId) {
        try {
          await loadGoogleScript()
        } catch {
          if (!cancelled) {
            setLoginError('Could not load Google sign-in. Please refresh and try again.')
          }
        }
      }
      if (!cancelled) setReady(true)
    }
    void boot()
    return () => {
      cancelled = true
    }
  }, [clientId, token])

  const applySession = useCallback((nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken)
    setUser(nextUser)
    saveStoredSession({ token: nextToken, user: nextUser })
    setLoginError('')
  }, [])

  const setUserFromGoogleCredential = useCallback(
    async (credential: string) => {
      const decoded = userFromGoogleCredential(credential)
      if (!decoded) {
        setLoginError('Google sign-in failed. Please try again.')
        return false
      }
      const result = await loginGoogleAccount({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        googleId: decoded.id,
      })
      if (!result.ok) {
        setLoginError(result.error)
        return false
      }
      applySession(result.token, result.user)
      return true
    },
    [applySession],
  )

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      const cleanEmail = email.trim().toLowerCase()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        setLoginError('Please enter a valid email address.')
        return false
      }
      if (password.length < 6) {
        setLoginError('Password must be at least 6 characters.')
        return false
      }
      const result = await loginAccount(cleanEmail, password)
      if (!result.ok) {
        setLoginError(result.error)
        return false
      }
      applySession(result.token, result.user)
      return true
    },
    [applySession],
  )

  const registerWithEmail = useCallback(
    async (name: string, email: string, password: string) => {
      const cleanEmail = email.trim().toLowerCase()
      const cleanName = name.trim()
      if (!cleanName) {
        setLoginError('Please enter your name.')
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        setLoginError('Please enter a valid email address.')
        return false
      }
      if (password.length < 6) {
        setLoginError('Password must be at least 6 characters.')
        return false
      }
      const result = await registerAccount(cleanName, cleanEmail, password)
      if (!result.ok) {
        setLoginError(result.error)
        return false
      }
      applySession(result.token, result.user)
      return true
    },
    [applySession],
  )

  const saveProfile = useCallback(
    async (name: string) => {
      if (!token) {
        setLoginError('Please log in again.')
        return false
      }
      const result = await updateProfile(token, name.trim(), user?.picture || '')
      if (!result.ok) {
        setLoginError(result.error)
        return false
      }
      setUser(result.user)
      saveStoredSession({ token, user: result.user })
      setLoginError('')
      return true
    },
    [token, user?.picture],
  )

  const refreshProfile = useCallback(async () => {
    if (!token) return
    const result = await fetchProfile(token)
    if (result.ok) {
      setUser(result.user)
      saveStoredSession({ token, user: result.user })
    }
  }, [token])

  const logout = useCallback(async () => {
    const email = user?.email
    await logoutAccount(token)
    setUser(null)
    setToken(null)
    saveStoredSession(null)
    setLoginError('')
    if (email && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.disableAutoSelect()
        window.google.accounts.id.revoke(email, () => undefined)
      } catch {
        // ignore revoke errors on logout
      }
    }
  }, [token, user?.email])

  const clearLoginError = useCallback(() => setLoginError(''), [])

  const value = useMemo(
    () => ({
      user,
      token,
      ready,
      googleConfigured,
      loginError,
      clearLoginError,
      logout,
      loginWithEmail,
      registerWithEmail,
      setUserFromGoogleCredential,
      saveProfile,
      refreshProfile,
    }),
    [
      user,
      token,
      ready,
      googleConfigured,
      loginError,
      clearLoginError,
      logout,
      loginWithEmail,
      registerWithEmail,
      setUserFromGoogleCredential,
      saveProfile,
      refreshProfile,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
