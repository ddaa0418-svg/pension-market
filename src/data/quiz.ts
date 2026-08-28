import type {
  AgeGroup,
  IncomeBand,
  Lifestyle,
  PensionHold,
  QuizOption,
  QuizStepId,
} from '../types'

export const STEPS: QuizStepId[] = ['age', 'income', 'pension', 'lifestyle']

export const STEP_META: Record<
  QuizStepId,
  { eyebrow: string; question: string; helper: string }
> = {
  age: {
    eyebrow: 'STEP 1 · 연령대',
    question: '현재 연령대를 선택해 주세요',
    helper: '은퇴까지 남은 시간에 따라 부족 자금 기준이 달라집니다.',
  },
  income: {
    eyebrow: 'STEP 2 · 월 소득',
    question: '세전 월 소득 구간은 어디에 가깝나요?',
    helper: '연봉 5,500만 원 기준으로 세액공제율(16.5% / 13.2%)이 달라집니다.',
  },
  pension: {
    eyebrow: 'STEP 3 · 보유 연금',
    question: '지금 가지고 있는 연금은 무엇인가요?',
    helper: '하나만 선택해 주세요. 정확히 몰라도 가장 가까운 항목을 고르면 됩니다.',
  },
  lifestyle: {
    eyebrow: 'STEP 4 · 희망 은퇴생활비',
    question: '은퇴 후 원하는 한 달 생활비는요?',
    helper: '희망 생활비에 맞춰 예상 부족 자금을 계산합니다.',
  },
}

export const AGE_OPTIONS: QuizOption<AgeGroup>[] = [
  {
    value: 'young',
    title: '2030 청년층',
    hint: '사회초년생 / 직장인',
  },
  {
    value: 'mid',
    title: '4050 중장년층',
    hint: '은퇴 준비',
  },
  {
    value: 'senior',
    title: '60대 이상 시니어',
    hint: '은퇴 / 연금 수령',
  },
]

export const INCOME_OPTIONS: QuizOption<IncomeBand>[] = [
  {
    value: 'under450',
    title: '월 450만 원 이하 (연봉 5,500만 원 이하)',
    hint: '16.5% 세액공제 구간',
  },
  {
    value: 'over450',
    title: '월 450만 원 초과 (연봉 5,500만 원 초과)',
    hint: '13.2% 세액공제 구간',
  },
]

export const PENSION_OPTIONS: QuizOption<PensionHold>[] = [
  {
    value: 'national',
    title: '국민연금만 납부 중 (또는 잘 모르겠음)',
  },
  {
    value: 'personal',
    title: '개인연금(연금저축/보험)만 보유',
  },
  {
    value: 'irp',
    title: '퇴직연금(IRP/DC)만 보유',
  },
  {
    value: 'both',
    title: '퇴직연금 + 개인연금 둘 다 보유',
  },
]

export const LIFESTYLE_OPTIONS: QuizOption<Lifestyle>[] = [
  {
    value: 'modest',
    title: '소박한 일상형',
    hint: '월 200만 원',
  },
  {
    value: 'hobby',
    title: '취미·여가형',
    hint: '월 300만 원',
  },
  {
    value: 'affluent',
    title: '여유로운 풍요형',
    hint: '월 400만 원',
  },
]
