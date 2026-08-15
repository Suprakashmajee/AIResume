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
  getGoogleClientId,
  loadGoogleScript,
  loadStoredUser,
  saveStoredUser,
  userFromGoogleCredential,
} from '../utils/auth'

interface AuthContextValue {
  user: AuthUser | null
  ready: boolean
  googleConfigured: boolean
  loginError: string
  clearLoginError: () => void
  logout: () => void
  loginWithEmail: (name: string, email: string) => boolean
  setUserFromGoogleCredential: (credential: string) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadStoredUser())
  const [ready, setReady] = useState(false)
  const [loginError, setLoginError] = useState('')
  const clientId = getGoogleClientId()
  const googleConfigured = Boolean(clientId)

  useEffect(() => {
    let cancelled = false
    async function boot() {
      if (!clientId) {
        if (!cancelled) setReady(true)
        return
      }
      try {
        await loadGoogleScript()
      } catch {
        if (!cancelled) setLoginError('Could not load Google sign-in. Please refresh and try again.')
      } finally {
        if (!cancelled) setReady(true)
      }
    }
    void boot()
    return () => {
      cancelled = true
    }
  }, [clientId])

  const setUserFromGoogleCredential = useCallback((credential: string) => {
    const next = userFromGoogleCredential(credential)
    if (!next) {
      setLoginError('Google sign-in failed. Please try again.')
      return false
    }
    setUser(next)
    saveStoredUser(next)
    setLoginError('')
    return true
  }, [])

  const loginWithEmail = useCallback((name: string, email: string) => {
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
    const next: AuthUser = {
      id: `email:${cleanEmail}`,
      name: cleanName,
      email: cleanEmail,
      picture: '',
      provider: 'email',
    }
    setUser(next)
    saveStoredUser(next)
    setLoginError('')
    return true
  }, [])

  const logout = useCallback(() => {
    const email = user?.email
    setUser(null)
    saveStoredUser(null)
    setLoginError('')
    if (email && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.disableAutoSelect()
        window.google.accounts.id.revoke(email, () => undefined)
      } catch {
        // ignore revoke errors on logout
      }
    }
  }, [user?.email])

  const clearLoginError = useCallback(() => setLoginError(''), [])

  const value = useMemo(
    () => ({
      user,
      ready,
      googleConfigured,
      loginError,
      clearLoginError,
      logout,
      loginWithEmail,
      setUserFromGoogleCredential,
    }),
    [
      user,
      ready,
      googleConfigured,
      loginError,
      clearLoginError,
      logout,
      loginWithEmail,
      setUserFromGoogleCredential,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
