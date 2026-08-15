import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { InvoiceData, InvoiceTotals, LineItem, PartyInfo } from '../types/invoice'
import {
  calcTotals,
  clearSavedInvoice,
  createDefaultInvoice,
  createLineItem,
  createSampleInvoice,
  loadSavedInvoice,
  saveInvoice,
} from '../utils/invoice'

interface InvoiceContextValue {
  invoice: InvoiceData
  totals: InvoiceTotals
  mode: 'edit' | 'preview'
  setMode: (mode: 'edit' | 'preview') => void
  updateInvoice: (patch: Partial<InvoiceData>) => void
  updateFrom: (patch: Partial<PartyInfo>) => void
  updateTo: (patch: Partial<PartyInfo>) => void
  updateItem: (id: string, patch: Partial<LineItem>) => void
  addItem: () => void
  removeItem: (id: string) => void
  resetInvoice: () => void
  loadSample: () => void
  persistNow: () => void
}

const InvoiceContext = createContext<InvoiceContextValue | null>(null)

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(() => loadSavedInvoice() ?? createDefaultInvoice())
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  const totals = useMemo(() => calcTotals(invoice), [invoice])

  useEffect(() => {
    const timer = window.setTimeout(() => saveInvoice(invoice), 400)
    return () => window.clearTimeout(timer)
  }, [invoice])

  const updateInvoice = useCallback((patch: Partial<InvoiceData>) => {
    setInvoice((prev) => ({ ...prev, ...patch }))
  }, [])

  const updateFrom = useCallback((patch: Partial<PartyInfo>) => {
    setInvoice((prev) => ({ ...prev, from: { ...prev.from, ...patch } }))
  }, [])

  const updateTo = useCallback((patch: Partial<PartyInfo>) => {
    setInvoice((prev) => ({ ...prev, to: { ...prev.to, ...patch } }))
  }, [])

  const updateItem = useCallback((id: string, patch: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }))
  }, [])

  const addItem = useCallback(() => {
    setInvoice((prev) => ({ ...prev, items: [...prev.items, createLineItem()] }))
  }, [])

  const removeItem = useCallback((id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.length <= 1 ? prev.items : prev.items.filter((item) => item.id !== id),
    }))
  }, [])

  const resetInvoice = useCallback(() => {
    clearSavedInvoice()
    setInvoice(createDefaultInvoice())
    setMode('edit')
  }, [])

  const loadSample = useCallback(() => {
    setInvoice(createSampleInvoice())
    setMode('edit')
  }, [])

  const persistNow = useCallback(() => {
    saveInvoice(invoice)
  }, [invoice])

  const value = useMemo(
    () => ({
      invoice,
      totals,
      mode,
      setMode,
      updateInvoice,
      updateFrom,
      updateTo,
      updateItem,
      addItem,
      removeItem,
      resetInvoice,
      loadSample,
      persistNow,
    }),
    [
      invoice,
      totals,
      mode,
      updateInvoice,
      updateFrom,
      updateTo,
      updateItem,
      addItem,
      removeItem,
      resetInvoice,
      loadSample,
      persistNow,
    ],
  )

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
}

export function useInvoice() {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error('useInvoice must be used within InvoiceProvider')
  return ctx
}
