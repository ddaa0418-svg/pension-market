import { OptionCard } from './OptionCard'
import { ProgressBar } from './ProgressBar'
import {
  AGE_OPTIONS,
  INCOME_OPTIONS,
  LIFESTYLE_OPTIONS,
  PENSION_OPTIONS,
  STEP_META,
  STEPS,
} from '../data/quiz'
import type { PartialAnswers, QuizOption, QuizStepId } from '../types'

type QuizProps = {
  stepIndex: number
  answers: PartialAnswers
  onSelect: (step: QuizStepId, value: string) => void
  onBack: () => void
}

function optionsFor(step: QuizStepId): QuizOption<string>[] {
  switch (step) {
    case 'age':
      return AGE_OPTIONS
    case 'income':
      return INCOME_OPTIONS
    case 'pension':
      return PENSION_OPTIONS
    case 'lifestyle':
      return LIFESTYLE_OPTIONS
  }
}

export function Quiz({ stepIndex, answers, onSelect, onBack }: QuizProps) {
  const step = STEPS[stepIndex]
  const meta = STEP_META[step]
  const selected = answers[step]
  const options = optionsFor(step)

  return (
    <main className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-lg flex-col px-5 pb-10 pt-6">
      <ProgressBar current={stepIndex + 1} total={STEPS.length} />

      <div key={step} className="animate-fade-up mt-8 flex flex-1 flex-col">
        <p className="text-[13px] font-semibold tracking-wide text-gold">
          {meta.eyebrow}
        </p>
        <h2 className="mt-2 text-[1.45rem] leading-snug font-bold text-navy">
          {meta.question}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{meta.helper}</p>

        <div className="mt-6 flex flex-col gap-3">
          {options.map((option) => (
            <OptionCard
              key={option.value}
              option={option}
              selected={selected === option.value}
              onSelect={(value) => onSelect(step, value)}
            />
          ))}
        </div>

        <div className="mt-auto pt-8">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-2xl border border-sand bg-white py-3.5 text-[16px] font-medium text-navy transition hover:bg-sand"
            >
              이전 질문
            </button>
          ) : (
            <p className="text-center text-[13px] text-muted">
              선택한 값은 계산에만 쓰이며 저장되지 않습니다.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
