import type { QuizOption } from '../types'

type OptionCardProps<T extends string> = {
  option: QuizOption<T>
  selected: boolean
  onSelect: (value: T) => void
}

export function OptionCard<T extends string>({
  option,
  selected,
  onSelect,
}: OptionCardProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      aria-pressed={selected}
      className={`flex min-h-[72px] w-full items-start justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left transition ${
        selected
          ? 'border-navy bg-navy-soft shadow-[0_8px_20px_rgba(27,54,93,0.08)]'
          : 'border-sand bg-white hover:border-navy/30'
      }`}
    >
      <span>
        <span className="block text-[17px] font-semibold text-navy">
          {option.title}
        </span>
        {option.hint ? (
          <span className="mt-1 block text-[14px] text-muted">{option.hint}</span>
        ) : null}
      </span>
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-navy bg-navy' : 'border-sand bg-white'
        }`}
        aria-hidden
      >
        {selected ? (
          <span className="h-2 w-2 rounded-full bg-gold-soft" />
        ) : null}
      </span>
    </button>
  )
}
