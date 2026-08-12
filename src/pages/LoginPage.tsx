import { Navigate, useNavigate } from 'react-router-dom'
import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { user, loginError, clearLoginError, ready } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/builder" replace />
  }

  return (
    <section className="section page-top auth-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Account</p>
          <h1>Log in to AiResumeDraft</h1>
          <p className="lede">
            Sign in with your Gmail / Google account to keep your resume drafts tied to your profile
            on this device.
          </p>
        </div>

        <div className="auth-panel">
          <h2>Continue with Google</h2>
          <p className="auth-copy">
            Use the same Gmail account you already have. No separate password is stored by
            AiResumeDraft.
          </p>

          {!ready ? <p className="auth-copy">Loading sign-in…</p> : null}

          {loginError ? (
            <p className="auth-error" role="alert">
              {loginError}{' '}
              <button type="button" className="text-link" onClick={clearLoginError}>
                Dismiss
              </button>
            </p>
          ) : null}

          <GoogleSignInButton onSuccess={() => navigate('/builder')} />

          <ul className="auth-benefits">
            <li>One-click login with Gmail</li>
            <li>Log out anytime from the header</li>
            <li>Your drafts stay in this browser, linked to your account</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
