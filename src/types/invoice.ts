export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'INR'
  | 'CAD'
  | 'AUD'
  | 'JPY'
  | 'SGD'

export type InvoiceTemplateId =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'bold'
  | 'ledger'

export interface PartyInfo {
  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  taxId: string
}

export interface LineItem {
  id: string
  description: string
  quantity: number
  price: number
}

export interface InvoiceData {
  logoDataUrl: string
  invoiceNumber: string
  poNumber: string
  invoiceDate: string
  dueDate: string
  currency: CurrencyCode
  from: PartyInfo
  to: PartyInfo
  items: LineItem[]
  enableDiscount: boolean
  discountType: 'percent' | 'fixed'
  discountValue: number
  enableTax: boolean
  taxLabel: string
  taxRate: number
  enableShipping: boolean
  shippingAmount: number
  paymentDetails: string
  notes: string
  templateId: InvoiceTemplateId
  accentColor: string
}

export interface InvoiceTotals {
  subtotal: number
  discountAmount: number
  taxAmount: number
  shippingAmount: number
  total: number
}
