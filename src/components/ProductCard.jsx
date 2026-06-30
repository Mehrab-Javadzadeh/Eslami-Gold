import React from 'react'
import { calcPrice, formatPrice } from '../data/useGoldPrice'
import { categoryLabels } from '../data/products'
import styles from './ProductCard.module.css'

function ProductCard({ product, gold18Price }) {
  const price = calcPrice(gold18Price, product)

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.img} />
        ) : (
          <div className={styles.emoji}>{product.emoji || '💍'}</div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.meta}>
          ⚖️ {product.weight} گرم · {categoryLabels[product.category]}
        </div>
        {product.description && (
          <div className={styles.desc}>{product.description}</div>
        )}
        <div className={styles.priceRow}>
          <div className={styles.priceLabel}>قیمت روز</div>
          <div className={styles.price}>
            {price ? formatPrice(price) + ' تومان' : 'در حال محاسبه...'}
          </div>
          <div className={styles.formula}>
            طلا×وزن + اجرت + {product.profitPercent}٪ سود
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard