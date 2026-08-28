import type {
  Answers,
  Diagnosis,
  GapBadgeKind,
  Lifestyle,
  PensionHold,
} from '../types'

/**
 * 국민연금공단 전국 1인당 월평균 수령액(약 64만 원) × 12개월 × 30년 ≈ 2.3억 원.
 * 2030/4050: 60세 은퇴 후 30년(360개월) 생존을 가정한 공적연금 방어액.
 */
const NPS_30Y_EOK = 2.3

/**
 * 국민연금 월평균 약 64만 원 × 240개월 ≈ 1.5억 원.
 * 시니어: 통계청 65세 기준 기대여명(은퇴 후 20년)을 반영한 공적연금 방어액.
 */
const NPS_20Y_EOK = 1.5

/** 금융당국 통계상 퇴직연금 평균 수령액 */
const RETIREMENT_AVG_EOK = 1.9

type GapBasisKind = 'A' | 'B'

/**
 * 기준 A: 국민연금 평균 2.3억 원만 차감
 *   - 국민연금만(또는 잘 모르겠음) / 개인연금만
 * 기준 B: 국민연금 2.3억 + 퇴직연금 평균 1.9억 = 총 4.2억 원 차감
 *   - 퇴직연금만 / 퇴직연금 + 개인연금
 */
function gapBasisKind(pension: PensionHold): GapBasisKind {
  return pension === 'irp' || pension === 'both' ? 'B' : 'A'
}

/**
 * 2030/4050: 희망 생활비 × 12 × 30년 − 기준 A/B 방어액
 * 월 200: 7.2 − 2.3 = 4.9 / 7.2 − 4.2 = 3.0
 * 월 300: 10.8 − 2.3 = 8.5 / 10.8 − 4.2 = 6.6
 * 월 400: 14.4 − 2.3 = 12.1 / 14.4 − 4.2 = 10.2
 */
const GAP_WORKING: Record<GapBasisKind, Record<Lifestyle, string>> = {
  A: {
    modest: '약 4억 9,000만 원 부족',
    hobby: '약 8억 5,000만 원 부족',
    affluent: '약 12억 1,000만 원 부족',
  },
  B: {
    modest: '약 3억 원 부족',
    hobby: '약 6억 6,000만 원 부족',
    affluent: '약 10억 2,000만 원 부족',
  },
}

/**
 * 시니어: 희망 생활비 × 12 × 20년 − 국민연금 1.5억 − 기본자산(2.1~4.9억)
 * 생존 기간: 통계청 65세 기준 기대여명 → 은퇴 후 20년(240개월)
 * 공적연금 방어선: 월평균 약 64만 원 × 240개월 ≈ 1.5억
 * 기본자산: 통계청 가계금융복지조사, 60세 이상 가구 평균 순자산 중 금융·퇴직자산 축적분
 *   월 200: 4.8 − 1.5 − 2.1 = 1.2
 *   월 300: 7.2 − 1.5 − 3.6 = 2.1
 *   월 400: 9.6 − 1.5 − 4.9 = 3.2
 */
const GAP_SENIOR: Record<Lifestyle, string> = {
  modest: '약 1억 2,000만 원 부족',
  hobby: '약 2억 1,000만 원 부족',
  affluent: '약 3억 2,000만 원 부족',
}

const GAP_BASIS_WORKING = `※ 60세 은퇴 후 30년(360개월) 생존 기준, 국민연금 전국 평균 수령액(총 약 ${NPS_30Y_EOK}억 원) 및 퇴직연금 평균 수령액(약 ${RETIREMENT_AVG_EOK}억 원)을 반영한 사적 준비 갭(Gap)입니다.`

const GAP_BASIS_SENIOR = `※ 65세 기준 기대여명 20년(240개월) 생존 기준, 국민연금 20년 예상 수령액(약 ${NPS_20Y_EOK}억 원) 및 60대 가구 평균 금융·퇴직자산 축적분을 차감하여 산출된 순수 부족 자금입니다.`

function gapBadgeOf(pension: PensionHold): {
  gapBadge: string
  gapBadgeKind: GapBadgeKind
} {
  if (pension === 'national') {
    return {
      gapBadge: '사적연금 준비 시급',
      gapBadgeKind: 'urgent',
    }
  }

  return {
    gapBadge: '기존 준비 연금 반영 시 추가 필요액',
    gapBadgeKind: 'prepared',
  }
}

const BASIS_WORKING =
  '소득세법 제59조의3에 따라 연간 연금저축/IRP 합산 납입액(최대 900만 원)에 대해 소득 구간별 공제율(16.5% 또는 13.2%)을 적용한 연말정산 최대 환급 기준입니다.'

const BASIS_SENIOR =
  '소득세법 제14조 및 제129조에 따라 사적연금(연 3,000만 원 인출 기준)을 일시 수령(16.5% 분리과세) 대신 10년 이상 분산(연 1,500만 원 이하, 5.5% 저율과세) 수령 시 발생하는 세금 절감액 기준입니다.'

const PRESCRIPTION_WORKING = [
  '연금계좌(연금저축+IRP) 합산 납입 한도(최대 900만 원)를 채워 확정 세액공제 환급금 확보',
  '복리 운용을 통해 은퇴 전까지 부족한 자산 갭(Gap) 메우기',
  '개인 맞춤형 비과세 인출 플랜으로 추후 수령 시 세금 리스크 사전 방어',
]

const PRESCRIPTION_SENIOR = [
  '사적연금 수령 기간을 10년 이상으로 분산하여 연 1,500만 원 이하 저율과세(5.5%) 적용',
  '공적연금 및 사적연금 수령 시기 조율로 건강보험료 피부양자 자격 박탈 방어',
  '퇴직소득 IRP 분할 인출을 통한 퇴직소득세 30~40% 추가 감면 활용',
]

const INSIGHT_WORKING: Record<PensionHold, string> = {
  national:
    '지금은 국민연금만 계신 상태로 보입니다. IRP·연금저축을 함께 채우면 세액공제와 은퇴 자금 공백을 동시에 보완할 수 있습니다.',
  personal:
    '개인연금(연금저축)을 보유하고 계십니다. IRP와 합산 한도를 확인하면 공제액을 한 단계 더 끌어올릴 수 있습니다.',
  irp: '퇴직연금(IRP/DC)을 보유하고 계십니다. 연 900만 원 한도까지 추가 납입하면 세액공제 혜택을 더 키울 수 있습니다.',
  both: '퇴직연금과 개인연금을 함께 보유하고 계십니다. 합산 납입 한도를 채우고 인출 시점을 조율하면 절세와 부족 자금을 동시에 관리할 수 있습니다.',
}

const INSIGHT_SENIOR: Record<PensionHold, string> = {
  national:
    '국민연금만으로는 희망 생활비와의 차이가 클 수 있습니다. 사적연금을 10년 이상 나눠 받으면 세 부담을 낮출 수 있습니다.',
  personal:
    '개인연금을 10년 이상 분할 수령하면 일시 수령 대비 세 부담이 낮아지고, 월 현금흐름도 안정됩니다.',
  irp: '퇴직연금을 일시금이 아닌 연금으로 나눠 수령하면, 고율 분리과세 대신 저율과세 혜택을 받을 여지가 있습니다.',
  both: '퇴직연금과 개인연금을 함께 보유하고 계십니다. 수령 시기와 기간을 조율하면 저율과세와 건강보험 피부양자 자격을 함께 지킬 수 있습니다.',
}

export function diagnose(answers: Answers): Diagnosis {
  const isSenior = answers.age === 'senior'
  const { gapBadge, gapBadgeKind } = gapBadgeOf(answers.pension)

  if (isSenior) {
    return {
      gapLabel: GAP_SENIOR[answers.lifestyle],
      gapBadge,
      gapBadgeKind,
      gapBasis: GAP_BASIS_SENIOR,
      taxHeadline: '연간 최대 330만 원 절세 가능',
      taxBasis: BASIS_SENIOR,
      prescriptions: PRESCRIPTION_SENIOR,
      insight: INSIGHT_SENIOR[answers.pension],
      isSenior: true,
    }
  }

  const isUnder450 = answers.income === 'under450'
  const basis = gapBasisKind(answers.pension)

  return {
    gapLabel: GAP_WORKING[basis][answers.lifestyle],
    gapBadge,
    gapBadgeKind,
    gapBasis: GAP_BASIS_WORKING,
    taxHeadline: isUnder450
      ? '연간 최대 148만 5,000원 환급 가능'
      : '연간 최대 118만 8,000원 환급 가능',
    taxBasis: BASIS_WORKING,
    prescriptions: PRESCRIPTION_WORKING,
    insight: INSIGHT_WORKING[answers.pension],
    isSenior: false,
  }
}
