export type AgeGroup = 'young' | 'mid' | 'senior'
export type IncomeBand = 'under450' | 'over450'
export type PensionHold = 'national' | 'personal' | 'irp' | 'both'
export type Lifestyle = 'modest' | 'hobby' | 'affluent'

export type Answers = {
  age: AgeGroup
  income: IncomeBand
  pension: PensionHold
  lifestyle: Lifestyle
}

export type PartialAnswers = Partial<Answers>

export type QuizStepId = keyof Answers

export type QuizOption<T extends string> = {
  value: T
  title: string
  hint?: string
}

export type GapBadgeKind = 'urgent' | 'prepared'

export type Diagnosis = {
  gapLabel: string
  gapBadge: string
  gapBadgeKind: GapBadgeKind
  gapBasis: string
  taxHeadline: string
  taxBasis: string
  prescriptions: string[]
  insight: string
  isSenior: boolean
}
