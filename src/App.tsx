import * as React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ErrorBoundary } from './components/ErrorBoundary'
import { PageFallback } from './components/PageFallback'
import { AppLayout } from './layout/AppLayout'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const FavoritesPage = React.lazy(() => import('./pages/FavoritesPage'))
const ItemDetailPage = React.lazy(() => import('./pages/ItemDetailPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <React.Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/item/:itemSlug" element={<ItemDetailPage />} />
              <Route path="/:category/:itemSlug" element={<ItemDetailPage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/load" element={<PageFallback />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
