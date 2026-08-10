import type { CSSProperties } from 'react'
import type { ResumeData } from '../types/resume'
import { formatDateRange } from '../utils/resume'

interface Props {
  resume: ResumeData
  compact?: boolean
}

export function ResumePreview({ resume, compact }: Props) {
  const style = {
    '--accent': resume.accentColor,
  } as CSSProperties

  return (
    <article
      className={`resume-sheet template-${resume.template} ${compact ? 'is-compact' : ''}`}
      style={style}
      id="resume-preview"
    >
      {resume.template === 'sidebar' ? (
        <div className="sheet-sidebar-layout">
          <aside className="sheet-side">
            <h1>{resume.fullName || 'Your Name'}</h1>
            <p className="sheet-headline">{resume.headline || 'Professional headline'}</p>
            <div className="sheet-side-block">
              <h3>Contact</h3>
              {resume.email ? <p>{resume.email}</p> : null}
              {resume.phone ? <p>{resume.phone}</p> : null}
              {resume.location ? <p>{resume.location}</p> : null}
              {resume.website ? <p>{resume.website}</p> : null}
            </div>
            {resume.skills.length ? (
              <div className="sheet-side-block">
                <h3>Skills</h3>
                <ul className="sheet-skill-list">
                  {resume.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
          <div className="sheet-main">
            <Body resume={resume} hideSkills />
          </div>
        </div>
      ) : (
        <>
          <header className="sheet-header">
            <div>
              <h1>{resume.fullName || 'Your Name'}</h1>
              <p className="sheet-headline">{resume.headline || 'Professional headline'}</p>
            </div>
            <div className="sheet-contact">
              {resume.email ? <span>{resume.email}</span> : null}
              {resume.phone ? <span>{resume.phone}</span> : null}
              {resume.location ? <span>{resume.location}</span> : null}
              {resume.website ? <span>{resume.website}</span> : null}
            </div>
          </header>
          <Body resume={resume} />
        </>
      )}
    </article>
  )
}

function Body({ resume, hideSkills }: { resume: ResumeData; hideSkills?: boolean }) {
  return (
    <div className="sheet-body">
      {resume.summary ? (
        <section>
          <h2>Summary</h2>
          <p>{resume.summary}</p>
        </section>
      ) : null}

      {resume.experience.some((e) => e.title || e.company || e.bullets.some(Boolean)) ? (
        <section>
          <h2>Experience</h2>
          {resume.experience.map((exp) => (
            <div className="sheet-entry" key={exp.id}>
              <div className="sheet-entry-top">
                <div>
                  <h3>{exp.title || 'Role title'}</h3>
                  <p className="sheet-org">{exp.company || 'Company'}</p>
                </div>
                <div className="sheet-meta">
                  <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  {exp.location ? <span>{exp.location}</span> : null}
                </div>
              </div>
              <ul>
                {exp.bullets.filter(Boolean).map((bullet, index) => (
                  <li key={`${exp.id}-${index}`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}

      {resume.education.some((e) => e.school || e.degree) ? (
        <section>
          <h2>Education</h2>
          {resume.education.map((edu) => (
            <div className="sheet-entry" key={edu.id}>
              <div className="sheet-entry-top">
                <div>
                  <h3>
                    {[edu.degree, edu.field].filter(Boolean).join(' in ') || 'Degree'}
                  </h3>
                  <p className="sheet-org">{edu.school || 'School'}</p>
                </div>
                <div className="sheet-meta">
                  <span>{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                </div>
              </div>
              {edu.details ? <p className="sheet-details">{edu.details}</p> : null}
            </div>
          ))}
        </section>
      ) : null}

      {!hideSkills && resume.skills.length ? (
        <section>
          <h2>Skills</h2>
          <p className="sheet-skills">{resume.skills.join(' · ')}</p>
        </section>
      ) : null}
    </div>
  )
}
