import { Link, Navigate, useParams } from 'react-router-dom'
import { getArticle } from '../data/articles'

export function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)

  if (!article) {
    return <Navigate to="/resources" replace />
  }

  return (
    <section className="section page-top legal-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">
            <Link to="/resources" className="crumb-link">
              Resources
            </Link>
            {' · '}
            {article.category}
          </p>
          <h1>{article.title}</h1>
          <p className="lede">{article.description}</p>
          <p className="legal-meta">
            Updated {article.updated} · {article.readMinutes} min read
          </p>
        </div>

        <article className="legal-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <p>
            Ready to apply these edits? Open the{' '}
            <Link to="/builder">Resume Builder</Link>, browse{' '}
            <Link to="/examples">examples</Link>, or return to all{' '}
            <Link to="/resources">resources</Link>.
          </p>
        </article>
      </div>
    </section>
  )
}
