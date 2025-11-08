import { useEffect, useState, type FormEvent } from 'react'
import type { Preferences } from '../types'
import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type SettingsPanelProps = {
  preferences: Preferences
  onToggleDarkMode: (value: boolean) => void
  onChangeLanguage: (language: LanguageKey) => void
  onUpdateBudgetTarget: (value: number | null) => void
  language: LanguageKey
}

const SettingsPanel = ({
  preferences,
  onToggleDarkMode,
  onChangeLanguage,
  onUpdateBudgetTarget,
  language,
}: SettingsPanelProps) => {
  const [budgetInput, setBudgetInput] = useState('')
  const priceUnavailable = translate(language, 'price.unavailable')

  useEffect(() => {
    setBudgetInput(preferences.budgetTarget ? String(preferences.budgetTarget) : '')
  }, [preferences.budgetTarget])

  const handleBudgetSubmit = (event: FormEvent) => {
    event.preventDefault()
    const normalized = budgetInput.replace(',', '.').trim()
    if (!normalized) {
      onUpdateBudgetTarget(null)
      return
    }
    const parsed = Number(normalized)
    if (Number.isFinite(parsed) && parsed >= 0) {
      onUpdateBudgetTarget(Number(parsed.toFixed(2)))
    }
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="font-heading text-2xl sm:text-3xl">{translate(language, 'settings.title')}</h2>
      </header>

      <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="space-y-2">
          <h3 className="font-heading text-lg">{translate(language, 'settings.language')}</h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChangeLanguage('derja')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                preferences.language === 'derja'
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200'
              }`}
            >
              {translate(language, 'settings.language.derja')}
            </button>
            <button
              type="button"
              onClick={() => onChangeLanguage('fr')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                preferences.language === 'fr'
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200'
              }`}
            >
              {translate(language, 'settings.language.fr')}
            </button>
            <button
              type="button"
              onClick={() => onChangeLanguage('en')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                preferences.language === 'en'
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200'
              }`}
            >
              {translate(language, 'settings.language.en')}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-lg">{translate(language, 'settings.darkMode')}</h3>
          <button
            type="button"
            onClick={() => onToggleDarkMode(!preferences.darkMode)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
              preferences.darkMode
                ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
                : 'border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200'
            }`}
          >
            <span>{preferences.darkMode ? '🌙' : '☀️'}</span>
            <span>
              {preferences.darkMode
                ? translate(language, 'settings.darkMode.on')
                : translate(language, 'settings.darkMode.off')}
            </span>
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading text-lg">{translate(language, 'settings.budgetTitle')}</h3>
          <form onSubmit={handleBudgetSubmit} className="flex flex-col gap-2 sm:flex-row">
            <input
              type="number"
              min={0}
              step="0.5"
              value={budgetInput}
              onChange={(event) => setBudgetInput(event.target.value)}
              placeholder={translate(language, 'settings.budgetPlaceholder')}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-neutral-700 dark:bg-neutral-950"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {translate(language, 'settings.budgetApply')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setBudgetInput('')
                  onUpdateBudgetTarget(null)
                }}
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-neutral-700 dark:text-neutral-200"
              >
                {translate(language, 'settings.budgetReset')}
              </button>
            </div>
          </form>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {preferences.budgetTarget !== null
              ? translate(language, 'settings.budgetCurrent', {
                  amount: priceUnavailable,
                })
              : translate(language, 'settings.budgetNoTarget')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SettingsPanel

