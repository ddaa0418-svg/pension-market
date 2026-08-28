import { useState } from 'react'
import { About } from './About'
import { ConsultBridge } from './ConsultBridge'
import {
  AGE_OPTIONS,
  INCOME_OPTIONS,
  LIFESTYLE_OPTIONS,
  PENSION_OPTIONS,
} from '../data/quiz'
import type { Answers, Diagnosis } from '../types'

type ResultProps = {
  answers: Answers
  diagnosis: Diagnosis
  onRestart: () => void
}

function labelOf<T extends string>(
  options: { value: T; title: string }[],
  value: T,
) {
  return options.find((o) => o.value === value)?.title ?? value
}

export function Result({ answers, diagnosis, onRestart }: ResultProps) {
  const [openBasis, setOpenBasis] = useState(false)

  return (
    <main className="mx-auto max-w-lg px-5 pb-12 pt-6">
      <div className="animate-fade-up space-y-5">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-[14px] font-semibold text-white">
          ⏱️ 1분 간편 분석 완료
        </p>

        <h2 className="text-[1.45rem] leading-snug font-bold text-navy">
          {diagnosis.isSenior ? '시니어' : '은퇴 준비'} 맞춤 진단 결과입니다
        </h2>

        <p className="text-[15px] leading-relaxed text-muted">
          {labelOf(AGE_OPTIONS, answers.age)} ·{' '}
          {labelOf(INCOME_OPTIONS, answers.income)} ·{' '}
          {labelOf(PENSION_OPTIONS, answers.pension)} ·{' '}
          {labelOf(LIFESTYLE_OPTIONS, answers.lifestyle)}
        </p>

        <section
          className="rounded-2xl border-2 border-amber-400 bg-gap-soft p-5 shadow-[0_8px_24px_rgba(180,83,9,0.08)]"
          aria-label="예상 은퇴 부족 자금"
        >
          <p className="text-[14px] font-semibold text-gap">⚠️ 예상 은퇴 부족 자금</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-[1.65rem] font-bold tracking-tight text-navy">
              {diagnosis.gapLabel}
            </p>
            <span
              className={
                diagnosis.gapBadgeKind === 'urgent'
                  ? 'inline-flex rounded-full bg-gap px-2.5 py-1 text-[12px] font-semibold text-white'
                  : 'inline-flex rounded-full bg-navy-soft px-2.5 py-1 text-[12px] font-semibold text-navy'
              }
            >
              {diagnosis.gapBadge}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            {diagnosis.gapBasis}
          </p>
        </section>

        <section
          className="rounded-2xl border-2 border-emerald-400 bg-save-soft p-5 shadow-[0_8px_24px_rgba(4,120,87,0.08)]"
          aria-label="최대 절세액"
        >
          <p className="text-[14px] font-semibold text-save">💰 연금 구조 최적화 시</p>
          <p className="mt-2 text-[1.45rem] leading-snug font-bold tracking-tight text-navy">
            {diagnosis.taxHeadline}
          </p>
          <div className="mt-4 rounded-xl bg-white/80 px-3.5 py-3">
            <p className="text-[15px] font-bold text-navy">📌 3줄 핵심 처방</p>
            <ol className="mt-2 space-y-2 text-[15px] leading-relaxed text-navy">
              {diagnosis.prescriptions.map((line, index) => (
                <li key={line} className="flex gap-2">
                  <span className="shrink-0 font-semibold">{index + 1}.</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            {diagnosis.insight}
          </p>
        </section>

        <div className="overflow-hidden rounded-2xl border border-sand bg-white">
          <button
            type="button"
            aria-expanded={openBasis}
            onClick={() => setOpenBasis((v) => !v)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          >
            <span className="text-[16px] font-semibold text-navy">
              💡 산출 근거 보기
            </span>
            <span className="text-muted" aria-hidden>
              {openBasis ? '▲' : '▼'}
            </span>
          </button>
          {openBasis ? (
            <div className="space-y-4 border-t border-sand px-5 py-4 text-[15px] leading-relaxed text-muted">
              <div>
                <p className="font-semibold text-navy">부족 자금 산출 근거</p>
                <p className="mt-1.5">{diagnosis.gapBasis}</p>
              </div>
              <div>
                <p className="font-semibold text-navy">절세액 산출 세법 근거</p>
                <p className="mt-1.5">{diagnosis.taxBasis}</p>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="rounded-2xl border border-gold/40 bg-gold-soft/70 p-5">
          <p className="text-[16px] font-bold text-navy">
            📌 꼭 확인해 주세요! (안내 및 유의사항)
          </p>
          <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink">
            <li>
              • 본 진단 결과는 연금마켓 대학생 서포터즈가 통계 데이터와 현행
              세법 기준을 바탕으로 산출한 단순 참고용 시뮬레이션입니다.
            </li>
            <li>
              • 개인의 정확한 소득, 공제 항목, 가입 시기 및 납입 조건에 따라
              실제 수령액과 절세액은 상이할 수 있습니다.
            </li>
            <li>
              • 고객님에게 꼭 맞는 최적의 절세 및 인출 플랜을 세우기 위해
              반드시 공인된 전문가와의 1:1 상담을 권장합니다.
            </li>
          </ul>
        </aside>

        <About embedded headingId="result-about-heading" />

        <ConsultBridge />

        <button
          type="button"
          onClick={onRestart}
          className="w-full rounded-2xl border border-sand bg-white py-3.5 text-[16px] font-medium text-navy transition hover:bg-sand"
        >
          다시 진단하기
        </button>
      </div>
    </main>
  )
}
