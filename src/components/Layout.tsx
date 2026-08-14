import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SUPPORT_EMAIL = 'support@airesumedraft.com'

export function Layout() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <div className="site">
      <header className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden />
            <span className="brand-text">AiResumeDraft</span>
          </NavLink>

          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>

          <nav className={`nav-links ${open ? 'is-open' : ''}`}>
            <NavLink to="/templates" onClick={() => setOpen(false)}>
              Templates
            </NavLink>
            <NavLink to="/examples" onClick={() => setOpen(false)}>
              Examples
            </NavLink>
            <NavLink to="/builder" onClick={() => setOpen(false)}>
              Builder
            </NavLink>

            {user ? (
              <div className="auth-nav">
                <div className="auth-user">
                  {user.picture ? (
                    <img src={user.picture} alt="" className="auth-avatar" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="auth-avatar auth-avatar-fallback" aria-hidden>
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span className="auth-user-name">{user.name}</span>
                </div>
                <button type="button" className="btn btn-ghost auth-logout" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-secondary auth-login" onClick={() => setOpen(false)}>
                Log in
              </NavLink>
            )}

            <NavLink to="/builder" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
              Create My Resume
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark" aria-hidden />
              <span className="brand-text">AiResumeDraft</span>
            </div>
            <p className="footer-copy">
              Draft faster. Sound sharper. Export resumes that clear ATS screens and impress hiring
              managers.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <NavLink to="/builder">Resume Builder</NavLink>
            <NavLink to="/templates">Templates</NavLink>
            <NavLink to="/examples">Resume Examples</NavLink>
            {user ? (
              <button type="button" className="footer-text-btn" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <NavLink to="/login">Log in</NavLink>
            )}
          </div>
          <div>
            <h4>Support</h4>
            <NavLink to="/guide">Resume Guide</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <p className="footer-email">{SUPPORT_EMAIL}</p>
          </div>
          <div>
            <h4>Legal</h4>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/terms">Terms of Service</NavLink>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} AiResumeDraft. Support:{' '}
            <span className="footer-email-inline">{SUPPORT_EMAIL}</span>
          </span>
          <nav className="footer-legal-links" aria-label="Legal">
            <NavLink to="/privacy">Privacy</NavLink>
            <NavLink to="/terms">Terms</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </footer>
    </div>
  )
}
