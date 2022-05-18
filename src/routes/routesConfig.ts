import React from 'react'
import Login from '@/pages/login'

const routes = [
    {
      pathname: 'login',
      component: Login,
    },
    {
      pathname: 'main/*',
      component: Login,
    },
]
export default routes