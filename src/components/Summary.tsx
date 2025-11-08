import { useMemo } from 'react'
import type { BudgetHistoryEntry, ShoppingCategory, ShoppingItem } from '../types'
import type { LanguageKey } from '../i18n'
import { translate, translateCategory, translateItemName, translateItemUnit } from '../i18n'
import BudgetInsights from './BudgetInsights'

type SelectedItem = ShoppingItem & {
  selected: boolean
  quantity: string
  note: string
}

type SummaryProps = {
  items: SelectedItem[]
  language: LanguageKey
  onBack: () => void
  onExportCsv: () => void
  onExportPdf: () => void
  onShareWhatsapp: () => void
  onShareEmail: () => void
  onShareSystem: () => void
  onClearAll: () => void
  totalCost: number
  categoryCosts: Array<{ name: ShoppingCategory; cost: number }>
  budgetHistory: BudgetHistoryEntry[]
  budgetTarget: number | null
}

const Summary = ({
  items,
  language,
  onBack,
  onExportCsv,
  onExportPdf,
  onShareWhatsapp,
  onShareEmail,
  onShareSystem,
  onClearAll,
  totalCost,
  categoryCosts,
  budgetHistory,
  budgetTarget,
}: SummaryProps) => {
  const grouped = useMemo(() => {
    return items.reduce<Record<ShoppingCategory, SelectedItem[]>>((acc, item) => {
      acc[item.category] = acc[item.category] || []
      acc[item.category].push(item)
      return acc
    }, {} as Record<ShoppingCategory, SelectedItem[]>)
  }, [items])

  const priceUnavailable = translate(language, 'price.unavailable')

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <p className="text-neutral-600 dark:text-neutral-300">{translate(language, 'summary.empty')}</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          ← {translate(language, 'items.back')}
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl">{translate(language, 'summary.title')}</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {translate(language, 'summary.subtitle')}
          </p>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
            {translate(language, 'summary.totalCost', { amount: priceUnavailable })}
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
            onClick={() => {
              if (confirm(translate(language, 'summary.confirmClear'))) {
                onClearAll()
              }
            }}
            className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-400 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400/50 dark:border-red-400/40 dark:text-red-300"
          >
            {translate(language, 'summary.clearAll')}
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-300">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-primary-dark dark:bg-primary/20">
            {translate(language, 'summary.totalSelected', { count: items.length })}
          </span>
          <span className="rounded-full bg-emerald-100 px-4 py-1 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
            {translate(language, 'summary.totalCost', { amount: priceUnavailable })}
          </span>
        </div>
      </div>

      <BudgetInsights history={budgetHistory} total={totalCost} target={budgetTarget} language={language} />

      <div className="grid gap-5">
        {Object.entries(grouped).map(([category, list]) => (
          <div
            key={category}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h3 className="font-heading text-xl">
              {translateCategory(language, category as ShoppingCategory)}
            </h3>
            <ul className="mt-4 space-y-4">
              {list.map((item, index) => {
                return (
                  <li key={item.key} className="rounded-xl border border-neutral-100 p-4 dark:border-neutral-800">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-heading text-lg">
                          {index + 1}. {translateItemName(language, item)}
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300">
                          {item.quantity || '-'} {translateItemUnit(language, item)}
                        </p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
                          {translate(language, 'summary.lineCost', { amount: priceUnavailable })}
                        </p>
                      </div>
                      {item.note ? (
                        <p className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 sm:w-64">
                          {item.note}
                        </p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categoryCosts.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="font-medium">{translateCategory(language, category.name)}</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-300">
              {translate(language, 'summary.categoryCost', { amount: priceUnavailable })}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onExportCsv}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
        >
          📄 {translate(language, 'summary.exportCsv')}
        </button>
        <button
          type="button"
          onClick={onExportPdf}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          🖨️ {translate(language, 'summary.exportPdf')}
        </button>
        <button
          type="button"
          onClick={onShareWhatsapp}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#128C7E] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0f6e62] focus:outline-none focus:ring-2 focus:ring-[#128C7E]/40"
        >
          💬 {translate(language, 'summary.shareWhatsapp')}
        </button>
        <button
          type="button"
          onClick={onShareEmail}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-200 px-5 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400/40 dark:bg-neutral-700 dark:text-neutral-100"
        >
          ✉️ {translate(language, 'summary.shareEmail')}
        </button>
        <button
          type="button"
          onClick={onShareSystem}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-800 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-neutral-600 dark:text-neutral-100"
        >
          📱 {translate(language, 'summary.shareSystem')}
        </button>
      </div>
    </section>
  )
}

export default Summary

