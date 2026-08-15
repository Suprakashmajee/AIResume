import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const {
    user,
    loginError,
    clearLoginError,
    ready,
    loginWithEmail,
    registerWithEmail,
    googleConfigured,
  } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/profile" replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const ok =
      mode === 'register'
        ? await registerWithEmail(name, email, password)
        : await loginWithEmail(email, password)
    setSubmitting(false)
    if (ok) navigate('/profile')
  }

  return (
    <section className="section page-top auth-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Account</p>
          <h1>{mode === 'login' ? 'Log in to AiResumeDraft' : 'Create your account'}</h1>
          <p className="lede">
            {mode === 'login'
              ? 'Sign in to access your profile. Your account is saved in our secure database.'
              : 'Create an account so we can keep your profile and login history.'}
          </p>
        </div>

        <div className="auth-panel">
          <div className="auth-mode-toggle" role="tablist" aria-label="Account mode">
            <button
              type="button"
              className={mode === 'login' ? 'is-active' : ''}
              onClick={() => {
                setMode('login')
                clearLoginError()
              }}
            >
              Log in
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'is-active' : ''}
              onClick={() => {
                setMode('register')
                clearLoginError()
              }}
            >
              Sign up
            </button>
          </div>

          {loginError ? (
            <p className="auth-error" role="alert">
              {loginError}{' '}
              <button type="button" className="text-link" onClick={clearLoginError}>
                Dismiss
              </button>
            </p>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' ? (
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
            ) : null}
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
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                minLength={6}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={submitting}>
              {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
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
          <GoogleSignInButton onSuccess={() => navigate('/profile')} />
        </div>

        <ul className="auth-benefits">
          <li>Accounts are stored securely in the website database</li>
          <li>Open your profile anytime after login</li>
          <li>Optional Google / Gmail sign-in</li>
          <li>
            Need help? <Link to="/contact">Contact support</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
