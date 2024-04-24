import { NavLink } from "react-router-dom"
import { useState } from "react"
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem } from "@coreui/react"

function MainHeader() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CNavbar expand="lg" className="bg-body-tertiary">
        <CContainer className="px-4" fluid>
          <CNavbarBrand href="../">LUNIH</CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="d-none d-md-flex">
              <CNavItem>
                <NavLink className="nav-link" to="/home">Home</NavLink>
              </CNavItem>
              <CNavItem>
                <NavLink className="nav-link" to="/about">About</NavLink>
              </CNavItem>
              <CNavItem>
                <NavLink className="nav-link" to="/management">Tempolary Management</NavLink>
              </CNavItem>
            </CNavbarNav>
            <CNavbarNav className="ms-auto">
              <CNavItem>
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}

export default MainHeader