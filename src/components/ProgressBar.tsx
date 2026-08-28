type ProgressBarProps = {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = (current / total) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[14px] font-medium">
        <span className="text-navy">
          {current} / {total}
        </span>
        <span className="text-muted">터치 한 번이면 다음 단계</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-navy transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ol className="flex gap-2" aria-hidden>
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1
          const done = step < current
          const active = step === current
          return (
            <li
              key={step}
              className={`h-1.5 flex-1 rounded-full ${
                done || active ? 'bg-gold' : 'bg-sand'
              }`}
            />
          )
        })}
      </ol>
    </div>
  )
}
