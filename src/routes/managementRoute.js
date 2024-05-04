import React from "react";

const Dashboard = React.lazy(() => import('../views/management/Dashboard'));
const FacultyList = React.lazy(() => import('../views/management/faculty/FacultyList'));
const ProgramList = React.lazy(() => import('../views/management/program/ProgramList'));
const IndustryList = React.lazy(() => import('../views/management/industry/IndustryList'));

// const StudentList = React.lazy(() => import('../views/management/student/StudentList'));
// const UniversityList = React.lazy(() => import('../views/management/university/UniversityList'));
// const CompanyList = React.lazy(() => import('../views/management/company/CompanyList'));
// const AdminList = React.lazy(() => import('../views/management/adminitrator/AdminList'));
const managementRoutes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories/faculty', name: 'Faculty', element: FacultyList },
  { path: '/categories/program', name: 'Program', element: ProgramList },
  { path: '/categories/industry', name: 'Industry', element: IndustryList },
  
  // { path: '/users/student', name: 'Student', element: StudentList },
  // { path: '/users/university', name: 'University', element: UniversityList },
  // { path: '/users/company', name: 'Company', element: CompanyList },
  // { path: '/users/administrator', name: 'Administrator', element: AdminList },
];

export default managementRoutes;