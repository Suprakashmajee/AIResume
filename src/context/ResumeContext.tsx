import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { demoResume, emptyResume, createId } from '../data/content'
import type { EducationItem, ExperienceItem, ResumeData, TemplateId } from '../types/resume'
import { useAuth } from './AuthContext'

const BASE_STORAGE_KEY = 'airesumedraft-v1'

interface ResumeContextValue {
  resume: ResumeData
  setResume: (next: ResumeData) => void
  updateField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void
  setTemplate: (template: TemplateId) => void
  setAccent: (color: string) => void
  addExperience: () => void
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, patch: Partial<EducationItem>) => void
  removeEducation: (id: string) => void
  setSkills: (skills: string[]) => void
  loadDemo: () => void
  loadResume: (data: ResumeData) => void
  reset: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

function storageKeyFor(email?: string | null) {
  if (!email) return BASE_STORAGE_KEY
  return `${BASE_STORAGE_KEY}:${email.toLowerCase()}`
}

function loadStored(key: string): ResumeData | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as ResumeData
  } catch {
    return null
  }
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const storageKey = storageKeyFor(user?.email)
  const [resume, setResumeState] = useState<ResumeData>(() => loadStored(BASE_STORAGE_KEY) ?? emptyResume())

  useEffect(() => {
    const stored = loadStored(storageKey)
    if (stored) {
      setResumeState(stored)
      return
    }
    if (user?.email) {
      const guest = loadStored(BASE_STORAGE_KEY)
      setResumeState(guest ?? emptyResume())
      return
    }
    setResumeState(emptyResume())
  }, [storageKey, user?.email])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(resume))
  }, [resume, storageKey])

  const setResume = useCallback((next: ResumeData) => {
    setResumeState(next)
  }, [])

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResumeState((prev) => ({ ...prev, [key]: value }))
  }, [])

  const setTemplate = useCallback((template: TemplateId) => {
    setResumeState((prev) => ({ ...prev, template }))
  }, [])

  const setAccent = useCallback((accentColor: string) => {
    setResumeState((prev) => ({ ...prev, accentColor }))
  }, [])

  const addExperience = useCallback(() => {
    setResumeState((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: createId(),
          company: '',
          title: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          bullets: [''],
        },
      ],
    }))
  }, [])

  const updateExperience = useCallback((id: string, patch: Partial<ExperienceItem>) => {
    setResumeState((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }))
  }, [])

  const removeExperience = useCallback((id: string) => {
    setResumeState((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }, [])

  const addEducation = useCallback(() => {
    setResumeState((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: createId(),
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          details: '',
        },
      ],
    }))
  }, [])

  const updateEducation = useCallback((id: string, patch: Partial<EducationItem>) => {
    setResumeState((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }))
  }, [])

  const removeEducation = useCallback((id: string) => {
    setResumeState((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }, [])

  const setSkills = useCallback((skills: string[]) => {
    setResumeState((prev) => ({ ...prev, skills }))
  }, [])

  const loadDemo = useCallback(() => setResumeState(demoResume), [])
  const loadResume = useCallback((data: ResumeData) => setResumeState(data), [])
  const reset = useCallback(() => setResumeState(emptyResume()), [])

  const value = useMemo(
    () => ({
      resume,
      setResume,
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
      loadResume,
      reset,
    }),
    [
      resume,
      setResume,
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
      loadResume,
      reset,
    ],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
