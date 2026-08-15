import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function formatDate(value?: string | null) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

export function ProfilePage() {
  const { user, loginError, clearLoginError, saveProfile, refreshProfile, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setName(user?.name || '')
  }, [user?.name])

  useEffect(() => {
    void refreshProfile()
  }, [refreshProfile])

  if (!user) {
    return <Navigate to="/login" replace />
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    const ok = await saveProfile(name)
    setSaving(false)
    if (ok) {
      setSaved(true)
      window.setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <section className="section page-top profile-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Account</p>
          <h1>Your profile</h1>
          <p className="lede">
            Review the details saved for your AiResumeDraft account. Update your display name anytime.
          </p>
        </div>

        <div className="profile-card">
          <div className="profile-identity">
            {user.picture ? (
              <img src={user.picture} alt="" className="profile-avatar" referrerPolicy="no-referrer" />
            ) : (
              <span className="profile-avatar profile-avatar-fallback" aria-hidden>
                {user.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p className="profile-provider">Signed in with {user.provider}</p>
            </div>
          </div>

          <dl className="profile-meta">
            <div>
              <dt>Member since</dt>
              <dd>{formatDate(user.createdAt)}</dd>
            </div>
            <div>
              <dt>Last login</dt>
              <dd>{formatDate(user.lastLoginAt)}</dd>
            </div>
            <div>
              <dt>Account ID</dt>
              <dd>{user.id}</dd>
            </div>
          </dl>

          {loginError ? (
            <p className="auth-error" role="alert">
              {loginError}{' '}
              <button type="button" className="text-link" onClick={clearLoginError}>
                Dismiss
              </button>
            </p>
          ) : null}

          <form className="auth-form profile-form" onSubmit={handleSave}>
            <label>
              Display name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input value={user.email} disabled readOnly />
            </label>
            <div className="profile-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : saved ? 'Saved' : 'Save profile'}
              </button>
              <Link to="/builder" className="btn btn-secondary">
                Open builder
              </Link>
              <button type="button" className="btn btn-ghost" onClick={() => void logout()}>
                Log out
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
