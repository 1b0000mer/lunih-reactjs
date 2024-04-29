import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilGrid,
  cilInstitution,
  cilBook,
  cilSitemap,
  cilSpeedometer,
  cilUser,
  cilFactory,
  cilGroup,
  cilEducation,
  cilCheck,
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
    icon: <CIcon icon={cilGrid} customClassName="nav-icon text-primary" />,
    items: [
      {
        component: CNavItem,
        name: "FACULTY",
        to: '/management/categories/faculty',
        icon: <CIcon icon={cilInstitution} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'INDUSTRY',
        to: '/management/categories/industry',
        icon: <CIcon icon={cilSitemap} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'PROGRAM',
        to: '/management/categories/program',
        icon: <CIcon icon={cilBook} customClassName="nav-icon text-primary" />
      },
    ]
  },
  {
    component: CNavGroup,
    name: "USER_ACCOUNT",
    to: '/management/users',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon text-primary" />,
    items: [
      {
        component: CNavItem,
        name: "STUDENT",
        to: '/management/users/student',
        icon: <CIcon icon={cilEducation} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'UNIVERSITY',
        to: '/management/users/university',
        icon: <CIcon icon={cilInstitution} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'COMPANY',
        to: '/management/users/company',
        icon: <CIcon icon={cilFactory} customClassName="nav-icon text-primary" />
      },
      {
        component: CNavItem,
        name: 'ADMIN',
        to: '/management/users/administrator',
        icon: <CIcon icon={cilUser} customClassName="nav-icon text-primary" />
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'FUNCTIONS',
  },
  {
    component: CNavItem,
    name: "APPROVE_STUDENT",
    to: '/management/users/student/approve',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon text-primary" />,
  },
]

export default nav;
