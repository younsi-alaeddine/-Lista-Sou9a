import type { LanguageKey, TranslationKey } from '../i18n'
import { translate } from '../i18n'

export type ViewKey = 'home' | 'items' | 'summary' | 'settings'

type NavbarProps = {
  currentView: ViewKey
  onNavigate: (view: ViewKey) => void
  selectedCount: number
  language: LanguageKey
}

const navItems: Array<{ key: ViewKey; icon: string; label: TranslationKey }> = [
  { key: 'home', icon: '🏠', label: 'navbar.home' },
  { key: 'items', icon: '🧾', label: 'navbar.items' },
  { key: 'summary', icon: '✅', label: 'navbar.summary' },
  { key: 'settings', icon: '⚙️', label: 'navbar.settings' },
]

const Navbar = ({ currentView, onNavigate, selectedCount, language }: NavbarProps) => {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border border-neutral-200 bg-white/90 p-2 shadow-lg backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90">
        {navItems.map((item) => {
          const active = item.key === currentView
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={`relative flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                active
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span>{translate(language, item.label)}</span>
              {item.key === 'summary' && selectedCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-dark px-1 text-[10px] font-bold text-white dark:bg-primary">
                  {selectedCount}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar

