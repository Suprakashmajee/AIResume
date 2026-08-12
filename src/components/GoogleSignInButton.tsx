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
      <div className="auth-setup-note">
        <p>
          <strong>Google sign-in is almost ready.</strong> Add your Google OAuth Web Client ID, then
          rebuild the site.
        </p>
        <ol className="auth-setup-steps">
          <li>
            Open{' '}
            <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer">
              Google Cloud Credentials
            </a>
          </li>
          <li>Create an OAuth client ID (Web application)</li>
          <li>
            Add authorized JavaScript origins: <code>https://airesumedraft.com</code> and{' '}
            <code>https://www.airesumedraft.com</code>
          </li>
          <li>
            Put the Client ID in <code>.env</code> as <code>VITE_GOOGLE_CLIENT_ID</code>, run{' '}
            <code>npm run build</code>, and upload <code>dist/</code>
          </li>
        </ol>
        <p>
          The Client ID looks like <code>123….apps.googleusercontent.com</code>. Until it is set,
          Log in / Log out UI works, but Continue with Google stays disabled.
        </p>
      </div>
    )
  }

  return <div className="google-btn-host" ref={hostRef} />
}
