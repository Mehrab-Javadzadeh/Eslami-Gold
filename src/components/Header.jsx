import React, { useState } from 'react'
import styles from './Header.module.css'

function Header({ onAdminClick, onSearch }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (searchOpen) {
      setSearchValue('')
      onSearch('')
    }
  }

  return (
    <>
      <header className={styles.header}>
        <button 
          className={styles.menuBtn} 
          onClick={() => setDrawerOpen(true)}
        >
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <line x1="2" y1="2" x2="26" y2="2" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="2" y1="10" x2="26" y2="10" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="2" y1="18" x2="26" y2="18" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={styles.logo}>
          <img 
            src="public/logo.png.jpg" 
            alt="زرین گالری" 
            className={styles.logoImg}
          />
        </div>

        <button 
          className={styles.searchBtn} 
          onClick={toggleSearch}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="7.5" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="16" y1="16" x2="21" y2="21" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {searchOpen && (
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            value={searchValue}
            onChange={handleSearchChange}
            className={styles.searchInput}
            autoFocus
          />
          <button className={styles.searchClose} onClick={toggleSearch}>✕</button>
        </div>
      )}

      {drawerOpen && (
        <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />
      )}

      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogo}>
            <img 
              src="public/logo2.png.jpg" 
              alt="زرین گالری" 
              className={styles.drawerLogoImg}
            />
          </div>
          <button className={styles.drawerClose} onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <div className={styles.drawerMenu}>
          <button 
            className={styles.drawerItem} 
            onClick={() => {
              setDrawerOpen(false)
              onAdminClick()
            }}
          >
            <span className={styles.drawerIcon}>🔐</span>
            پنل ادمین
          </button>
        </div>
      </div>
    </>
  )
}

export default Header