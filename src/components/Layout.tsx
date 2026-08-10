import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

export function Layout() {
  const [open, setOpen] = useState(false)

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
          </div>
          <div>
            <h4>Support</h4>
            <a href="#faq">FAQ</a>
            <a href="mailto:support@airesumedraft.com">support@airesumedraft.com</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} AiResumeDraft. Need help?{' '}
            <a href="mailto:support@airesumedraft.com">support@airesumedraft.com</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
