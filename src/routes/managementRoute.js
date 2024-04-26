import React from "react";

const Dashboard = React.lazy(() => import('../views/management/Dashboard'));
const FacultyList = React.lazy(() => import('../views/management/faculty/FacultyList'));
const ProgramList = React.lazy(() => import('../views/management/program/ProgramList'));

const managementRoutes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories/faculty', name: 'Faculty', element: FacultyList },
  { path: '/categories/program', name: 'Program', element: ProgramList },
];

export default managementRoutes;