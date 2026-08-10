export type TemplateId = 'modern' | 'classic' | 'sidebar' | 'minimal' | 'executive'

export interface ExperienceItem {
  id: string
  company: string
  title: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface EducationItem {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  details: string
}

export interface ResumeData {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  template: TemplateId
  accentColor: string
}

export interface ResumeExample {
  id: string
  title: string
  category: string
  description: string
  highlights: string[]
  data: ResumeData
}
