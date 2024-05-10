import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import { CContainer, CSpinner } from '@coreui/react';

import mainRoutes from '../../routes/mainRoute';
const Page404 = React.lazy(() => import('../../views/Page404'));

function MainLayout() {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <MainHeader/>
        <div className="body flex-grow-1">
          <CContainer className='px-4' lg>
            <Suspense fallback={<CSpinner color='primary' />}>
              <Routes>
                {mainRoutes.map((route, idx) => {
                  return (
                    <Route key={idx} path={route.path} element={<route.element/>}/>
                  )
                })}
                <Route index element={<Navigate to="home" replace={true}/>}/>
                <Route path="*" element={<Page404/>}></Route>
              </Routes>
            </Suspense>    
          </CContainer>
        </div>
        <MainFooter/>
      </div>
    </div>
  )
}

export default MainLayout