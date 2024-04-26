import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { CButton, CForm, CFormInput, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { toast } from 'sonner';

import SystemConstant from '../../../core/constants/system.constant.ts';
import FacultyService from '../../../core/services/management/faculty.service.ts';

function FacultyForm({modalData, onClose}) {
  
  const { t } = useTranslation();
  const [ form, setForm ] = useState(modalData?.data || {
    nameEn: '',
    nameLv: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = () => {
    if (modalData.action === SystemConstant.ACTION.EDIT) {
      FacultyService.update(modalData.data.id, form).then(
        () => {
          toast.success(t('MSG_UPDATE_DONE'));
          onClose(true);
        },
        (error) => console.error(error)
      )
    } else {
      FacultyService.create(form).then(
        () => {
          toast.success(t('MSG_CREATE_DONE'));
          onClose(true);
        },
        (error) => console.error(error)
      )
    }
  }
  return (
    <>
      <CModalHeader>
        <CModalTitle>{modalData.title}</CModalTitle>
      </CModalHeader>
      <CForm>
        <CFormInput name="nameEn" onChange={handleChange} label={t('FACULTY_NAME_EN')} value={form.nameEn}/>
        <CFormInput name="nameLv" onChange={handleChange} label={t('FACULTY_NAME_LV')} value={form.nameLv}/>
      </CForm>
      <CModalFooter>
        <CButton onClick={() => onClose()}>{t('CANCEL')}</CButton>
        <CButton onClick={onSubmit}>{t('CONFIRM')}</CButton>
      </CModalFooter>
    </>
  )
}

export default FacultyForm