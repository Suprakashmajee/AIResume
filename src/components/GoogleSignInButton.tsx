import { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { getGoogleClientId } from '../utils/auth'

interface Props {
  onSuccess?: () => void
}

export function GoogleSignInButton({ onSuccess }: Props) {
  const { setUserFromGoogleCredential, googleConfigured, ready } = useAuth()
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready || !googleConfigured || !hostRef.current) return
    const clientId = getGoogleClientId()
    const host = hostRef.current
    host.innerHTML = ''

    if (!window.google?.accounts?.id) return

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        const ok = setUserFromGoogleCredential(response.credential)
        if (ok) onSuccess?.()
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    })

    window.google.accounts.id.renderButton(host, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      width: 320,
      logo_alignment: 'left',
    })
  }, [ready, googleConfigured, setUserFromGoogleCredential, onSuccess])

  if (!googleConfigured) {
    return (
      <p className="auth-setup-note">
        Google button appears here after you add a Google OAuth Client ID (
        <code>VITE_GOOGLE_CLIENT_ID</code>). You can still use <strong>Log in with email</strong>{' '}
        above.
      </p>
    )
  }

  return <div className="google-btn-host" ref={hostRef} />
}
