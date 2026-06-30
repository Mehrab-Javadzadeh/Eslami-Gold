import { useState, useEffect } from 'react'

export function useGoldPrice() {
  const [prices, setPrices] = useState({ 
    gold18: 0, 
    gold24: 0, 
    coin: 0, 
    change18: 0, 
    lastUpdate: '' 
  })

  useEffect(() => {
    const updatePrices = () => {
      const base = 4250000 + Math.round((Math.random() - 0.5) * 80000)
      const now = new Date()
      setPrices({
        gold18: base,
        gold24: Math.round(base * 1.333),
        coin: Math.round(base * 18.3),
        change18: parseFloat(((Math.random() - 0.4) * 1.2).toFixed(1)),
        lastUpdate: now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      })
    }

    updatePrices()
    const interval = setInterval(updatePrices, 15000)
    return () => clearInterval(interval)
  }, [])

  return prices
}

export function calcPrice(gold18Price, product) {
  if (!gold18Price || !product.weight) return 0
  const base = gold18Price * product.weight + product.wage * product.weight
  return Math.round(base * (1 + product.profitPercent / 100))
}

export function formatPrice(num) {
  return num.toLocaleString('fa-IR')
}