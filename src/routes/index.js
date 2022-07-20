import { lazy } from 'react'

const routes = [
  {
    path: 'simple-form-list',
    component: lazy(() => import('../examples/simple-form-list'))
  },
  {
    path: 'nested-form-list',
    component: lazy(() => import('../examples/nested-form-list'))
  },
  {
    path: 'table-form-list',
    component: lazy(() => import('../examples/table-form-list'))
  }
]

export default routes