import { NavLink, Outlet } from 'react-router-dom'
import { siteName } from '../data/content'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/generator', label: 'Create Bill' },
  { to: '/templates', label: 'Templates' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Layout() {
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo" aria-label={`${siteName} home`}>
            <span className="logo-mark" aria-hidden />
            <span className="logo-text">
              Bill<span>Store</span>
            </span>
          </NavLink>
          <nav className="site-nav" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <NavLink to="/generator" className="btn btn-primary header-cta">
            Create free bill
          </NavLink>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="logo-text footer-brand">
              Bill<span>Store</span>
            </p>
            <p className="footer-tag">
              Free online bill & invoice generator for freelancers and small businesses. Create,
              customize, and download professional PDFs in your browser.
            </p>
          </div>
          <div>
            <h2 className="footer-heading">Product</h2>
            <ul>
              <li>
                <NavLink to="/generator">Invoice generator</NavLink>
              </li>
              <li>
                <NavLink to="/templates">Templates</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Bill Store</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">Trust</h2>
            <ul>
              <li>
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="/terms">Terms of Use</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Bill Store (bill-store.com). All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
