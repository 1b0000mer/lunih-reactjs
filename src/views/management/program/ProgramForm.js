import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { CButton, CForm, CFormInput, CFormSelect, CModalFooter, CModalHeader, CModalTitle, CSpinner } from '@coreui/react';
import { toast } from 'sonner';

import SystemConstant from '../../../core/constants/system.constant.ts';
import ProgramService from '../../../core/services/management/program.service.ts';
import FacultyService from '../../../core/services/management/faculty.service.ts';

function ProgramForm({modalData, onClose}) {
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng');
  const [ form, setForm ] = useState(modalData?.data || {
    nameEn: '',
    nameLv: '',
    studyLevel: '',
    facultyID: '',
    industryList: []
  });
  const [ listFaculty, setListFaculty ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    FacultyService.getAll().then(
      (res) => {
        setListFaculty(res.data);
      },
      (error) => console.error(error)
    )
  }, [form])
  
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
      ProgramService.update(modalData.data.id, form).then(
        () => {
          toast.success(t('MSG_UPDATE_DONE'));
          setLoading(false);
          onClose(true);
        },
        (error) => console.error(error)
      )
    } else {
      ProgramService.create(form).then(
        () => {
          toast.success(t('MSG_CREATE_DONE'));
          setLoading(false);
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
      <CForm className="modal-body">
        <CFormInput name="nameEn" onChange={handleChange} label={t('PROGRAM_NAME_EN')} value={form.nameEn}/>
        <CFormInput name="nameLv" onChange={handleChange} label={t('PROGRAM_NAME_LV')} value={form.nameLv}/>
        <CFormSelect onChange={handleChange} name="studyLevel" label={t('CHOOSE_STUDY_LEVEL')} defaultValue={form.studyLevel}>
          <option value='LEVEL_BACHELOR'>{t('BACHELOR')}</option>
          <option value='LEVEL_MASTER'>{t('MASTER')}</option>
          <option value='LEVEL_DOCTORAL'>{t('DOCTORAL')}</option>
        </CFormSelect>
        <CFormSelect onChange={handleChange} name="facultyID" label={t('CHOOSE_FACULTY')} defaultValue={form.facultyID}>
          {listFaculty.map(faculty => {
            return (
              <option key={faculty.id} value={faculty.id}>{lang === 'en' ? faculty.nameEn : faculty.nameLv}</option>
            )
          })}
        </CFormSelect>
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

export default ProgramForm