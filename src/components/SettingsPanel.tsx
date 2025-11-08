import type { Preferences } from '../types'
import type { LanguageKey } from '../i18n'
import { translate } from '../i18n'

type SettingsPanelProps = {
  preferences: Preferences
  onToggleDarkMode: (value: boolean) => void
  onChangeLanguage: (language: LanguageKey) => void
  language: LanguageKey
}

const SettingsPanel = ({ preferences, onToggleDarkMode, onChangeLanguage, language }: SettingsPanelProps) => {
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

        <p className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
          {translate(language, 'settings.budgetDisabled')}
        </p>
      </div>
    </section>
  )
}

export default SettingsPanel
