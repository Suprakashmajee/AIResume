import type { CSSProperties } from 'react'
import type { InvoiceData, InvoiceTotals } from '../types/invoice'
import { formatDisplayDate, formatMoney, lineAmount } from '../utils/invoice'

function PartyBlock({
  label,
  party,
}: {
  label: string
  party: InvoiceData['from']
}) {
  const cityLine = [party.city, party.state, party.zip].filter(Boolean).join(', ')
  return (
    <div className="inv-party">
      <p className="inv-party-label">{label}</p>
      <p className="inv-party-name">{party.name || '—'}</p>
      {party.email ? <p>{party.email}</p> : null}
      {party.address ? <p>{party.address}</p> : null}
      {cityLine ? <p>{cityLine}</p> : null}
      {party.country ? <p>{party.country}</p> : null}
      {party.phone ? <p>{party.phone}</p> : null}
      {party.taxId ? <p className="inv-muted">{party.taxId}</p> : null}
    </div>
  )
}

export function InvoicePreview({
  invoice,
  totals,
}: {
  invoice: InvoiceData
  totals: InvoiceTotals
}) {
  const style = {
    '--inv-accent': invoice.accentColor,
  } as CSSProperties

  return (
    <article
      className={`invoice-sheet template-${invoice.templateId}`}
      style={style}
      aria-label="Invoice preview"
    >
      <header className="inv-header">
        <div className="inv-brand">
          {invoice.logoDataUrl ? (
            <img src={invoice.logoDataUrl} alt="Business logo" className="inv-logo" />
          ) : (
            <div className="inv-logo-fallback" aria-hidden>
              {(invoice.from.name || 'BS').slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <p className="inv-title">Invoice</p>
            <p className="inv-number">{invoice.invoiceNumber || 'Draft'}</p>
          </div>
        </div>
        <dl className="inv-meta">
          {invoice.poNumber ? (
            <>
              <dt>PO</dt>
              <dd>{invoice.poNumber}</dd>
            </>
          ) : null}
          <dt>Date</dt>
          <dd>{formatDisplayDate(invoice.invoiceDate)}</dd>
          <dt>Due</dt>
          <dd>{formatDisplayDate(invoice.dueDate)}</dd>
        </dl>
      </header>

      <div className="inv-parties">
        <PartyBlock label="Bill from" party={invoice.from} />
        <PartyBlock label="Bill to" party={invoice.to} />
      </div>

      <table className="inv-table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id}>
              <td>{item.description || '—'}</td>
              <td>{item.quantity}</td>
              <td>{formatMoney(item.price, invoice.currency)}</td>
              <td>{formatMoney(lineAmount(item), invoice.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="inv-totals-wrap">
        <dl className="inv-totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatMoney(totals.subtotal, invoice.currency)}</dd>
          </div>
          {invoice.enableDiscount && totals.discountAmount > 0 ? (
            <div>
              <dt>
                Discount
                {invoice.discountType === 'percent' ? ` (${invoice.discountValue}%)` : ''}
              </dt>
              <dd>−{formatMoney(totals.discountAmount, invoice.currency)}</dd>
            </div>
          ) : null}
          {invoice.enableShipping ? (
            <div>
              <dt>Shipping</dt>
              <dd>{formatMoney(totals.shippingAmount, invoice.currency)}</dd>
            </div>
          ) : null}
          {invoice.enableTax ? (
            <div>
              <dt>
                {invoice.taxLabel || 'Tax'} ({invoice.taxRate}%)
              </dt>
              <dd>{formatMoney(totals.taxAmount, invoice.currency)}</dd>
            </div>
          ) : null}
          <div className="inv-grand">
            <dt>Total</dt>
            <dd>{formatMoney(totals.total, invoice.currency)}</dd>
          </div>
        </dl>
      </div>

      {(invoice.paymentDetails || invoice.notes) && (
        <footer className="inv-footer">
          {invoice.paymentDetails ? (
            <div>
              <h3>Payment details</h3>
              <p>{invoice.paymentDetails}</p>
            </div>
          ) : null}
          {invoice.notes ? (
            <div>
              <h3>Notes</h3>
              <p>{invoice.notes}</p>
            </div>
          ) : null}
        </footer>
      )}
    </article>
  )
}
