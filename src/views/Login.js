import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner';

import AuthenticateService from '../core/services/auth/authenticate.service.ts';
import { UrlConstant } from '../core/constants/url.constant.ts'

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {      
      setValidated(true);
      setLoading(false);
    } else {
      AuthenticateService.doLoginForm({email, password}).then(
        (res) => {
          setLoading(false);
          toast.success(t('WELCOME_MSG'));
          AuthenticateService.setAuthData(res.data);
          if (AuthenticateService.checkRoleAdmin()) {
            navigate(UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT);
          } else {
            navigate(UrlConstant.ROUTE.MAIN.HOME);
          }
        },
        (error) => {
          if (error.response) {
            toast.error(error.response.data.message)
          } else {
            toast.error(error.message)
          }
          setLoading(false);
        }
      )
    }
  }

  return (
    <div className="min-vh-80 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={validated} onSubmit={handleLogin}>
                    <h1>{t('LOG_IN')}</h1>
                    <p className="text-body-secondary">{t('LOG_IN_BODY')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        required feedbackInvalid={t('USER_NAME_ERR')} 
                        placeholder={t('USER_NAME_TIP')} 
                        autoComplete="off"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required feedbackInvalid={t('PASSWORD_ERR')}
                        type="password"
                        placeholder={t('PASSWORD_TIP')}
                        autoComplete="off"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-3">
                          <CSpinner className='me-2' as="span" size="sm" role="status" hidden={!loading}/>
                          {t('LOG_IN')}
                        </CButton>
                        {/* <Button variant="primary" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                         Loading...
                      </Button> */}
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          {t('FORGOR')}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
