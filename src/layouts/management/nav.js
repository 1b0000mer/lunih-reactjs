import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSettings,
  cilInstitution,
  cilBook,
  cilSitemap,
  cilSpeedometer,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const nav = [
  {
    component: CNavItem,
    name: "DASHBOARD",
    to: '/management/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon text-primary" />,
  },
  {
    component: CNavTitle,
    name: 'CORE',
  },
  {
    component: CNavGroup,
    name: "CATEGORIES",
    to: '/management/categories',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon text-primary" />,
    items: [
      {
        component: CNavItem,
        name: "FACULTY",
        to: '/management/categories/faculty',
        icon: <CIcon icon={cilInstitution} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'PROGRAM',
        to: '/management/categories/program',
        icon: <CIcon icon={cilBook} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'INDUSTRY',
        to: '/management/categories/industry',
        icon: <CIcon icon={cilSitemap} customClassName="nav-icon text-primary" />
      },
    ]
  }
]

export default nav;
