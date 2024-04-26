import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { CTable, CCard, CRow, CCol, CButton, CCardFooter, CCardBody, CInputGroup, CFormInput, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CBadge, CCardHeader, CModal, CModalBody } from '@coreui/react'
import { toast } from 'sonner';

import CIcon from '@coreui/icons-react';
import {
  cilPencil,
  cilPlus,
  cilTrash
} from '@coreui/icons';

import ProgramService from '../../../core/services/management/program.service.ts';

import ProgramForm from './ProgramForm.js';
import AppPaginate from '../../../components/AppPaginate.js';
import Paginate from '../../../core/models/paginate.model.ts';

import ModalData from '../../../core/models/common/modal-data.model.ts';
import SystemConstant from '../../../core/constants/system.constant.ts';
function ProgramList() {
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng');
  const [ listProgram, setListProgram ] = useState(new Paginate());
  const [ searchValue, setSearchValue ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ modalData, setModalData ] = useState(new ModalData());
  
  useEffect(() => {
    getDataPaging();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDataPaging = (isSearch) => {
    if (isSearch) {
      setListProgram(prevState => ({
        ...prevState,
        currentPage: 1
      }))
    }
    ProgramService.getAllPaging(
      listProgram.currentPage - 1,
      listProgram.limit,
      searchValue
    ).then(res => {
      let response = res.data;
      setListProgram(prevState => ({
        ...prevState,
        currentPage: response.pageable.pageNumber + 1,
        limit: response.pageable.pageSize,
        totalPage: response.totalPages,
        totalItem: response.totalElements,
        data: response.content,
      }))
    }, (error) => {
      toast.error(error.message);
    })
  }

  const pageChange = (page) => {
    setListProgram(page);
    getDataPaging();
  }

  const doSearch = () => {
    getDataPaging(searchValue);
  }

  const changeStatus = (id) => {
    if (window.confirm(t('CONFIRM_CHANGE_STATUS'))) {
      ProgramService.changeStatus(id).then(
        () => {
          toast.success(t('MSG_CHANGE_DONE'));
          getDataPaging();
        },
        (error) => {
          console.error(error)
        })
      }
  }

  const deleteFaculty = (id) => {
    if (window.confirm(t('CONFIRM_DELETE'))) {
      ProgramService.delete(id).then(
        () => {
          toast.success(t('MSG_UPDATE_DONE'));
          getDataPaging();
        },
        (error) => {
          console.error(error)
        })
    }
  }

  const onOpenModal = (data) => {
    if (data) {
      setModalData({
        title: t('EDIT_TITLE'),
        action: SystemConstant.ACTION.EDIT,
        data: {
          id: data.id,
          nameEn: data.nameEn,
          nameLv: data.nameLv,
          studyLevel: data.studyLevel,
          facultyID: data.faculty.id,
          industryList: data.industryList
        }
      });
    } else {
      setModalData({
        title: t('ADD_TITLE'),
        action: SystemConstant.ACTION.ADD,
      });
    }
    setShowModal(true);
  }

  const onCloseModal = (isRefresh) => {
    if (isRefresh) {
      setListProgram(prevState => ({
        ...prevState,
        currentPage: 1
      }));
      getDataPaging();
    }
    setShowModal(false);
  }

  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' }
    },
    {
      key: 'name',
      label: t('PROGRAM_NAME'),
      _props: { scope: 'col' }
    },
    {
      key: 'studyLevel',
      label: t('STUDY_LEVEL'),
      _props: { scope: 'col' }
    },
    {
      key: 'faculty',
      label: t('FACULTY_NAME'),
      _props: { scope: 'col' }
    },
    {
      key: 'industryList',
      label: t('INDUSTRY_NAME'),
      _props: { scope: 'col' }
    },
    {
      key: 'status',
      label: t('STATUS'),
      _props: { scope: 'col', className: 'text-center' }
    },
    {
      key: 'actions',
      label: t('ACTIONS'),
      _props: { scope: 'col', className: 'text-center' }
    }
  ]
  
  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm={5}>
            <CInputGroup>
              <CFormInput
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}  
                onKeyDown={event => event.key === 'Enter' && doSearch()}
                placeholder={t('SEARCH')}
                aria-label="Search field"
                aria-describedby="btnSearch"
              />
              <CButton type="button" color="secondary" variant="outline" id="btnSearch" onClick={() => doSearch()}>{t('SEARCH_BTN')}</CButton>
            </CInputGroup>
          </CCol>
          <CCol sm={7} className="d-none d-md-block">
            <CButton onClick={() => onOpenModal()} color="primary" className="float-end">
              <CIcon icon={cilPlus} /> {t('ADD')}
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CTable columns={columns}>
          <CTableBody>
            {listProgram.data.map((program) => {
              return (
                <CTableRow key={program.id}>
                  <CTableHeaderCell scope='row'>{program.id}</CTableHeaderCell>
                  <CTableDataCell>{
                    lang === 'en' 
                    ? program.nameEn 
                    : program.nameLv
                  }</CTableDataCell>
                  <CTableDataCell>{program.studyLevel}</CTableDataCell>
                  <CTableDataCell>{
                  lang === 'en' 
                  ? program.faculty.nameEn 
                  : program.faculty.nameLv
                  }</CTableDataCell>
                  <CTableDataCell>{
                    program.industryList.map((industry) => (
                      <CBadge className="me-1" color="info" key={industry.id}>{lang === 'en' ? industry.nameEn : industry.nameLv}</CBadge>
                    ))
                  }</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {
                      program.status
                      ? <CBadge onClick={() => changeStatus(program.id)} color="success" className="pe-on">{t('ACTIVE')}</CBadge> 
                      : <CBadge onClick={() => changeStatus(program.id)} color="danger" className="pe-on">{t('INACTIVE')}</CBadge>
                    }
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton onClick={() => onOpenModal(program)} color="primary" size="sm" shape="rounded-pill">
                      <CIcon icon={cilPencil}/>
                    </CButton>
                    <div className="vr h-100 mx-2 text-body"></div>
                    <CButton onClick={() => deleteFaculty(program.id)} color="danger" size="sm" shape="rounded-pill">
                      <CIcon icon={cilTrash}/>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCardBody>
      <CCardFooter>
        <AppPaginate pageConfig={listProgram} onPageChange={pageChange} />
      </CCardFooter>
      <CModal visible={showModal} onClose={onCloseModal}>
        <CModalBody>
          <ProgramForm modalData={modalData} onClose={onCloseModal}/>
        </CModalBody>
      </CModal>
    </CCard>
  )
}

export default ProgramList