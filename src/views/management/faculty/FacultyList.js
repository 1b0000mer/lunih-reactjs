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

import FacultyService from '../../../core/services/management/faculty.service.ts';

import FacultyForm from './FacultyForm.js';
import AppPaginate from '../../../components/AppPaginate.js';
import Paginate from '../../../core/models/paginate.model.ts';

import ModalData from '../../../core/models/common/modal-data.model.ts';
import SystemConstant from '../../../core/constants/system.constant.ts';
function FacultyList() {
  const { t } = useTranslation();
  const [ listFaculty, setListFaculty ] = useState(new Paginate());
  const [ searchValue, setSearchValue ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ modalData, setModalData ] = useState(new ModalData());
  
  useEffect(() => {
    getDataPaging();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDataPaging = (isSearch) => {
    if (isSearch) listFaculty.currentPage = 1
    FacultyService.getAllPaging(
      listFaculty.currentPage - 1,
      listFaculty.limit,
      searchValue
    ).then(res => {
      let response = res.data;
      setListFaculty(prevState => ({
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
    setListFaculty(page);
    getDataPaging();
  }

  const doSearch = () => {
    getDataPaging(searchValue);
  }

  const changeStatus = (id) => {
    if (window.confirm(t('CONFIRM_CHANGE_STATUS'))) {
      FacultyService.changeStatus(id).then(
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
      FacultyService.delete(id).then(
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
        data: data
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
      setListFaculty(prevState => ({
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
      key: 'nameEn',
      label: t('FACULTY_NAME_EN'),
      _props: { scope: 'col' }
    },
    {
      key: 'nameLv',
      label: t('FACULTY_NAME_LV'),
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
            {listFaculty.data.map((faculty) => {
              return (
                <CTableRow key={faculty.id}>
                  <CTableHeaderCell scope='row'>{faculty.id}</CTableHeaderCell>
                  <CTableDataCell>{faculty.nameEn}</CTableDataCell>
                  <CTableDataCell>{faculty.nameLv}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {
                      faculty.status
                      ? <CBadge onClick={() => changeStatus(faculty.id)} color="success" className="pe-on">{t('ACTIVE')}</CBadge> 
                      : <CBadge onClick={() => changeStatus(faculty.id)} color="danger" className="pe-on">{t('INACTIVE')}</CBadge>
                    }
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton onClick={() => onOpenModal(faculty)} color="primary" size="sm" shape="rounded-pill">
                      <CIcon icon={cilPencil}/>
                    </CButton>
                    <div className="vr h-100 mx-2 text-body"></div>
                    <CButton onClick={() => deleteFaculty(faculty.id)} color="danger" size="sm" shape="rounded-pill">
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
        <AppPaginate pageConfig={listFaculty} onPageChange={pageChange} />
      </CCardFooter>
      <CModal visible={showModal} onClose={onCloseModal}>
        <CModalBody>
          <FacultyForm modalData={modalData} onClose={onCloseModal}/>
        </CModalBody>
      </CModal>
    </CCard>
  )
}

export default FacultyList