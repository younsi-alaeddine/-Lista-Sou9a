import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type QuickTutorialProps = {
  language: LanguageKey
}

const QuickTutorial = ({ language }: QuickTutorialProps) => {
  const steps = [
    {
      title: translate(language, 'tutorial.step1.title'),
      description: translate(language, 'tutorial.step1.description'),
      icon: '🛍️',
    },
    {
      title: translate(language, 'tutorial.step2.title'),
      description: translate(language, 'tutorial.step2.description'),
      icon: '✅',
    },
    {
      title: translate(language, 'tutorial.step3.title'),
      description: translate(language, 'tutorial.step3.description'),
      icon: '📤',
    },
  ]

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header className="space-y-2 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl">{translate(language, 'tutorial.title')}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{translate(language, 'tutorial.subtitle')}</p>
      </header>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-center dark:border-neutral-700 dark:bg-neutral-950"
          >
            <span className="text-3xl" aria-hidden="true">
              {step.icon}
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary-dark dark:bg-primary/20">
              {index + 1}
            </span>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{step.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default QuickTutorial

