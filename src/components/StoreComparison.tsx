import { useMemo } from 'react'
import type { ShoppingEntry, ShoppingItem } from '../types'
import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'
import { parseQuantity } from '../utils/budget'
import stores from '../data/stores'

type ComparedItem = ShoppingItem & Pick<ShoppingEntry, 'quantity'>

type StoreComparisonProps = {
  items: ComparedItem[]
  language: LanguageKey
}

const StoreComparison = ({ items, language }: StoreComparisonProps) => {
  const summaries = useMemo(() => {
    if (items.length === 0) {
      return []
    }

    return stores.map((store) => {
      const baseTotal = items.reduce((total, item) => {
        const basePrice = item.price ?? 0
        const storePrice =
          store.itemOverrides?.[item.key] ??
          (basePrice > 0 ? basePrice * store.baseAdjustment : basePrice)
        const quantity = parseQuantity(item.quantity)
        const lineCost = quantity > 0 ? storePrice * quantity : storePrice
        return total + lineCost
      }, 0)

      const total = baseTotal + (store.deliveryFee ?? 0)

      return {
        store,
        total,
      }
    })
  }, [items])

  if (summaries.length === 0) {
    return null
  }

  const sorted = [...summaries].sort((a, b) => a.total - b.total)
  const bestTotal = sorted[0]?.total ?? 0
  const priceUnavailable = translate(language, 'price.unavailable')

  return (
    <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header>
        <h3 className="font-heading text-xl">{translate(language, 'comparison.title')}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {translate(language, 'comparison.subtitle')}
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {sorted.map(({ store, total }, index) => {
          const difference = total - bestTotal
          const isBest = difference <= 0.01
          return (
            <div
              key={store.key}
              className={`space-y-3 rounded-2xl border p-4 transition ${
                isBest
                  ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-600/60 dark:bg-emerald-950/40'
                  : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden="true">
                  {store.icon}
                </span>
                {isBest ? (
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-emerald-600/80">
                    {translate(language, 'comparison.bestValue')}
                  </span>
                ) : null}
              </div>
              <div>
                <p className="font-heading text-lg">
                  {translate(language, 'comparison.optionLabel', { index: index + 1 })}
                </p>
                {store.deliveryFee ? (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {translate(language, 'comparison.delivery', {
                      amount: priceUnavailable,
                    })}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-200">
                <p className="text-base font-semibold text-emerald-600 dark:text-emerald-300">
                  {translate(language, 'comparison.total', { amount: priceUnavailable })}
                </p>
                {!isBest ? (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {translate(language, 'comparison.difference', {
                      amount: priceUnavailable,
                    })}
                  </p>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default StoreComparison

