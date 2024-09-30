import { Suspense, memo, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '@/app/providers/router/config/routeConfig'
import { PageLoader } from '@/widgetes/PageLoader'
import { RequireAuth } from './RequireAuth'
import { AppRoutesProps } from '@/shared/types/router'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    )

    return (
      <Route 
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
      />
    );
  }, [])

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  )
}

export default memo(AppRouter);
