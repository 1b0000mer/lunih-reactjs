import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { Toaster } from 'sonner';
import { CSpinner, useColorModes } from '@coreui/react'

import GuardedRoute from './routes/guard/GuardedRoute';
import AuthenticateService from './core/services/auth/authenticate.service.ts';

import './scss/style.scss'

const MainLayout = React.lazy(() => import('./layouts/main/MainLayout'))
const ManagementLayout = React.lazy(() => import('./layouts/management/ManagementLayout'))
const Logout = React.lazy(() => import('./views/Logout'))

function App() {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Toaster duration={3000} theme={storedTheme} richColors/>
          <Routes>
            <Route path="*" name="Home" element={<MainLayout/>}/>
            <Route element={<GuardedRoute auth={() => AuthenticateService.checkRoleAdmin()}/>}>
              <Route path="/management/*" name="Management" element={<ManagementLayout/>}/>
            </Route>
            <Route path="/logout" element={<Logout/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
