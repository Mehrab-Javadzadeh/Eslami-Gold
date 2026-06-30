import React from 'react'
import { formatPrice } from '../data/useGoldPrice'
import styles from './GoldPriceBar.module.css'

export default function GoldPriceBar({ prices }) {
  const { gold18, gold24, coin, change18, lastUpdate } = prices
  return (
    <div className={styles.bar}>
      <div className={styles.item}>
        <span className={styles.dot} />
        <span className={styles.label}>طلای ۱۸ عیار</span>
        <span className={styles.value}>{gold18 ? formatPrice(gold18) + ' ت' : '...'}</span>
        {change18 !== 0 && (
          <span className={change18 >= 0 ? styles.up : styles.down}>
            {change18 >= 0 ? '+' : ''}{change18}%
          </span>
        )}
      </div>
      <div className={styles.item}>
        <span className={styles.label}>طلای ۲۴ عیار</span>
        <span className={styles.value}>{gold24 ? formatPrice(gold24) + ' ت' : '...'}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>سکه تمام بهار</span>
        <span className={styles.value}>{coin ? formatPrice(coin) + ' ت' : '...'}</span>
      </div>
      <div className={styles.update}>آخرین آپدیت: {lastUpdate || '...'}</div>
    </div>
  )
}