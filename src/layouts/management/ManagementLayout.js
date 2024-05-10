import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ManagementSidebar from './ManagementSidebar';
import ManagementHeader from './ManagementHeader';
import Page404 from '../../views/Page404';

import { CContainer, CSpinner } from '@coreui/react';

import managementRoutes from '../../routes/managementRoute';
import ManagementFooter from './ManagementFooter';

function ManagementLayout() {
  return (
    <div>
      <ManagementSidebar/>
      <div className="wrapper d-flex flex-column min-vh-100">
        <ManagementHeader/>
        <div className="body flex-grow-1">
          <CContainer className='px-4' lg>
            <Suspense fallback={<CSpinner color='primary' />}>
              <Routes>
                {managementRoutes.map((route, idx) => {
                  return (
                    <Route key={idx} path={route.path} element={<route.element/>}/>
                  )
                })}
                <Route index element={<Navigate to="dashboard" replace={true}/>}/>
                <Route path="*" element={<Page404/>}></Route>
              </Routes>
            </Suspense>    
          </CContainer>
        </div>
        <ManagementFooter/>
      </div>
    </div>
  )
}

export default ManagementLayout