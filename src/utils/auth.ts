import type { AuthUser } from '../types/auth'

const STORAGE_KEY = 'airesumedraft-auth-v1'

export function getGoogleClientId() {
  return (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined)?.trim() || ''
}

export function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (!parsed?.email || !parsed?.id) return null
    return parsed
  } catch {
    return null
  }
}

export function saveStoredUser(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
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
