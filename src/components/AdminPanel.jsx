import React, { useState } from 'react'
import { ADMIN_PASSWORD, categoryLabels } from '../data/products'
import { calcPrice, formatPrice } from '../data/useGoldPrice'
import styles from './AdminPanel.module.css'

function AdminPanel({ products, gold18Price, onAdd, onEdit, onDelete, onClose }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    category: 'ring',
    wage: '120000',
    profitPercent: '7',
    description: '',
    emoji: '💍',
    image: ''
  })

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setPasswordError('')
    } else {
      setPasswordError('رمز اشتباه است. رمز پیش‌فرض: admin123')
    }
  }

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      weight: '',
      category: 'ring',
      wage: '120000',
      profitPercent: '7',
      description: '',
      emoji: '💍',
      image: ''
    })
    setIsEditing(false)
    setEditId(null)
  }

  const startEditing = (product) => {
    setIsEditing(true)
    setEditId(product.id)
    setFormData({
      name: product.name,
      weight: product.weight.toString(),
      category: product.category,
      wage: product.wage.toString(),
      profitPercent: product.profitPercent.toString(),
      description: product.description || '',
      emoji: product.emoji || '💍',
      image: product.image || ''
    })
  }

  const getPreviewPrice = () => {
    if (!formData.weight || !gold18Price) return null
    return calcPrice(gold18Price, {
      weight: parseFloat(formData.weight),
      wage: parseFloat(formData.wage) || 0,
      profitPercent: parseFloat(formData.profitPercent) || 0,
    })
  }

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.weight) {
      alert('نام و وزن الزامی است')
      return
    }

    const productData = {
      id: isEditing ? editId : Date.now(),
      name: formData.name.trim(),
      weight: parseFloat(formData.weight),
      category: formData.category,
      wage: parseFloat(formData.wage) || 0,
      profitPercent: parseFloat(formData.profitPercent) || 7,
      description: formData.description.trim(),
      emoji: formData.emoji || '💍',
      image: formData.image.trim() || null,
    }

    if (isEditing) {
      onEdit(productData)
    } else {
      onAdd(productData)
    }
    resetForm()
  }

  const previewPrice = getPreviewPrice()

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {!loggedIn ? (
          <div>
            <div className={styles.title}>
              🔐 ورود به پنل ادمین
              <button className={styles.close} onClick={onClose}>×</button>
            </div>
            <input 
              type="password" 
              className={styles.passInput} 
              placeholder="رمز عبور" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()} 
            />
            {passwordError && <div className={styles.err}>{passwordError}</div>}
            <button className={styles.btn} onClick={handleLogin}>ورود</button>
          </div>
        ) : (
          <div>
            <div className={styles.title}>
              {isEditing ? '✏️ ویرایش محصول' : '📦 افزودن محصول'}
              <button className={styles.close} onClick={onClose}>×</button>
            </div>

            <div className={styles.row}>
              <label>نام محصول</label>
              <input 
                type="text" 
                placeholder="انگشتر گل رز" 
                value={formData.name} 
                onChange={(e) => updateForm('name', e.target.value)} 
              />
            </div>

            <div className={styles.grid}>
              <div className={styles.row}>
                <label>وزن (گرم)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder="3.5" 
                  value={formData.weight} 
                  onChange={(e) => updateForm('weight', e.target.value)} 
                />
              </div>
              <div className={styles.row}>
                <label>دسته‌بندی</label>
                <select value={formData.category} onChange={(e) => updateForm('category', e.target.value)}>
                  {Object.entries(categoryLabels)
                    .filter(([key]) => key !== 'all')
                    .map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.row}>
                <label>اجرت (تومان/گرم)</label>
                <input 
                  type="number" 
                  value={formData.wage} 
                  onChange={(e) => updateForm('wage', e.target.value)} 
                />
              </div>
              <div className={styles.row}>
                <label>سود (%)</label>
                <input 
                  type="number" 
                  value={formData.profitPercent} 
                  onChange={(e) => updateForm('profitPercent', e.target.value)} 
                />
              </div>
            </div>

            <div className={styles.row}>
              <label>توضیحات</label>
              <textarea 
                placeholder="جنس، طرح..." 
                value={formData.description} 
                onChange={(e) => updateForm('description', e.target.value)} 
              />
            </div>

            <div className={styles.grid}>
              <div className={styles.row}>
                <label>ایموجی</label>
                <input 
                  type="text" 
                  value={formData.emoji} 
                  onChange={(e) => updateForm('emoji', e.target.value)} 
                />
              </div>
              <div className={styles.row}>
                <label>لینک تصویر</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  value={formData.image} 
                  onChange={(e) => updateForm('image', e.target.value)} 
                />
              </div>
            </div>

            {previewPrice && (
              <div className={styles.preview}>
                <div className={styles.previewLabel}>پیش‌نمایش قیمت:</div>
                <div className={styles.previewPrice}>{formatPrice(previewPrice)} تومان</div>
              </div>
            )}

            <div className={styles.btnGroup}>
              <button className={styles.btn} onClick={handleSubmit}>
                {isEditing ? '💾 ذخیره تغییرات' : '+ افزودن محصول'}
              </button>
              {isEditing && (
                <button className={styles.btnCancel} onClick={resetForm}>لغو ویرایش</button>
              )}
            </div>

            <div className={styles.list}>
              <div className={styles.listTitle}>محصولات ({products.length})</div>
              {products.map((product) => (
                <div key={product.id} className={styles.listItem}>
                  <span>{product.emoji}</span>
                  <div className={styles.listInfo}>
                    <div>{product.name}</div>
                    <div className={styles.listSub}>{product.weight}گرم | {categoryLabels[product.category]}</div>
                  </div>
                  <div className={styles.listActions}>
                    <button className={styles.edit} onClick={() => startEditing(product)}>✏️</button>
                    <button className={styles.del} onClick={() => onDelete(product.id)}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel