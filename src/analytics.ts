declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackCtaClick() {
  window.gtag?.('event', 'cta_click')
}
