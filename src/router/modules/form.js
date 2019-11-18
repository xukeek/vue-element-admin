/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const workflowRouter = {
  path: '/form',
  component: Layout,
  redirect: '/form/list',
  alwaysShow: true, // will always show the root menu
  name: 'form',
  meta: {
    title: '表单管理',
    icon: 'lock',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/form/index'),
      name: 'FormList',
      meta: {
        title: '表单管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      hidden: true,
      path: 'create',
      component: () => import('@/views/form/create'),
      name: 'FormCreate',
      meta: {
        roles: ['admin'],
        title: '新建表单',
        noCache: true,
        breadcrumb: false
      }
    },
    {
      hidden: true,
      path: 'edit/:id(\d+)',
      component: () => import('@/views/form/edit'),
      name: 'FormEdit',
      meta: {
        roles: ['admin'],
        title: '编辑表单',
        icon: 'svg-name',
        breadcrumb: false
      }
    }
  ]
}

export default workflowRouter
