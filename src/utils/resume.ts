import type { ResumeData } from '../types/resume'

export function formatDateRange(start: string, end: string, current: boolean) {
  const format = (value: string) => {
    if (!value) return ''
    if (/^\d{4}-\d{2}$/.test(value)) {
      const [y, m] = value.split('-')
      const month = new Date(Number(y), Number(m) - 1).toLocaleString('en-US', { month: 'short' })
      return `${month} ${y}`
    }
    return value
  }
  const left = format(start)
  const right = current ? 'Present' : format(end)
  if (!left && !right) return ''
  if (!right) return left
  return `${left} – ${right}`
}

export function resumeToText(resume: ResumeData) {
  const lines: string[] = []
  lines.push(resume.fullName || 'Untitled Resume')
  if (resume.headline) lines.push(resume.headline)
  const contact = [resume.email, resume.phone, resume.location, resume.website].filter(Boolean)
  if (contact.length) lines.push(contact.join(' | '))
  lines.push('')

  if (resume.summary) {
    lines.push('SUMMARY')
    lines.push(resume.summary)
    lines.push('')
  }

  if (resume.experience.some((e) => e.title || e.company)) {
    lines.push('EXPERIENCE')
    resume.experience.forEach((exp) => {
      lines.push(`${exp.title}${exp.company ? ` — ${exp.company}` : ''}`)
      const meta = [formatDateRange(exp.startDate, exp.endDate, exp.current), exp.location]
        .filter(Boolean)
        .join(' | ')
      if (meta) lines.push(meta)
      exp.bullets.filter(Boolean).forEach((b) => lines.push(`• ${b}`))
      lines.push('')
    })
  }

  if (resume.education.some((e) => e.school || e.degree)) {
    lines.push('EDUCATION')
    resume.education.forEach((edu) => {
      const title = [edu.degree, edu.field].filter(Boolean).join(' in ')
      lines.push(`${title}${edu.school ? ` — ${edu.school}` : ''}`)
      const meta = [formatDateRange(edu.startDate, edu.endDate, false)].filter(Boolean).join(' | ')
      if (meta) lines.push(meta)
      if (edu.details) lines.push(edu.details)
      lines.push('')
    })
  }

  if (resume.skills.length) {
    lines.push('SKILLS')
    lines.push(resume.skills.join(', '))
  }

  return lines.join('\n').trim() + '\n'
}

export function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
