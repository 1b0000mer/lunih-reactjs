import React from "react";

const Dashboard = React.lazy(() => import('../views/management/Dashboard'));
const FacultyList = React.lazy(() => import('../views/management/faculty/FacultyList'));

const managementRoutes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories/faculty', name: 'Faculty', element: FacultyList },
];

export default managementRoutes;