import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { CButton, CForm, CFormInput, CModalFooter, CModalHeader, CModalTitle, CSpinner } from '@coreui/react';
import { toast } from 'sonner';

import SystemConstant from '../../../core/constants/system.constant.ts';
import FacultyService from '../../../core/services/management/faculty.service.ts';

function FacultyForm({modalData, onClose}) {
  
  const { t } = useTranslation();
  const [ form, setForm ] = useState(modalData?.data || {
    nameEn: '',
    nameLv: ''
  });
  const [ loading, setLoading ] = useState(false);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = () => {
    setLoading(true);
    if (modalData.action === SystemConstant.ACTION.EDIT) {
      FacultyService.update(modalData.data.id, form).then(
        () => {
          toast.success(t('MSG_UPDATE_DONE'));
          setLoading(false);
          onClose(true);
        },
        () => setLoading(false)
      )
    } else {
      FacultyService.create(form).then(
        () => {
          toast.success(t('MSG_CREATE_DONE'));
          setLoading(false);
          onClose(true);
        },
        () => setLoading(false)
      )
    }
  }
  return (
    <>
      <CModalHeader>
        <CModalTitle>{modalData.title}</CModalTitle>
      </CModalHeader>
      <CForm className="modal-body">
        <CFormInput name="nameEn" onChange={handleChange} label={t('FACULTY_NAME_EN')} value={form.nameEn}/>
        <CFormInput name="nameLv" onChange={handleChange} label={t('FACULTY_NAME_LV')} value={form.nameLv}/>
      </CForm>
      <CModalFooter>
        <CButton color="secondary" onClick={() => onClose()}>{t('CANCEL')}</CButton>
        <CButton disabled={loading} color="primary" onClick={onSubmit}>
          <CSpinner className='me-2' as="span" size="sm" role="status" hidden={!loading}/>{t('CONFIRM')}
        </CButton>
      </CModalFooter>
    </>
  )
}

export default FacultyForm