export type ShoppingCategory =
  | 'vegetables'
  | 'fruits'
  | 'driedFruit'
  | 'meat'
  | 'seafood'
  | 'savoryPantry'
  | 'sweetPantry'
  | 'cleaning'
  | 'dairy'
  | 'snacks'
  | 'spices'
  | 'bakery'
  | 'canned'
  | 'drinks'
  | 'frozen'
  | 'baby'
  | 'personalCare'
  | 'household'
  | 'pet'
  | 'textile'
  | 'pharmacy'
  | 'other'

export type LocaleLanguage = 'derja' | 'fr' | 'en'

export type LocaleLabels = Record<LocaleLanguage, string>

export type ShoppingItem = {
  key: string
  labels: LocaleLabels
  category: ShoppingCategory
  unit?: string
  unitLabels?: Partial<LocaleLabels>
  price?: number
  seasonal?: boolean
}

export type ShoppingEntry = {
  key: string
  selected: boolean
  quantity: string
  note: string
  price?: number
}

export type ShoppingState = Record<string, ShoppingEntry>

export type Preferences = {
  darkMode: boolean
  language: LocaleLanguage
  budgetTarget: number | null
}

export type BudgetHistoryEntry = {
  date: string
  total: number
  recordedAt: string
}

export type ItemStats = {
  timesSelected: number
  lastSelectedAt: string | null
}

export type PersistedState = {
  items: ShoppingState
  preferences: Preferences
  budgetHistory: BudgetHistoryEntry[]
  itemStats: Record<string, ItemStats>
}

export type StoreProfile = {
  key: string
  name: string
  icon: string
  baseAdjustment: number
  deliveryFee?: number
  itemOverrides?: Record<string, number>
}

