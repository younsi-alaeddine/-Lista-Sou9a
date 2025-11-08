import type { StoreProfile } from '../types'

const stores: StoreProfile[] = [
  {
    key: 'carrefour',
    name: 'Carrefour',
    icon: '🏬',
    baseAdjustment: 1,
    itemOverrides: {
      huileOlive: 17.5,
      huileVeg: 7.9,
      djaj: 10.2,
      laitBebe: 25.0,
      fromageRape: 4.8,
    },
  },
  {
    key: 'monoprix',
    name: 'Monoprix',
    icon: '🛍️',
    baseAdjustment: 1.05,
    deliveryFee: 3.5,
    itemOverrides: {
      jbena: 19.5,
      biskwi: 3.4,
      sachetTissu: 6.9,
      glace: 6.0,
      poissonPane: 15.9,
    },
  },
  {
    key: 'mg',
    name: 'MG',
    icon: '🛒',
    baseAdjustment: 0.95,
    itemOverrides: {
      batata: 1.6,
      tomatem: 2.0,
      felfel: 2.9,
      djaj: 9.8,
      roz: 2.8,
    },
  },
]

export default stores

