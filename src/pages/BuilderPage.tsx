import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ResumePreview } from '../components/ResumePreview'
import { accentColors, aiSuggestions, templates } from '../data/content'
import { useResume } from '../context/ResumeContext'
import type { TemplateId } from '../types/resume'
import { downloadText, resumeToText } from '../utils/resume'

const steps = [
  { id: 'contact', label: 'Contact' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'design', label: 'Design' },
] as const

type StepId = (typeof steps)[number]['id']

export function BuilderPage() {
  const {
    resume,
    updateField,
    setTemplate,
    setAccent,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    setSkills,
    loadDemo,
    reset,
  } = useResume()
  const [step, setStep] = useState<StepId>('contact')
  const [skillInput, setSkillInput] = useState('')
  const [toast, setToast] = useState('')
  const [params] = useSearchParams()

  useEffect(() => {
    const id = params.get('template') as TemplateId | null
    if (id && templates.some((t) => t.id === id)) setTemplate(id)
  }, [params, setTemplate])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const stepIndex = steps.findIndex((s) => s.id === step)

  const filename = useMemo(() => {
    const base = (resume.fullName || 'resume').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return `${base || 'resume'}-airesumedraft.txt`
  }, [resume.fullName])

  function applySummarySuggestion(text: string) {
    updateField('summary', text)
    setToast('Summary suggestion applied')
  }

  function applyBulletSuggestion(expId: string, text: string) {
    const exp = resume.experience.find((e) => e.id === expId)
    if (!exp) return
    const bullets = [...exp.bullets.filter(Boolean), text]
    updateExperience(expId, { bullets })
    setToast('Bullet suggestion added')
  }

  function addSkill(value: string) {
    const skill = value.trim()
    if (!skill) return
    if (resume.skills.includes(skill)) {
      setSkillInput('')
      return
    }
    setSkills([...resume.skills, skill])
    setSkillInput('')
  }

  function exportTxt() {
    downloadText(filename, resumeToText(resume))
    setToast('TXT download started')
  }

  function exportPdf() {
    window.print()
    setToast('Use your browser print dialog to save PDF')
  }

  return (
    <section className="builder-page">
      <div className="builder-top">
        <div>
          <p className="eyebrow">AiResumeDraft Builder</p>
          <h1>Build your resume</h1>
        </div>
        <div className="builder-top-actions">
          <button type="button" className="btn btn-ghost" onClick={loadDemo}>
            Load sample
          </button>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
          <button type="button" className="btn btn-secondary" onClick={exportTxt}>
            Download TXT
          </button>
          <button type="button" className="btn btn-primary" onClick={exportPdf}>
            Print / PDF
          </button>
        </div>
      </div>

      <div className="builder-steps" role="tablist" aria-label="Resume sections">
        {steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={step === item.id}
            className={`builder-step ${step === item.id ? 'is-active' : ''} ${index < stepIndex ? 'is-done' : ''}`}
            onClick={() => setStep(item.id)}
          >
            <span className="step-num">{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="builder-layout">
        <div className="builder-form panel">
          {step === 'contact' ? (
            <div className="form-stack">
              <h2>Contact details</h2>
              <label>
                Full name
                <input
                  value={resume.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Jordan Avery"
                />
              </label>
              <label>
                Headline
                <input
                  value={resume.headline}
                  onChange={(e) => updateField('headline', e.target.value)}
                  placeholder="Product Designer · Systems & Growth"
                />
              </label>
              <div className="form-row">
                <label>
                  Email
                  <input
                    value={resume.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@email.com"
                  />
                </label>
                <label>
                  Phone
                  <input
                    value={resume.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="(555) 000-0000"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Location
                  <input
                    value={resume.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="City, ST"
                  />
                </label>
                <label>
                  Website / Portfolio
                  <input
                    value={resume.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    placeholder="yoursite.com"
                  />
                </label>
              </div>
            </div>
          ) : null}

          {step === 'summary' ? (
            <div className="form-stack">
              <h2>Professional summary</h2>
              <label>
                Summary
                <textarea
                  rows={7}
                  value={resume.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  placeholder="2–4 sentences that frame your value for the role you want."
                />
              </label>
              <div className="ai-box">
                <h3>AI suggestions</h3>
                <p>Click a suggestion to replace your summary draft.</p>
                <div className="ai-list">
                  {aiSuggestions.summary.map((text) => (
                    <button key={text} type="button" onClick={() => applySummarySuggestion(text)}>
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 'experience' ? (
            <div className="form-stack">
              <div className="stack-head">
                <h2>Experience</h2>
                <button type="button" className="btn btn-secondary" onClick={addExperience}>
                  Add role
                </button>
              </div>
              {resume.experience.map((exp, index) => (
                <div className="entry-block" key={exp.id}>
                  <div className="stack-head">
                    <h3>Role {index + 1}</h3>
                    {resume.experience.length > 1 ? (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => removeExperience(exp.id)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <div className="form-row">
                    <label>
                      Job title
                      <input
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                      />
                    </label>
                    <label>
                      Company
                      <input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Location
                      <input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      />
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? '' : exp.endDate,
                          })
                        }
                      />
                      Current role
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Start
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      />
                    </label>
                    <label>
                      End
                      <input
                        type="month"
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      />
                    </label>
                  </div>
                  <label>
                    Achievements
                    <textarea
                      rows={5}
                      value={exp.bullets.join('\n')}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          bullets: e.target.value.split('\n'),
                        })
                      }
                      placeholder="One achievement per line"
                    />
                  </label>
                  <div className="ai-box">
                    <h3>AI bullet ideas</h3>
                    <div className="ai-list">
                      {aiSuggestions.experience.map((text) => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => applyBulletSuggestion(exp.id, text)}
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {step === 'education' ? (
            <div className="form-stack">
              <div className="stack-head">
                <h2>Education</h2>
                <button type="button" className="btn btn-secondary" onClick={addEducation}>
                  Add school
                </button>
              </div>
              {resume.education.map((edu, index) => (
                <div className="entry-block" key={edu.id}>
                  <div className="stack-head">
                    <h3>Education {index + 1}</h3>
                    {resume.education.length > 1 ? (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => removeEducation(edu.id)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <label>
                    School
                    <input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Degree
                      <input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      />
                    </label>
                    <label>
                      Field
                      <input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Start
                      <input
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        placeholder="2018"
                      />
                    </label>
                    <label>
                      End
                      <input
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        placeholder="2022"
                      />
                    </label>
                  </div>
                  <label>
                    Details
                    <input
                      value={edu.details}
                      onChange={(e) => updateEducation(edu.id, { details: e.target.value })}
                      placeholder="Honors, GPA, certifications"
                    />
                  </label>
                </div>
              ))}
            </div>
          ) : null}

          {step === 'skills' ? (
            <div className="form-stack">
              <h2>Skills</h2>
              <label>
                Add a skill
                <div className="skill-input-row">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkill(skillInput)
                      }
                    }}
                    placeholder="Type and press Enter"
                  />
                  <button type="button" className="btn btn-secondary" onClick={() => addSkill(skillInput)}>
                    Add
                  </button>
                </div>
              </label>
              <div className="skill-tags">
                {resume.skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className="skill-tag"
                    onClick={() => setSkills(resume.skills.filter((s) => s !== skill))}
                  >
                    {skill} ×
                  </button>
                ))}
              </div>
              <div className="ai-box">
                <h3>Suggested skills</h3>
                <div className="ai-list horizontal">
                  {aiSuggestions.skills.map((skill) => (
                    <button key={skill} type="button" onClick={() => addSkill(skill)}>
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 'design' ? (
            <div className="form-stack">
              <h2>Design</h2>
              <p className="field-help">Choose a template and accent color for your preview and PDF export.</p>
              <div className="design-templates">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    className={`design-option ${resume.template === template.id ? 'is-active' : ''}`}
                    onClick={() => setTemplate(template.id)}
                  >
                    <strong>{template.name}</strong>
                    <span>{template.badge}</span>
                  </button>
                ))}
              </div>
              <div className="color-row">
                {accentColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch ${resume.accentColor === color ? 'is-active' : ''}`}
                    style={{ background: color }}
                    aria-label={`Accent ${color}`}
                    onClick={() => setAccent(color)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="form-nav">
            <button
              type="button"
              className="btn btn-ghost"
              disabled={stepIndex === 0}
              onClick={() => setStep(steps[Math.max(0, stepIndex - 1)].id)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (stepIndex < steps.length - 1) setStep(steps[stepIndex + 1].id)
                else exportPdf()
              }}
            >
              {stepIndex < steps.length - 1 ? 'Continue' : 'Print / PDF'}
            </button>
          </div>
        </div>

        <aside className="builder-preview panel">
          <div className="preview-head">
            <h2>Live preview</h2>
            <span>{templates.find((t) => t.id === resume.template)?.name}</span>
          </div>
          <div className="preview-stage">
            <ResumePreview resume={resume} />
          </div>
        </aside>
      </div>

      {toast ? <div className="toast">{toast}</div> : null}
    </section>
  )
}
