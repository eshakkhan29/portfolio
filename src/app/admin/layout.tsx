import React from 'react'
import { Toaster } from 'react-hot-toast'

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-20">
      <Toaster /> {children}
    </div>
  )
}

export default AdminLayout
