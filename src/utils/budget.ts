import type { ShoppingEntry, ShoppingItem } from '../types'

export const parseQuantity = (value?: string): number => {
  if (!value) return 0
  const normalized = value.replace(',', '.').trim()
  if (!normalized) return 0
  const quantity = Number(normalized)
  if (Number.isFinite(quantity)) {
    return quantity
  }
  if (normalized === '½' || normalized === '1/2') return 0.5
  if (normalized === '¼' || normalized === '1/4') return 0.25
  if (normalized === '¾' || normalized === '3/4') return 0.75
  return 0
}

export const calculateItemCost = (item: ShoppingItem & Partial<ShoppingEntry>): number => {
  const price = item.price ?? 0
  if (price === 0) return 0
  const quantity = parseQuantity(item.quantity)
  if (quantity > 0) {
    return quantity * price
  }
  return item.selected ? price : 0
}

export const formatCurrency = (value: number): string => {
  return `${value.toFixed(2)} د.`
}
