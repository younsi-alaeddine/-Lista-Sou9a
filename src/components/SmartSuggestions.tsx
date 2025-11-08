import type { ItemStats, ShoppingItem } from '../types'
import type { LanguageKey } from '../i18n'
import { translate, translateCategory, translateItemName } from '../i18n'

type FrequentSuggestion = {
  item: ShoppingItem
  stats: ItemStats
}

type SmartSuggestionsProps = {
  frequent: FrequentSuggestion[]
  seasonal: ShoppingItem[]
  onAdd: (item: ShoppingItem) => void
  language: LanguageKey
}

const SmartSuggestions = ({ frequent, seasonal, onAdd, language }: SmartSuggestionsProps) => {
  if (frequent.length === 0 && seasonal.length === 0) {
    return null
  }

  return (
    <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header>
        <h2 className="font-heading text-xl">{translate(language, 'suggestions.title')}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {translate(language, 'suggestions.subtitle')}
        </p>
      </header>

      {frequent.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-300">
            {translate(language, 'suggestions.frequentTitle')}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {frequent.map(({ item, stats }) => (
              <button
                key={`frequent-${item.key}`}
                type="button"
                onClick={() => onAdd(item)}
                className="group flex flex-col items-start gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-primary/60"
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <div>
                    <p className="font-heading text-base leading-tight text-neutral-900 dark:text-neutral-100">
                      {translateItemName(language, item)}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {translateCategory(language, item.category)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {translate(language, 'suggestions.timesSelected', { count: stats.timesSelected })}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  <span aria-hidden="true">＋</span>
                  {translate(language, 'suggestions.add')}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {seasonal.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-300">
            {translate(language, 'suggestions.seasonalTitle')}
          </h3>
          <div className="flex snap-x gap-3 overflow-x-auto pb-2">
            {seasonal.map((item) => (
              <button
                key={`seasonal-${item.key}`}
                type="button"
                onClick={() => onAdd(item)}
                className="min-w-[200px] flex-1 snap-start rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-amber-600/40 dark:bg-amber-900/30"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-300/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                    {translate(language, 'items.seasonal')}
                  </span>
                </div>
                <p className="mt-3 font-heading text-base text-neutral-900 dark:text-neutral-100">
                  {translateItemName(language, item)}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  {translateCategory(language, item.category)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  <span aria-hidden="true">＋</span>
                  {translate(language, 'suggestions.add')}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SmartSuggestions

