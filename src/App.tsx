import { useEffect, useRef, useState } from 'react'
import { Analyzing } from './components/Analyzing'
import { Header } from './components/Header'
import { Landing } from './components/Landing'
import { Quiz } from './components/Quiz'
import { Result } from './components/Result'
import { STEPS } from './data/quiz'
import { diagnose } from './engine/calculate'
import type { Answers, PartialAnswers, QuizStepId } from './types'

type Phase = 'landing' | 'quiz' | 'analyzing' | 'result'

const emptyAnswers: PartialAnswers = {}

function isComplete(answers: PartialAnswers): answers is Answers {
  return Boolean(answers.age && answers.income && answers.pension && answers.lifestyle)
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<PartialAnswers>(emptyAnswers)
  const stepRef = useRef(stepIndex)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  stepRef.current = stepIndex

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [phase, stepIndex])

  useEffect(() => {
    if (phase !== 'analyzing') return
    const timer = window.setTimeout(() => setPhase('result'), 1400)
    return () => window.clearTimeout(timer)
  }, [phase])

  function restart() {
    setPhase('landing')
    setStepIndex(0)
    setAnswers(emptyAnswers)
  }

  function handleSelect(step: QuizStepId, value: string) {
    setAnswers((prev) => ({ ...prev, [step]: value }))

    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    const captured = stepIndex
    advanceTimer.current = window.setTimeout(() => {
      if (stepRef.current !== captured) return
      if (captured < STEPS.length - 1) {
        setStepIndex(captured + 1)
        return
      }
      setPhase('analyzing')
    }, 180)
  }

  const diagnosis = isComplete(answers) ? diagnose(answers) : null

  return (
    <div className="min-h-svh bg-cream">
      <Header showRestart={phase === 'result'} onRestart={restart} />

      {phase === 'landing' ? (
        <Landing onStart={() => setPhase('quiz')} />
      ) : null}

      {phase === 'quiz' ? (
        <Quiz
          stepIndex={stepIndex}
          answers={answers}
          onSelect={handleSelect}
          onBack={() => setStepIndex((i) => Math.max(0, i - 1))}
        />
      ) : null}

      {phase === 'analyzing' ? <Analyzing /> : null}

      {phase === 'result' && diagnosis && isComplete(answers) ? (
        <Result
          answers={answers}
          diagnosis={diagnosis}
          onRestart={restart}
        />
      ) : null}
    </div>
  )
}
