import { cilChevronDoubleLeft, cilChevronDoubleRight, cilChevronLeft, cilChevronRight } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CForm, CPagination, CPaginationItem, CCol, CFormSelect } from "@coreui/react"

const AppPaginate = ({pageConfig, onPageChange}) => {
  
  const setPage = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= pageConfig.totalPage &&
      pageNumber !== pageConfig.currentPage
    ) {
      pageConfig.currentPage = pageNumber;
      onPageChange(pageConfig);
    }
  }

  const changedNumOfItem = (event) => {
    let numOfItem = event.target.value;
    pageConfig.limit = Number.parseInt(numOfItem, 10);
    pageConfig.currentPage = 1;
    onPageChange(pageConfig);
  }
  
  return (
    <CForm className="row g-3">
      <CCol xs="auto">
        <CPagination align="center" aria-label="Page navigation example">
          <CPaginationItem onClick={() => setPage(1)} disabled={pageConfig.currentPage === 1}><CIcon icon={cilChevronDoubleLeft}/></CPaginationItem>
          <CPaginationItem onClick={() => setPage(pageConfig.currentPage - 1)} disabled={pageConfig.currentPage === 1}><CIcon icon={cilChevronLeft}/></CPaginationItem>
          {
            Array.from({ length: pageConfig.totalPage }, (_, index) => (
              <CPaginationItem onClick={() => setPage(index + 1)} key={index} active={index + 1 === pageConfig.currentPage}>
                {index + 1}
              </CPaginationItem>
            ))
          }
          <CPaginationItem onClick={() => setPage(pageConfig.currentPage + 1)} disabled={pageConfig.currentPage === pageConfig.totalPage}><CIcon icon={cilChevronRight}/></CPaginationItem>
          <CPaginationItem onClick={() => setPage(pageConfig.totalPage)} disabled={pageConfig.currentPage === pageConfig.totalPage}><CIcon icon={cilChevronDoubleRight}/></CPaginationItem>
        </CPagination>
      </CCol>
      <CCol xs="auto">
        <CFormSelect
          defaultValue={pageConfig.limit}
          onChange={changedNumOfItem}
          aria-label="paginate number list">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </CFormSelect>
      </CCol>
    </CForm>

  )
}

export default AppPaginate