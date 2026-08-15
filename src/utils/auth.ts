import type { AuthSession, AuthUser } from '../types/auth'

const STORAGE_KEY = 'airesumedraft-auth-v2'
const API_BASE = '/api'

type ApiResult<T> = { ok: true } & T | { ok: false; error: string }

async function api<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<ApiResult<T>> {
  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
    const data = (await res.json()) as ApiResult<T>
    if (!res.ok || !data.ok) {
      return { ok: false, error: ('error' in data && data.error) || 'Request failed.' }
    }
    return data
  } catch {
    return { ok: false, error: 'Could not reach the server. Please try again.' }
  }
}

export function getGoogleClientId() {
  return (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined)?.trim() || ''
}

export function loadStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthSession
    if (!parsed?.token || !parsed?.user?.email || !parsed?.user?.id) return null
    return parsed
  } catch {
    return null
  }
}

export function saveStoredSession(session: AuthSession | null) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export async function registerAccount(name: string, email: string, password: string) {
  return api<{ token: string; user: AuthUser }>('/register.php', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export async function loginAccount(email: string, password: string) {
  return api<{ token: string; user: AuthUser }>('/login.php', {
    method: 'POST',
    body: JSON.stringify({ email, password, provider: 'email' }),
  })
}

export async function loginGoogleAccount(input: {
  name: string
  email: string
  picture: string
  googleId: string
}) {
  return api<{ token: string; user: AuthUser }>('/login.php', {
    method: 'POST',
    body: JSON.stringify({ ...input, provider: 'google' }),
  })
}

export async function fetchProfile(token: string) {
  return api<{ user: AuthUser }>('/profile.php', { method: 'GET', token })
}

export async function updateProfile(token: string, name: string, picture = '') {
  return api<{ user: AuthUser }>('/profile.php', {
    method: 'PATCH',
    token,
    body: JSON.stringify({ name, picture }),
  })
}

export async function logoutAccount(token: string | null) {
  if (!token) return
  await api('/logout.php', { method: 'POST', token })
}

/** Decode Google ID token payload for display (client-side session only). */
export function userFromGoogleCredential(credential: string): AuthUser | null {
  try {
    const payload = credential.split('.')[1]
    if (!payload) return null
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    const data = JSON.parse(json) as {
      sub?: string
      name?: string
      email?: string
      picture?: string
    }
    if (!data.sub || !data.email) return null
    return {
      id: data.sub,
      name: data.name || data.email.split('@')[0],
      email: data.email,
      picture: data.picture || '',
      provider: 'google',
    }
  } catch {
    return null
  }
}

export function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve()
  const existing = document.querySelector<HTMLScriptElement>('script[data-google-gsi]')
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Google script failed')))
    })
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.dataset.googleGsi = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'))
    document.head.appendChild(script)
  })
}
