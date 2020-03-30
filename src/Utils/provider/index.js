import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export default function AppProvider({ children }) {

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </BrowserRouter>
  )
}
