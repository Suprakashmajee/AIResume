import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { InvoiceProvider } from './context/InvoiceContext'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { GeneratorPage } from './pages/GeneratorPage'
import { HomePage } from './pages/HomePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { TermsPage } from './pages/TermsPage'

export default function App() {
  return (
    <InvoiceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="generator" element={<GeneratorPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </InvoiceProvider>
  )
}
