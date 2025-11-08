import type { ShoppingCategory, ShoppingItem } from '../types'
import type { LanguageKey } from '../i18n'
import { translate, translateCategory, translateItemName, translateItemUnit } from '../i18n'

type SeasonalHighlightsProps = {
  items: ShoppingItem[]
  language: LanguageKey
  onSelectCategory: (category: ShoppingCategory) => void
}

const SeasonalHighlights = ({ items, language, onSelectCategory }: SeasonalHighlightsProps) => {
  if (items.length === 0) return null

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl">{translate(language, 'seasonal.title')}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {translate(language, 'seasonal.subtitle')}
          </p>
        </div>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className="group min-w-[220px] flex-1 snap-start rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-emerald-700/50 dark:bg-emerald-950/50"
            onClick={() => onSelectCategory(item.category)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                {translateCategory(language, item.category)}
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
                {translate(language, 'seasonal.cta')}
              </span>
            </div>
            <h3 className="mt-3 font-heading text-lg text-emerald-900 dark:text-emerald-100">
              {translateItemName(language, item)}
            </h3>
            {item.unit ? (
              <p className="text-sm text-emerald-700 dark:text-emerald-200">
                {translateItemUnit(language, item)}
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SeasonalHighlights
