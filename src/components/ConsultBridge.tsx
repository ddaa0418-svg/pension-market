import { trackCtaClick } from '../analytics'
import consultPreview from '../assets/consult-preview.png'
import { CONSULT_URL, HOME_URL } from '../data/links'

const PROCESS = [
  '상담 신청',
  '전문가 배정',
  '일정 조율',
  '맞춤 솔루션',
]

export function ConsultBridge() {
  return (
    <section className="overflow-hidden rounded-2xl border border-terra/25 bg-white shadow-[0_10px_28px_rgba(196,92,58,0.08)]">
      <div className="px-5 pt-5">
        <p className="text-[13px] font-semibold tracking-wide text-terra">
          NEXT STEP
        </p>
        <h3 className="mt-1 text-[1.25rem] leading-snug font-bold text-navy">
          전문가와 함께하는
          <br />
          프리미엄 1:1 맞춤 컨설팅
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          신청은 이 진단 화면이 아니라 연금마켓 공식 페이지에서 받습니다.
          아래 화면으로 이동해 성함·연락처만 남기면 됩니다.
        </p>
      </div>

      <ol className="mt-4 flex gap-1.5 px-5">
        {PROCESS.map((step, i) => (
          <li
            key={step}
            className="flex-1 rounded-xl bg-terra-soft px-1.5 py-2 text-center"
          >
            <span className="block text-[11px] font-semibold text-terra">
              {i + 1}
            </span>
            <span className="mt-0.5 block text-[11px] leading-tight font-medium text-navy">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <a
        href={CONSULT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackCtaClick}
        className="mx-5 mt-4 block overflow-hidden rounded-xl border border-sand ring-terra/0 transition hover:ring-2 hover:ring-terra/40"
      >
        <span className="relative block">
          <img
            src={consultPreview}
            alt="연금마켓 공식 사이트의 프리미엄 1:1 맞춤 컨설팅 신청 화면"
            className="h-52 w-full object-cover object-left-top sm:h-64"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent px-3 py-3 text-[13px] font-medium text-white">
            실제 신청 페이지 미리보기 · 누르면 바로 이동합니다
          </span>
        </span>
      </a>

      <div className="space-y-2.5 px-5 pt-4 pb-5">
        <a
          href={CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackCtaClick}
          className="flex w-full items-center justify-center rounded-2xl bg-terra py-4 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(196,92,58,0.28)] transition hover:bg-terra-deep active:scale-[0.99]"
        >
          공식 사이트에서 상담 신청하기
        </a>
        <a
          href={HOME_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackCtaClick}
          className="flex w-full items-center justify-center rounded-2xl border border-sand bg-cream py-3.5 text-[15px] font-medium text-navy transition hover:bg-sand"
        >
          연금마켓 둘러보기
        </a>
        <p className="text-center text-[12px] leading-relaxed text-muted">
          새 탭으로 열려 이 진단 결과는 그대로 남아 있습니다.
        </p>
      </div>
    </section>
  )
}
