import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { user, loginError, clearLoginError, ready, loginWithEmail, googleConfigured } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  if (user) {
    return <Navigate to="/builder" replace />
  }

  function handleEmailLogin(event: FormEvent) {
    event.preventDefault()
    const ok = loginWithEmail(name, email)
    if (ok) navigate('/builder')
  }

  return (
    <section className="section page-top auth-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Account</p>
          <h1>Log in to AiResumeDraft</h1>
          <p className="lede">
            Sign in to keep your resume drafts tied to your profile on this device. Use email login
            now, or Google when it is configured.
          </p>
        </div>

        <div className="auth-panel">
          <h2>Log in with email</h2>
          <p className="auth-copy">Enter your name and email to start a signed-in session on this device.</p>

          {loginError ? (
            <p className="auth-error" role="alert">
              {loginError}{' '}
              <button type="button" className="text-link" onClick={clearLoginError}>
                Dismiss
              </button>
            </p>
          ) : null}

          <form className="auth-form" onSubmit={handleEmailLogin}>
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                autoComplete="email"
                required
              />
            </label>
            <button type="submit" className="btn btn-primary btn-lg auth-submit">
              Log in
            </button>
          </form>
        </div>

        <div className="auth-panel auth-panel-secondary">
          <h2>Continue with Google</h2>
          <p className="auth-copy">
            Optional one-click Gmail sign-in
            {googleConfigured ? '.' : ' (available after Google Client ID is added).'}
          </p>

          {!ready ? <p className="auth-copy">Loading Google sign-in…</p> : null}
          <GoogleSignInButton onSuccess={() => navigate('/builder')} />
        </div>

        <ul className="auth-benefits">
          <li>Log in with email right away</li>
          <li>Optional Google / Gmail sign-in</li>
          <li>Log out anytime from the header</li>
          <li>Your drafts stay in this browser, linked to your account</li>
        </ul>
      </div>
    </section>
  )
}
