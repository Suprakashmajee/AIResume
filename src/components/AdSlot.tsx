import { useEffect, useRef } from 'react'
import { adSenseClient } from '../data/content'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

/** Placeholder-friendly AdSense slot — renders only when client script is present. */
export function AdSlot({
  slot,
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: {
  slot?: string
  format?: string
  className?: string
  label?: string
}) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // Ad blockers / missing slots are fine
    }
  }, [])

  return (
    <aside className={`ad-slot ${className}`.trim()} aria-label={label}>
      <p className="ad-label">{label}</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client={adSenseClient}
        data-ad-slot={slot || '0000000000'}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  )
}
