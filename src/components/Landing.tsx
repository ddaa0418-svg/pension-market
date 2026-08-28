import { trackCtaClick } from '../analytics'
import { About } from './About'

type LandingProps = {
  onStart: () => void
}

const STEPS = [
  { n: '01', label: '연령대' },
  { n: '02', label: '월 소득' },
  { n: '03', label: '보유 연금' },
  { n: '04', label: '희망 생활비' },
]

export function Landing({ onStart }: LandingProps) {
  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-lg flex-col px-5 pb-10 pt-8">
        <div className="animate-fade-up flex flex-1 flex-col">
          <p className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1.5 text-[13px] font-semibold text-navy">
            <span aria-hidden>⏱️</span> 타이핑 없이 4번만 터치
          </p>

          <h1 className="text-[1.75rem] leading-snug font-bold tracking-tight text-navy sm:text-[2rem]">
            단 1분 만에 확인하는
            <br />내 연금 &amp; 절세 간편 진단
          </h1>

          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            복잡한 타이핑 없이 4번의 터치로 예상 부족 자금과 최대 절세액을
            확인하세요.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="rounded-2xl border border-sand bg-white px-4 py-4 shadow-[0_1px_0_rgba(27,54,93,0.04)]"
              >
                <p className="text-[12px] font-semibold tracking-wider text-gold">
                  {step.n}
                </p>
                <p className="mt-1 text-[16px] font-semibold text-navy">
                  {step.label}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <button
              type="button"
              onClick={() => {
                trackCtaClick()
                onStart()
              }}
              className="w-full rounded-2xl bg-navy py-4 text-[18px] font-semibold text-white shadow-[0_10px_24px_rgba(27,54,93,0.22)] transition active:scale-[0.99] hover:bg-navy-deep"
            >
              1분 진단 시작하기
            </button>
            <p className="mt-3 text-center text-[13px] leading-relaxed text-muted">
              입력 내용은 기기에만 잠시 머물며, 서버에 저장되지 않습니다.
              <br />
              전문가 상담 신청은 진단 후 공식 사이트에서 이어집니다.
            </p>
          </div>
        </div>
      </section>

      <About onStart={onStart} />
    </main>
  )
}
