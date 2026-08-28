import { trackCtaClick } from '../analytics'
import { BrandLogo } from './BrandLogo'

const SERVICES = [
  {
    title: '연금 컨설팅',
    summary: '흩어진 연금을 하나로 모아, 은퇴 후에도 마르지 않는 현금흐름을 만듭니다.',
    points: ['공적·사적 연금 통합 진단', '은퇴 소득 공백기 설계', '수령 시기·금액 전략'],
  },
  {
    title: '투자 컨설팅',
    summary: '물가에 녹지 않도록, 연금 자산을 안전하게 키우는 방법을 제안합니다.',
    points: ['연금 계좌 포트폴리오 구축', '퇴직연금 DC·IRP 관리', '생애주기별 자산 배분'],
  },
  {
    title: '절세 컨설팅',
    summary: '합법적으로 덜 내고 더 받는, 연금 계좌의 세금 설계입니다.',
    points: ['연말정산·종합소득세 절세', '건강보험료 부담 방어', '수령 단계 절세 노하우'],
  },
]

type AboutProps = {
  onStart?: () => void
  headingId?: string
  embedded?: boolean
}

export function About({
  onStart,
  headingId = 'about-heading',
  embedded = false,
}: AboutProps) {
  return (
    <section
      className={
        embedded
          ? undefined
          : 'mx-auto max-w-lg border-t border-sand px-5 pb-12 pt-8'
      }
      aria-labelledby={headingId}
    >
      <div className="rounded-2xl border border-sand bg-white px-5 py-6 shadow-[0_1px_0_rgba(27,54,93,0.04)]">
        <BrandLogo className="mx-auto h-12 w-auto" />
        <h2
          id={headingId}
          className="mt-4 text-center text-[1.25rem] font-bold tracking-tight text-navy"
        >
          은퇴를 설계하는 프리미엄 컨설팅
        </h2>
        <p className="mt-3 text-center text-[15px] leading-relaxed text-muted">
          은퇴 준비부터 수령까지, 연금·투자·절세를 한곳에서 맞춰 드립니다.
          흩어진 연금을 진단하고, 자산을 지키며 키우고, 세금과 건보료까지
          함께 봅니다.
        </p>
      </div>

      <h3 className="mt-8 text-[1.05rem] font-bold text-navy">어떤 컨설팅을 하나요?</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
        세 가지를 이어서 설계합니다. 진단 후 공식 사이트에서 상담을 이어갈 수
        있습니다.
      </p>

      <ul className="mt-4 space-y-3">
        {SERVICES.map((service) => (
          <li
            key={service.title}
            className="rounded-2xl border border-sand bg-white px-5 py-4 shadow-[0_1px_0_rgba(27,54,93,0.04)]"
          >
            <p className="text-[16px] font-bold text-terra">{service.title}</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
              {service.summary}
            </p>
            <ul className="mt-3 space-y-1.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[14px] leading-snug text-navy"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {onStart ? (
        <button
          type="button"
          onClick={() => {
            trackCtaClick()
            onStart()
          }}
          className="mt-6 w-full rounded-2xl bg-navy py-4 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(27,54,93,0.22)] transition hover:bg-navy-deep active:scale-[0.99]"
        >
          1분 진단으로 시작하기
        </button>
      ) : null}
    </section>
  )
}
