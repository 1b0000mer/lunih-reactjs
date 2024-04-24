import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilSettings,
  cilInstitution,
  cilBook,
  cilSitemap,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/management/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon text-primary" />,
  },
  {
    component: CNavTitle,
    name: 'Core',
  },
  {
    component: CNavGroup,
    name: 'Categories',
    to: '/management/categories',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon text-primary" />,
    items: [
      {
        component: CNavItem,
        name: 'Faculty',
        to: '/management/categories/faculty',
        icon: <CIcon icon={cilInstitution} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'Program',
        to: '/management/categories/program',
        icon: <CIcon icon={cilBook} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'Industry',
        to: '/management/categories/industry',
        icon: <CIcon icon={cilSitemap} customClassName="nav-icon text-primary" />
      },
    ]
  }
]

export default nav;
