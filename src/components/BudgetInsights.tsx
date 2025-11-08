import type { BudgetHistoryEntry } from '../types'
import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type BudgetInsightsProps = {
  history: BudgetHistoryEntry[]
  total: number
  target: number | null
  language: LanguageKey
}

const BudgetInsights = ({ history: _history, total: _total, target, language }: BudgetInsightsProps) => {
  const priceUnavailable = translate(language, 'price.unavailable')

  return (
    <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header>
        <h3 className="font-heading text-xl">{translate(language, 'budget.title')}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {translate(language, 'budget.subtitle')}
        </p>
      </header>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-300">
          <span>{translate(language, 'budget.current', { amount: priceUnavailable })}</span>
          {target && target > 0 ? (
            <span>
              {translate(language, 'budget.target', {
                amount: priceUnavailable,
              })}
            </span>
          ) : null}
        </div>
        <div className="relative flex h-3 w-full items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-[10px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-300">
          <span>{priceUnavailable}</span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">
          {priceUnavailable}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          {translate(language, 'budget.historyTitle')}
        </p>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-300">{priceUnavailable}</p>
      </div>
    </section>
  )
}

export default BudgetInsights

