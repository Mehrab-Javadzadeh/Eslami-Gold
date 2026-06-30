import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import GoldPriceBar from './components/GoldPriceBar'
import ProductCard from './components/ProductCard'
import AdminPanel from './components/AdminPanel'
import { useGoldPrice } from './data/useGoldPrice'
import { initialProducts, categoryLabels } from './data/products'
import styles from './App.module.css'

const STORAGE_KEY = 'goldshop_products'

function App() {
  const prices = useGoldPrice()
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return initialProducts
      }
    }
    return initialProducts
  })
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const filteredProducts = products.filter((product) => {
    const matchCategory = activeCategory === 'all' || product.category === activeCategory
    const matchSearch = !searchQuery || 
      product.name.includes(searchQuery) || 
      (product.description && product.description.includes(searchQuery))
    return matchCategory && matchSearch
  })

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev])
  }

  const handleEditProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ))
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm('این محصول حذف شود؟')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className={styles.app}>
      <Header onAdminClick={() => setShowAdmin(true)} onSearch={setSearchQuery} />
      <GoldPriceBar prices={prices} />

      <nav className={styles.nav}>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className={`${styles.navBtn} ${activeCategory === key ? styles.navActive : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        <div className={styles.sectionTitle}>
          محصولات موجود
          <span className={styles.count}>({filteredProducts.length} محصول)</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.empty}>
            <div>🔍</div>
            <div>محصولی یافت نشد</div>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} gold18Price={prices.gold18} />
            ))}
          </div>
        )}
      </main>

      {showAdmin && (
        <AdminPanel
          products={products}
          gold18Price={prices.gold18}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  )
}

export default App