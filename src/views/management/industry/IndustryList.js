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

import IndustryService from '../../../core/services/management/industry.service.ts';

import IndustryForm from './IndustryForm.js';
import AppPaginate from '../../../components/AppPaginate.js';
import Paginate from '../../../core/models/paginate.model.ts';

import ModalData from '../../../core/models/common/modal-data.model.ts';
import SystemConstant from '../../../core/constants/system.constant.ts';
function IndustryList() {
  const { t } = useTranslation();
  const [ listIndustry, setListIndustry ] = useState(new Paginate());
  const [ searchValue, setSearchValue ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ modalData, setModalData ] = useState(new ModalData());
  
  useEffect(() => {
    getDataPaging();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDataPaging = (isSearch) => {
    if (isSearch) {
      setListIndustry(prevState => ({
        ...prevState,
        currentPage: 1
      }))
    }
    IndustryService.getAllPaging(
      listIndustry.currentPage - 1,
      listIndustry.limit,
      searchValue
    ).then(res => {
      let response = res.data;
      setListIndustry(prevState => ({
        ...prevState,
        currentPage: response.pageable.pageNumber + 1,
        limit: response.pageable.pageSize,
        totalPage: response.totalPages,
        totalItem: response.totalElements,
        data: response.content,
      }))
    })
  }

  const pageChange = (page) => {
    setListIndustry(page);
    getDataPaging();
  }

  const doSearch = () => {
    getDataPaging(searchValue);
  }

  const changeStatus = (id) => {
    if (window.confirm(t('CONFIRM_CHANGE_STATUS'))) {
      IndustryService.changeStatus(id).then(
        () => {
          toast.success(t('MSG_CHANGE_DONE'));
          getDataPaging();
        })
      }
  }

  const deleteFaculty = (id) => {
    if (window.confirm(t('CONFIRM_DELETE'))) {
      IndustryService.delete(id).then(
        () => {
          toast.success(t('MSG_UPDATE_DONE'));
          getDataPaging();
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
      setListIndustry(prevState => ({
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
      label: t('INDUSTRY_NAME_EN'),
      _props: { scope: 'col' }
    },
    {
      key: 'nameLv',
      label: t('INDUSTRY_NAME_LV'),
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
            {listIndustry.data.map((industry) => {
              return (
                <CTableRow key={industry.id}>
                  <CTableHeaderCell scope='row'>{industry.id}</CTableHeaderCell>
                  <CTableDataCell>{industry.nameEn}</CTableDataCell>
                  <CTableDataCell>{industry.nameLv}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {
                      industry.status
                      ? <CBadge onClick={() => changeStatus(industry.id)} color="success" className="pe-on">{t('ACTIVE')}</CBadge> 
                      : <CBadge onClick={() => changeStatus(industry.id)} color="danger" className="pe-on">{t('INACTIVE')}</CBadge>
                    }
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton onClick={() => onOpenModal(industry)} color="primary" size="sm" shape="rounded-pill">
                      <CIcon icon={cilPencil}/>
                    </CButton>
                    <div className="vr h-100 mx-2 text-body"></div>
                    <CButton onClick={() => deleteFaculty(industry.id)} color="danger" size="sm" shape="rounded-pill">
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
        <AppPaginate pageConfig={listIndustry} onPageChange={pageChange} />
      </CCardFooter>
      <CModal visible={showModal} onClose={onCloseModal}>
        <CModalBody>
          <IndustryForm modalData={modalData} onClose={onCloseModal}/>
        </CModalBody>
      </CModal>
    </CCard>
  )
}

export default IndustryList