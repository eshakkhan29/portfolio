'use client'
import React from 'react'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { usePathname } from 'next/navigation'

function LayoutDecider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  console.log('pathname', pathname)
  const isAdmin = pathname.startsWith('/admin')
  const isLogin = pathname.startsWith('/login')
  const isHaveHeader = isAdmin || isLogin
  return (
    <div>
      <header>
        {!isHaveHeader && <Navbar />}
        {children}
        {!isHaveHeader && (
          <>
            <ThemeMenu />
            <Footer />
          </>
        )}
      </header>
    </div>
  )
}

export default LayoutDecider
