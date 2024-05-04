import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { CButton, CCard, CCollapse, CForm, CFormCheck, CFormInput, CFormSelect, CModalFooter, CModalHeader, CModalTitle, CSpinner, CTable, CTableDataCell, CTableRow, CRow, CCardHeader, CInputGroup, CCardBody, CTableHead, CTableHeaderCell, CTableBody, CCardFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { toast } from 'sonner';

import SystemConstant from '../../../core/constants/system.constant.ts';
import ProgramService from '../../../core/services/management/program.service.ts';
import FacultyService from '../../../core/services/management/faculty.service.ts';
import IndustryService from '../../../core/services/management/industry.service.ts';

function ProgramForm({modalData, onClose}) {
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng');
  const [ form, setForm ] = useState(modalData?.data || {
    nameEn: '',
    nameLv: '',
    studyLevel: 'LEVEL_BACHELOR',
    facultyID: '',
    industryList: []
  });
  const [ listFaculty, setListFaculty ] = useState([]);
  const [ listIndustry, setListIndustry ] = useState([]);
  const [searchValue, setSerchValue] = useState('');

  const handleCheckboxChange = (value) => {
    if (form.industryList.includes(value)) {
      setForm(prevState => ({
        ...prevState,
        industryList: form.industryList.filter(name => name !== value)
      }));
    } else {
      setForm(prevState => ({
        ...prevState,
        industryList: [...form.industryList, value]
      }));
    }
  };

  const [ loading, setLoading ] = useState(false);
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchFacultyList();
    fetchIndustryList();
    // eslint-disable-next-line
  }, []) 

  const fetchFacultyList = () => {
    FacultyService.getAll().then(
      (res) => {
        setListFaculty(res.data)
        setForm((prevState) => ({
          ...prevState,
          facultyID: res.data[0].id
        }));
      }
    )
  }
  
  const fetchIndustryList = () => {
    IndustryService.getAllPaging(0, 5, searchValue).then(
      (res) => {
        setListIndustry(res.data.content)
      }
    )
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };  

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formValidate = event.currentTarget;

    if (formValidate.checkValidity() === false) {
      setValidated(true)
      setLoading(false)
    } else {
      if (modalData.action === SystemConstant.ACTION.EDIT) {
        ProgramService.update(modalData.data.id, form).then(
          () => {
            toast.success(t('MSG_UPDATE_DONE'));
            setLoading(false);
            onClose(true);
          },
          () => setLoading(false)
        )
      } else {
        ProgramService.create(form).then(
          () => {
            toast.success(t('MSG_CREATE_DONE'));
            setLoading(false);
            onClose(true);
          },
          () => setLoading(false)
        )
      }
    }
    
  }
  return (
    <>
      <CModalHeader>
        <CModalTitle>{modalData.title}</CModalTitle>
      </CModalHeader>
      <CForm
        className="modal-body"
        noValidate
        validated={validated}
        onSubmit={onSubmit}
      >
        <div className="mb-3">
          <CFormInput
            name="nameEn"
            onChange={handleChange}
            label={t("PROGRAM_NAME_EN")}
            value={form.nameEn}
            required
            feedbackInvalid={t("CAN_NOT_BE_EMPTY")}
          />
        </div>

        <div className="mb-3">
          <CFormInput
            name="nameLv"
            onChange={handleChange}
            label={t("PROGRAM_NAME_LV")}
            value={form.nameLv}
            required
            feedbackInvalid={t("CAN_NOT_BE_EMPTY")}
          />
        </div>

        <div className="mb-3">
          <CFormSelect
            onChange={handleChange}
            name="studyLevel"
            label={t("CHOOSE_STUDY_LEVEL")}
            defaultValue={form.studyLevel}
            required
            feedbackInvalid={t("CAN_NOT_BE_EMPTY")}
          >
            <option value="LEVEL_BACHELOR">{t("BACHELOR")}</option>
            <option value="LEVEL_MASTER">{t("MASTER")}</option>
            <option value="LEVEL_DOCTORAL">{t("DOCTORAL")}</option>
          </CFormSelect>
        </div>

        <div className="mb-3">
          <CFormSelect
            onChange={handleChange}
            name="facultyID"
            label={t("CHOOSE_FACULTY")}
            defaultValue={form.facultyID}
            required
            feedbackInvalid={t("CAN_NOT_BE_EMPTY")}
          >
            {listFaculty.map((faculty) => {
              return (
                <option key={faculty.id} value={faculty.id}>
                  {lang === "en" ? faculty.nameEn : faculty.nameLv}
                </option>
              );
            })}
          </CFormSelect>
        </div>

        <div className="mb-3 d-grid">
          <CButton
            variant="outline"
            color="info"
            onClick={() => setVisible(!visible)}
          >
            {t("CHOOSE_INDUSTRY")}
          </CButton>
          <CCollapse visible={visible}>
            <CCard className="mt-3">
              <CCardHeader>
                <CRow>
                  <CInputGroup>
                    <CFormInput
                      onChange={(event) => {setSerchValue(event.target.value)}}
                      value={searchValue}
                      placeholder={t("SEARCH")}
                      aria-label="Search field"
                      aria-describedby="btnSearch"
                    />
                    <CButton
                      onClick={fetchIndustryList}
                      type="button"
                      color="secondary"
                      variant="outline"
                      id="btnSearch"
                    >
                      <CIcon icon={cilMagnifyingGlass} />
                    </CButton>
                  </CInputGroup>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">
                        {lang === "en"
                          ? t("INDUSTRY_NAME_EN")
                          : t("INDUSTRY_NAME_LV")}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {
                        listIndustry.map((industry, idx) => {
                          return (
                            <CTableRow key={idx}>
                              <CTableDataCell>
                                <CFormCheck 
                                  value={industry.id} 
                                  label={lang === 'en' ? industry.nameEn : industry.nameLv}
                                  checked={form.industryList.includes(industry.id)}
                                  onChange={() => handleCheckboxChange(industry.id)} />
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                      }
                  </CTableBody>
                </CTable>
                  {/* <CFormCheck
                    id="lucas"
                    value="Lucas"
                    label="Lucas"
                    checked={checkedNames.includes('Lucas')}
                    onChange={() => handleCheckboxChange('Lucas')}
                  />
                  <CFormCheck
                    id="andrew"
                    value="Andrew"
                    label="Andrew"
                    checked={checkedNames.includes('Andrew')}
                    onChange={() => handleCheckboxChange('Andrew')}
                  />
                  <CFormCheck
                    id="anna"
                    value="Anna"
                    label="Anna"
                    checked={checkedNames.includes('Anna')}
                    onChange={() => handleCheckboxChange('Anna')}
                  />
                  <div>Checked names: {JSON.stringify(checkedNames)}</div> */}
              </CCardBody>
              <CCardFooter>
                <div>Checked names: {JSON.stringify(form.industryList)}</div>
              </CCardFooter>
            </CCard>
          </CCollapse>
        </div>

        <CModalFooter>
          <CButton color="secondary" onClick={() => onClose()}>
            {t("CANCEL")}
          </CButton>
          <CButton disabled={loading} color="primary" type="submit">
            <CSpinner
              className="me-2"
              as="span"
              size="sm"
              role="status"
              hidden={!loading}
            />
            {t("CONFIRM")}
          </CButton>
        </CModalFooter>
      </CForm>
    </>
  );
}

export default ProgramForm