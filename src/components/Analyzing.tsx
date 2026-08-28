export function Analyzing() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-navy/20" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-2xl text-gold-soft">
          연
        </span>
      </div>
      <h2 className="text-[1.4rem] font-bold text-navy">선택하신 내용을 분석 중입니다</h2>
      <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-muted">
        연령·소득·보유 연금·희망 생활비를 바탕으로
        <br />
        부족 자금과 절세 한도를 계산하고 있습니다.
      </p>
    </main>
  )
}
