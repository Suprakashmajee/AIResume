import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ResumeProvider } from './context/ResumeContext'
import { BuilderPage } from './pages/BuilderPage'
import { ExamplesPage } from './pages/ExamplesPage'
import { HomePage } from './pages/HomePage'
import { TemplatesPage } from './pages/TemplatesPage'

export default function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="examples" element={<ExamplesPage />} />
            <Route path="builder" element={<BuilderPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  )
}
