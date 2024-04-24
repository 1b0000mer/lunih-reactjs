import React from "react";

const Home = React.lazy(() => import('../views/Home'));
const About = React.lazy(() => import('../views/About'));
const Login = React.lazy(() => import('../views/Login'));

const mainRoutes = [
  { path: '/home', element: Home },
  { path: '/about', element: About },
  { path: '/Login', element: Login },
];

export default mainRoutes;