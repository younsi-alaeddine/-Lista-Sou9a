import type { ShoppingCategory } from '../types'
import type { LanguageKey } from '../i18n'
import { translate, translateCategory } from '../i18n'

type CategoryOverview = {
  name: ShoppingCategory
  total: number
  selected: number
}

type CategoryListProps = {
  categories: CategoryOverview[]
  onSelect: (category: ShoppingCategory) => void
  language: LanguageKey
}

const categoryIcons = {
  vegetables: '🥗',
  fruits: '🍊',
  driedFruit: '🥜',
  meat: '🥩',
  seafood: '🐟',
  savoryPantry: '🍚',
  sweetPantry: '🍯',
  cleaning: '🧽',
  dairy: '🧀',
  snacks: '🍪',
  spices: '🧂',
  bakery: '🥖',
  canned: '🥫',
  drinks: '🥤',
  frozen: '🧊',
  baby: '🍼',
  personalCare: '🧴',
  household: '🪣',
  pet: '🐾',
  textile: '🧺',
  pharmacy: '💊',
  other: '🛒',
} as Record<ShoppingCategory, string>

const CategoryList = ({ categories, onSelect, language }: CategoryListProps) => {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => onSelect(category.name)}
            className="flex flex-col items-start gap-4 rounded-2xl border border-transparent bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{categoryIcons[category.name] ?? '🛒'}</span>
              <h3 className="font-heading text-xl">{translateCategory(language, category.name)}</h3>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
                {translate(language, 'category.total', { count: category.total })}
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary-dark dark:bg-primary/20">
                {translate(language, 'category.selected', { count: category.selected })}
              </span>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
              {translate(language, 'home.viewItems')} <span aria-hidden="true">→</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export type { CategoryOverview }
export default CategoryList

