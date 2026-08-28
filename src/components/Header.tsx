import { trackCtaClick } from '../analytics'
import { HOME_URL } from '../data/links'
import { BrandLogo } from './BrandLogo'

type HeaderProps = {
  showRestart?: boolean
  onRestart?: () => void
}

export function Header({ showRestart, onRestart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-sand/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between gap-3 px-5">
        {onRestart ? (
          <button
            type="button"
            onClick={onRestart}
            aria-label="연금마켓 홈으로"
            className="flex min-w-0 items-center rounded-md"
          >
            <BrandLogo className="h-9 w-auto" />
          </button>
        ) : (
          <BrandLogo className="h-9 w-auto" />
        )}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={HOME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="연금마켓 공식 사이트 새 창에서 열기"
            onClick={trackCtaClick}
            className="inline-flex h-9 items-center gap-1 rounded-full bg-navy px-3 text-[13px] font-semibold text-white shadow-[0_2px_8px_rgba(27,54,93,0.22)] transition hover:bg-navy-deep active:scale-[0.98]"
          >
            공식 사이트
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 text-white/85"
              aria-hidden
            >
              <path
                d="M6 3.5H3.5A1.5 1.5 0 0 0 2 5v7.5A1.5 1.5 0 0 0 3.5 14H11a1.5 1.5 0 0 0 1.5-1.5V10M9.5 2H14m0 0v4.5M14 2 7.5 8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {showRestart ? (
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex h-9 items-center gap-1 rounded-full bg-navy px-3 text-[13px] font-semibold text-white shadow-[0_2px_8px_rgba(27,54,93,0.22)] transition hover:bg-navy-deep active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5"
                aria-hidden
              >
                <path
                  d="M3.2 8a4.8 4.8 0 0 1 8.1-3.4M12.8 8a4.8 4.8 0 0 1-8.1 3.4M11.3 2.5v2.6H8.7M4.7 13.5v-2.6h2.6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              다시 하기
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}
