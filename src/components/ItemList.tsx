import { useMemo, useState } from 'react'
import type { ShoppingCategory, ShoppingItem, ShoppingState } from '../types'
import type { LanguageKey } from '../i18n'
import { translate, translateCategory, translateItemName, translateItemUnit } from '../i18n'
import { calculateItemCost, formatCurrency } from '../utils/budget'

type ItemListProps = {
  category: ShoppingCategory | null
  items: ShoppingItem[]
  state: ShoppingState
  onToggle: (item: ShoppingItem, selected: boolean) => void
  onUpdate: (item: ShoppingItem, updates: { quantity?: string; note?: string }) => void
  onBack: () => void
  onGoSummary: () => void
  language: LanguageKey
  totalSelected: number
  totalCost: number
  categoryCost: number
}

const ItemList = ({
  category,
  items,
  state,
  onToggle,
  onUpdate,
  onBack,
  onGoSummary,
  language,
  totalSelected,
  totalCost,
  categoryCost,
}: ItemListProps) => {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    const normalized = query.trim().toLowerCase()
    return items.filter((item) => translateItemName(language, item).toLowerCase().includes(normalized))
  }, [items, language, query])

  if (!category) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-700">
        <p className="text-neutral-600 dark:text-neutral-300">{translate(language, 'summary.empty')}</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {translate(language, 'items.back')}
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl">
            {category ? translateCategory(language, category) : ''}
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {translate(language, 'items.categoryCost', { amount: formatCurrency(categoryCost) })}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
            {translate(language, 'items.totalBudget', {
              count: totalSelected,
              amount: formatCurrency(totalCost),
            })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-neutral-700 dark:text-neutral-200"
          >
            ← {translate(language, 'items.back')}
          </button>
          <button
            type="button"
            onClick={onGoSummary}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {translate(language, 'items.toSummary')} →
          </button>
        </div>
      </header>

      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={translate(language, 'items.searchPlaceholder')}
          className="w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            ✕
          </button>
        ) : null}
      </div>

  <div className="space-y-4">
        {filteredItems.map((item) => {
          const entry = state[item.key]
          const selected = entry?.selected ?? false
          const quantity = entry?.quantity ?? ''
          const note = entry?.note ?? ''
          const price = item.price ?? 0
          const lineCost = calculateItemCost({ ...item, ...entry, selected })
          const priceLabel = price > 0 ? formatCurrency(price) : '—'
          const lineLabel = lineCost > 0 ? formatCurrency(lineCost) : '—'

          return (
            <div
              key={item.key}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <label htmlFor={`item-${item.key}`} className="flex flex-col gap-1 text-left sm:flex-row sm:items-start sm:gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      id={`item-${item.key}`}
                      type="checkbox"
                      checked={selected}
                      onChange={(event) => onToggle(item, event.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-neutral-300 text-primary focus:ring-primary dark:border-neutral-600"
                    />
                    <span>
                      <span className="font-heading text-lg">{translateItemName(language, item)}</span>
                      {item.unit ? (
                        <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">
                          ({translateItemUnit(language, item)})
                        </span>
                      ) : null}
                      {item.seasonal ? (
                        <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-200">
                          {translate(language, 'items.seasonal')}
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <div className="ml-8 space-y-1 text-sm text-neutral-500 dark:text-neutral-400 sm:ml-0 sm:pl-8">
                    <p>{translate(language, 'items.priceUnit', { price: priceLabel })}</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-300">
                      {translate(language, 'items.lineTotal', { total: lineLabel })}
                    </p>
                  </div>
                </label>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={quantity}
                    placeholder={translate(language, 'items.quantityPlaceholder')}
                    onChange={(event) => onUpdate(item, { quantity: event.target.value })}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-950"
                  />
                  <input
                    type="text"
                    value={note}
                    placeholder={translate(language, 'items.notePlaceholder')}
                    onChange={(event) => onUpdate(item, { note: event.target.value })}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-950"
                  />
                </div>
              </div>
            </div>
          )
        })}

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
            {translate(language, 'share.empty')}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ItemList

