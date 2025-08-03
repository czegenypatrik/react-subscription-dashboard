import React from 'react'
// Main
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//Pages
const Sample1 = React.lazy(() => import('./views/pages/Sample1'))
const Subscriptions = React.lazy(() => import('./views/Subscriptions'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/sample01', name: 'Sample', element: Sample1 },
  { path: '/subscriptions', name: 'Subscriptions', element: Subscriptions }
]

export default routes
