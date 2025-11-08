import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type BudgetTipsProps = {
  language: LanguageKey
}

const BudgetTips = ({ language }: BudgetTipsProps) => {
  const tips = [
    translate(language, 'tips.item1'),
    translate(language, 'tips.item2'),
    translate(language, 'tips.item3'),
    translate(language, 'tips.item4'),
  ]

  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm dark:border-amber-600/40 dark:bg-amber-900/30">
      <header className="space-y-2">
        <h2 className="font-heading text-2xl sm:text-3xl">{translate(language, 'tips.title')}</h2>
        <p className="text-sm text-amber-800 dark:text-amber-200">{translate(language, 'tips.subtitle')}</p>
      </header>
      <ul className="mt-4 space-y-3 text-sm text-amber-900 dark:text-amber-100">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <span className="mt-1 text-lg" aria-hidden="true">
              💡
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BudgetTips

