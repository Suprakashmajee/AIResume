import { Link, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ResumePreview } from '../components/ResumePreview'
import { demoResume, templates } from '../data/content'
import { useResume } from '../context/ResumeContext'
import type { TemplateId } from '../types/resume'

export function TemplatesPage() {
  const { setTemplate } = useResume()
  const [params] = useSearchParams()

  useEffect(() => {
    const id = params.get('template') as TemplateId | null
    if (id && templates.some((t) => t.id === id)) setTemplate(id)
  }, [params, setTemplate])

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Resume templates</p>
          <h1>Choose a template that clears ATS and looks sharp</h1>
          <p className="lede">
            Five professional layouts—modern, classic, sidebar, minimal, and executive—ready for
            your content and accent color.
          </p>
        </div>
        <div className="template-gallery">
          {templates.map((template) => (
            <article key={template.id} className="template-card-block">
              <div className={`template-thumb thumb-${template.id}`}>
                <span className="template-badge">{template.badge}</span>
                <ResumePreview
                  compact
                  resume={{
                    ...demoResume,
                    template: template.id,
                    headline: template.name,
                  }}
                />
              </div>
              <div className="template-card-copy">
                <h2>{template.name}</h2>
                <p>{template.description}</p>
                <Link
                  to="/builder"
                  className="btn btn-primary"
                  onClick={() => setTemplate(template.id)}
                >
                  Use this template
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
