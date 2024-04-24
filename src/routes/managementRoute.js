import React from "react";

const Dashboard = React.lazy(() => import('../views/management/Dashboard'));
const Faculty = React.lazy(() => import('../views/management/Faculty'));

const managementRoutes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories/faculty', name: 'Faculty', element: Faculty },
];

export default managementRoutes;