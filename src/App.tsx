import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import { AboutPage } from './pages/AboutPage'
import { BuilderPage } from './pages/BuilderPage'
import { ContactPage } from './pages/ContactPage'
import { ExamplesPage } from './pages/ExamplesPage'
import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { TermsPage } from './pages/TermsPage'

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="examples" element={<ExamplesPage />} />
              <Route path="builder" element={<BuilderPage />} />
              <Route path="guide" element={<GuidePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </AuthProvider>
  )
}
