import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import CategoryList from './components/CategoryList'
import ItemList from './components/ItemList'
import Summary from './components/Summary'
import Navbar, { type ViewKey } from './components/Navbar'
import SettingsPanel from './components/SettingsPanel'
import QuickTutorial from './components/QuickTutorial'
import AboutSection from './components/AboutSection'
import BudgetTips from './components/BudgetTips'
import ContactSection from './components/ContactSection'
import MarketInfo from './components/MarketInfo'
import type {
  BudgetHistoryEntry,
  ItemStats,
  PersistedState,
  Preferences,
  ShoppingCategory,
  ShoppingEntry,
  ShoppingItem,
  ShoppingState,
} from './types'
import items from './data/items'
import type { LanguageKey } from './i18n'
import { translate, translateItemName, translateItemUnit } from './i18n'
import { downloadCsv, downloadPdf } from './utils/export'
import { calculateItemCost } from './utils/budget'

const STORAGE_KEY = 'sou9a-app-state-v1'

const detectPreferredDarkMode = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const defaultPreferences = (): Preferences => ({
  darkMode: detectPreferredDarkMode(),
  language: 'derja',
  budgetTarget: null,
})

const normalizePreferences = (value?: Partial<Preferences>): Preferences => {
  const defaults = defaultPreferences()
  return {
    darkMode: typeof value?.darkMode === 'boolean' ? value.darkMode : defaults.darkMode,
    language:
      value?.language === 'fr' || value?.language === 'en'
        ? value.language
        : value?.language === 'derja'
          ? 'derja'
          : defaults.language,
    budgetTarget:
      typeof value?.budgetTarget === 'number' && Number.isFinite(value.budgetTarget)
        ? value.budgetTarget
        : value?.budgetTarget === null
          ? null
          : defaults.budgetTarget,
  }
}

const sanitizeBudgetHistory = (entries?: unknown): BudgetHistoryEntry[] => {
  if (!Array.isArray(entries)) return []
  return entries
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null
      const candidate = entry as Partial<BudgetHistoryEntry> & Record<string, unknown>
      if (typeof candidate.date !== 'string' || candidate.date.length === 0) {
        return null
      }
      const totalValue =
        typeof candidate.total === 'number'
          ? candidate.total
          : Number.isFinite(Number(candidate.total))
            ? Number(candidate.total)
            : 0
      return {
        date: candidate.date,
        total: Number(totalValue.toFixed(2)),
        recordedAt:
          typeof candidate.recordedAt === 'string' && candidate.recordedAt.length > 0
            ? candidate.recordedAt
            : new Date().toISOString(),
      }
    })
    .filter((value): value is BudgetHistoryEntry => value !== null)
    .slice(-60)
}

const sanitizeItemStats = (input?: unknown): Record<string, ItemStats> => {
  if (!input || typeof input !== 'object') return {}
  return Object.entries(input as Record<string, Partial<ItemStats>>).reduce(
    (acc, [key, stats]) => {
      if (!stats || typeof stats !== 'object') return acc
      const times =
        typeof stats.timesSelected === 'number' && Number.isFinite(stats.timesSelected)
          ? stats.timesSelected
          : 0
      const last =
        typeof stats.lastSelectedAt === 'string' && stats.lastSelectedAt.length > 0
          ? stats.lastSelectedAt
          : null
      acc[key] = { timesSelected: times, lastSelectedAt: last }
      return acc
    },
    {} as Record<string, ItemStats>,
  )
}

const ensureEntry = (key: string, entry?: ShoppingEntry): ShoppingEntry => ({
  key,
  selected: entry?.selected ?? false,
  quantity: entry?.quantity ?? '',
  note: entry?.note ?? '',
})

const ensureStats = (stats?: ItemStats): ItemStats => ({
  timesSelected: stats?.timesSelected ?? 0,
  lastSelectedAt: stats?.lastSelectedAt ?? null,
})

const App = () => {
  const [persistedState, setPersistedState] = useState<PersistedState>(() => {
    const fallback: PersistedState = {
      items: {},
      preferences: defaultPreferences(),
      budgetHistory: [],
      itemStats: {},
    }
    if (typeof window === 'undefined') {
      return fallback
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) return fallback
      const parsed = JSON.parse(stored) as Partial<PersistedState> & Record<string, unknown>
      return {
        items: (parsed.items as ShoppingState) ?? {},
        preferences: normalizePreferences(parsed.preferences as Partial<Preferences>),
        budgetHistory: sanitizeBudgetHistory(parsed.budgetHistory),
        itemStats: sanitizeItemStats(parsed.itemStats),
      }
    } catch (error) {
      console.error('خطأ في قراءة التخزين المحلي', error)
      return fallback
    }
  })

  const [view, setView] = useState<ViewKey>('home')
  const [activeCategory, setActiveCategory] = useState<ShoppingCategory | null>(null)
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const [marketOpen, setMarketOpen] = useState(false)
  const [tipsOpen, setTipsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const language: LanguageKey = persistedState.preferences.language

  const persist = useCallback((next: PersistedState) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch (error) {
      console.error('خطأ في حفظ القائمة بالتخزين المحلي', error)
    }
  }, [])

  const updateState = useCallback(
    (updater: (prev: PersistedState) => PersistedState) => {
      setPersistedState((prev) => {
        const next = updater(prev)
        persist(next)
        return next
      })
    },
    [persist],
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    const isDark = persistedState.preferences.darkMode
    document.documentElement.classList.toggle('dark', isDark)
    const isRtl = persistedState.preferences.language === 'derja'
    document.documentElement.classList.toggle('rtl', isRtl)
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
  }, [persistedState.preferences.darkMode, persistedState.preferences.language])

  const groupedItems = useMemo(() => {
    return items.reduce<Record<ShoppingCategory, ShoppingItem[]>>((acc, item) => {
      const category = item.category as ShoppingCategory
      acc[category] = acc[category] || []
      acc[category].push(item)
      return acc
    }, {} as Record<ShoppingCategory, ShoppingItem[]>)
  }, [items])

  const categoryOverviews = useMemo(() => {
    return Object.entries(groupedItems).map(([name, list]) => {
      const categoryName = name as ShoppingCategory
      const cost = list.reduce((total, item) => {
        const entry = persistedState.items[item.key]
        if (!entry?.selected) return total
        return total + calculateItemCost({ ...item, ...entry })
      }, 0)
      const selected = list.reduce((total, item) => {
        return total + (persistedState.items[item.key]?.selected ? 1 : 0)
      }, 0)
      return {
        name: categoryName,
        total: list.length,
        selected,
        cost,
      }
    })
  }, [groupedItems, persistedState.items])

  const totalSelected = useMemo(() => {
    return Object.values(persistedState.items).filter((entry) => entry.selected).length
  }, [persistedState.items])

  const selectedItems = useMemo(() => {
    return Object.values(persistedState.items)
      .filter((entry) => entry.selected)
      .map((entry) => {
        const base = items.find((item) => item.key === entry.key)
        if (!base) return null
        return {
          ...base,
          selected: entry.selected,
          quantity: entry.quantity,
          note: entry.note,
        }
      })
      .filter((value): value is ShoppingItem & ShoppingEntry => value !== null)
  }, [items, persistedState.items])

  const totalSelectedCost = useMemo(() => {
    return selectedItems.reduce((total, item) => total + calculateItemCost(item), 0)
  }, [selectedItems])

  useEffect(() => {
    if (!Number.isFinite(totalSelectedCost)) return
    const today = new Date()
    const dateKey = today.toISOString().slice(0, 10)
    const roundedTotal = Number(totalSelectedCost.toFixed(2))
    updateState((prev) => {
      const currentHistory = prev.budgetHistory ?? []
      const foundIndex = currentHistory.findIndex((entry) => entry.date === dateKey)
      const timestamp = today.toISOString()
      if (foundIndex !== -1) {
        const existing = currentHistory[foundIndex]
        if (Math.abs(existing.total - roundedTotal) < 0.01) {
          return prev
        }
        const nextHistory = [...currentHistory]
        nextHistory[foundIndex] = { ...existing, total: roundedTotal, recordedAt: timestamp }
        return { ...prev, budgetHistory: nextHistory }
      }
      const nextHistory = [...currentHistory.slice(-59), { date: dateKey, total: roundedTotal, recordedAt: timestamp }]
      return { ...prev, budgetHistory: nextHistory }
    })
  }, [totalSelectedCost, updateState])

  const currentCategoryItems = useMemo(() => {
    if (!activeCategory) return []
    return groupedItems[activeCategory] ?? []
  }, [activeCategory, groupedItems])

  const currentCategoryCost = useMemo(() => {
    if (!activeCategory) return 0
    return selectedItems
      .filter((item) => item.category === activeCategory)
      .reduce((total, item) => total + calculateItemCost(item), 0)
  }, [activeCategory, selectedItems])

  const handleSelectCategory = useCallback((category: ShoppingCategory) => {
    setActiveCategory(category)
    setView('items')
  }, [])

  const handleToggleItem = useCallback(
    (item: ShoppingItem, selected: boolean) => {
      updateState((prev) => {
        const nextItems: ShoppingState = { ...prev.items }
        const current = ensureEntry(item.key, nextItems[item.key])
        const nextEntry = { ...current, selected }

        if (!nextEntry.selected && !nextEntry.quantity.trim() && !nextEntry.note.trim()) {
          delete nextItems[item.key]
        } else {
          nextItems[item.key] = nextEntry
        }

        if (!selected) {
          return { ...prev, items: nextItems }
        }

        const currentStats = ensureStats(prev.itemStats[item.key])
        const nextStats: Record<string, ItemStats> = {
          ...prev.itemStats,
          [item.key]: {
            timesSelected: currentStats.timesSelected + 1,
            lastSelectedAt: new Date().toISOString(),
          },
        }

        return { ...prev, items: nextItems, itemStats: nextStats }
      })
    },
    [updateState],
  )

  const handleUpdateItem = useCallback(
    (item: ShoppingItem, updates: { quantity?: string; note?: string }) => {
      updateState((prev) => {
        const nextItems: ShoppingState = { ...prev.items }
        const current = ensureEntry(item.key, nextItems[item.key])
        const nextEntry: ShoppingEntry = {
          ...current,
          quantity: updates.quantity ?? current.quantity,
          note: updates.note ?? current.note,
        }

        if (!nextEntry.selected && !nextEntry.quantity.trim() && !nextEntry.note.trim()) {
          delete nextItems[item.key]
        } else {
          nextItems[item.key] = nextEntry
        }

        return { ...prev, items: nextItems }
      })
    },
    [updateState],
  )

  const handleChangeLanguage = useCallback(
    (nextLanguage: LanguageKey) => {
      updateState((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          language: nextLanguage,
        },
      }))
    },
    [updateState],
  )

  const handleUpdateBudgetTarget = useCallback(
    (value: number | null) => {
      updateState((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          budgetTarget: value,
        },
      }))
    },
    [updateState],
  )

  const handleToggleDarkMode = useCallback(
    (value: boolean) => {
      updateState((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          darkMode: value,
        },
      }))
    },
    [updateState],
  )

  const handleClearAll = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      items: {},
    }))
  }, [updateState])

  const ensureCategoryBeforeNavigate = useCallback(() => {
    if (!activeCategory) {
      const fallback = categoryOverviews[0]?.name ?? null
      if (fallback) {
        setActiveCategory(fallback)
      }
    }
  }, [activeCategory, categoryOverviews])

  const handleNavigate = useCallback(
    (nextView: ViewKey) => {
      if (nextView === 'items') {
        ensureCategoryBeforeNavigate()
      }
      setView(nextView)
    },
    [ensureCategoryBeforeNavigate],
  )

  const buildShareMessage = useCallback(() => {
    if (selectedItems.length === 0) {
      return translate(language, 'share.empty')
    }

    const lines = selectedItems.map((item, index) => {
      const name = translateItemName(language, item)
      const unit = translateItemUnit(language, item)
      return translate(language, 'share.bodyLine', {
        index: index + 1,
        name,
        quantity: item.quantity || '-',
        unit: unit ? ` ${unit}` : '',
        note: item.note ? ` (${item.note})` : '',
        total: translate(language, 'price.unavailable'),
      })
    })

    return `${translate(language, 'share.subject')}\n\n${lines.join('\n')}`
  }, [language, selectedItems])

  const handleShareWhatsapp = useCallback(() => {
    const message = buildShareMessage()
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }, [buildShareMessage])

  const handleShareEmail = useCallback(() => {
    const subject = translate(language, 'share.subject')
    const body = buildShareMessage()
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [buildShareMessage, language])

  const handleShareSystem = useCallback(async () => {
    const subject = translate(language, 'share.subject')
    const text = buildShareMessage()

    if (navigator.share) {
      try {
        await navigator.share({ title: subject, text })
      } catch (error) {
        console.error('Error sharing', error)
      }
    } else {
      alert(text)
    }
  }, [buildShareMessage, language])

  const exportCsv = useCallback(() => {
    downloadCsv(selectedItems, language)
  }, [language, selectedItems])

  const exportPdf = useCallback(async () => {
    try {
      await downloadPdf(selectedItems, language)
    } catch (error) {
      console.error('Unable to generate PDF', error)
      alert(translate(language, 'export.pdfGenericError'))
    }
  }, [language, selectedItems])

  const currentYear = new Date().getFullYear()

  let content: ReactNode

  if (view === 'home') {
    content = (
      <div className="space-y-10">
        <CategoryList categories={categoryOverviews} onSelect={handleSelectCategory} language={language} />
      </div>
    )
  } else if (view === 'items') {
    content = (
      <ItemList
        category={activeCategory}
        items={currentCategoryItems}
        state={persistedState.items}
        onToggle={handleToggleItem}
        onUpdate={handleUpdateItem}
        onBack={() => setView('home')}
        onGoSummary={() => setView('summary')}
        language={language}
        totalSelected={totalSelected}
        totalCost={totalSelectedCost}
        categoryCost={currentCategoryCost}
      />
    )
  } else if (view === 'settings') {
    content = (
      <SettingsPanel
        preferences={persistedState.preferences}
        onToggleDarkMode={handleToggleDarkMode}
        onChangeLanguage={handleChangeLanguage}
        onUpdateBudgetTarget={handleUpdateBudgetTarget}
        language={language}
      />
    )
  } else {
    content = (
      <Summary
        items={selectedItems}
        language={language}
        onBack={() => setView('home')}
        onExportCsv={exportCsv}
        onExportPdf={exportPdf}
        onShareWhatsapp={handleShareWhatsapp}
        onShareEmail={handleShareEmail}
        onShareSystem={handleShareSystem}
        onClearAll={handleClearAll}
        totalCost={totalSelectedCost}
        categoryCosts={categoryOverviews}
        budgetHistory={persistedState.budgetHistory}
        budgetTarget={persistedState.preferences.budgetTarget}
      />
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 pb-32 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-10 pt-12">
        <header className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {translate(language, 'app.title')}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-5xl">
            {translate(language, 'home.title')}
          </h1>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            {translate(language, 'home.subtitle')}
          </p>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            {translate(language, 'home.popupHint')}
          </p>
        </header>
        <main className="flex-1">{content}</main>
        <footer className="mt-12 space-y-2 rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-center text-sm text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          <p>{translate(language, 'footer.message')}</p>
          <p>
            <a
              href="https://www.instagram.com/younsialaeddine"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary transition hover:underline dark:text-primary-light"
            >
              {translate(language, 'footer.instagram', { handle: '@younsialaeddine' })}
            </a>
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {translate(language, 'footer.copyright', { year: currentYear })}
          </p>
        </footer>
      </div>
      <Navbar currentView={view} onNavigate={handleNavigate} selectedCount={totalSelected} language={language} />
      <div className="sticky bottom-[88px] z-40 w-full px-4 pb-4 sm:fixed sm:bottom-28 sm:right-6 sm:w-auto sm:px-0 sm:pb-0">
        <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-3xl bg-white/95 p-2 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-md dark:bg-neutral-900/90 sm:mx-0 sm:flex-col sm:items-end sm:gap-3 sm:rounded-2xl sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
          <button
            type="button"
            onClick={() => setTutorialOpen(true)}
            className="flex-1 min-w-[140px] rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 sm:flex-none"
          >
            <span aria-hidden="true">📖</span>
            {translate(language, 'tutorial.openButton')}
          </button>
          <button
            type="button"
            onClick={() => setMarketOpen(true)}
            className="flex-1 min-w-[140px] rounded-full bg-neutral-900/90 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 sm:flex-none"
          >
            <span aria-hidden="true">🗺️</span>
            {translate(language, 'home.marketButton')}
          </button>
          <button
            type="button"
            onClick={() => setTipsOpen(true)}
            className="flex-1 min-w-[140px] rounded-full bg-amber-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 sm:flex-none"
          >
            <span aria-hidden="true">💡</span>
            {translate(language, 'home.tipsButton')}
          </button>
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="flex-1 min-w-[140px] rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 sm:flex-none"
          >
            <span aria-hidden="true">ℹ️</span>
            {translate(language, 'home.aboutButton')}
          </button>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex-1 min-w-[140px] rounded-full bg-emerald-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 sm:flex-none"
          >
            <span aria-hidden="true">📞</span>
            {translate(language, 'home.contactButton')}
          </button>
        </div>
      </div>
      {tutorialOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setTutorialOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setTutorialOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Close tutorial"
            >
              ✕
            </button>
            <QuickTutorial language={language} />
          </div>
        </div>
      ) : null}
      {marketOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMarketOpen(false)} aria-hidden />
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setMarketOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Close market info"
            >
              ✕
            </button>
            <MarketInfo language={language} />
          </div>
        </div>
      ) : null}
      {tipsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setTipsOpen(false)} aria-hidden />
          <div className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setTipsOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Close budget tips"
            >
              ✕
            </button>
            <BudgetTips language={language} />
          </div>
        </div>
      ) : null}
      {aboutOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setAboutOpen(false)} aria-hidden />
          <div className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setAboutOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Close about"
            >
              ✕
            </button>
            <AboutSection language={language} />
          </div>
        </div>
      ) : null}
      {contactOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setContactOpen(false)} aria-hidden />
          <div className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Close contact"
            >
              ✕
            </button>
            <ContactSection language={language} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App

