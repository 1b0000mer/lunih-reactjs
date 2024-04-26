import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { CContainer, CRow, CCol } from '@coreui/react';

import AuthenticateService from '../core/services/auth/authenticate.service.ts'

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    AuthenticateService.doLogout();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate])
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h4 className="pt-3">You have successfully logout!</h4>
              <p className="text-body-secondary float-start">
                Click <a href="/">here</a> if your browser does not automatically redirect you.
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Logout