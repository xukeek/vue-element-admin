/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const workflowRouter = {
  path: '/workflow',
  component: Layout,
  redirect: '/workflow/model',
  alwaysShow: true, // will always show the root menu
  name: 'workflow',
  meta: {
    title: '流程管理',
    icon: 'lock',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'model',
      component: () => import('@/views/workflow/model'),
      name: 'WorkflowModel',
      meta: {
        title: '模型管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      hidden: true,
      path: 'create',
      component: () => import('@/views/workflow/create'),
      name: 'WorkflowCreate',
      meta: {
        roles: ['admin'],
        title: '新建流程',
        noCache: true,
        breadcrumb: false
      }
    },
    {
      hidden: true,
      path: 'edit/:id(\d+)',
      component: () => import('@/views/workflow/edit'),
      name: 'WorkflowEdit',
      meta: {
        roles: ['admin'],
        title: '编辑流程',
        icon: 'svg-name',
        breadcrumb: false
      }
    },
    {
      path: 'deploy',
      component: () => import('@/views/workflow/deploy'),
      name: 'WorkflowDeploy',
      meta: {
        title: '流程部署',
        roles: ['admin']
      }
    },
    {
      path: 'manager',
      component: () => import('@/views/workflow/manager'),
      name: 'WorkflowManager',
      meta: {
        title: '流程管理',
        roles: ['admin']
      }
    },
    {
      path: 'follow',
      component: () => import('@/views/workflow/follow'),
      name: 'WorkflowFollow',
      meta: {
        title: '流程跟踪',
        roles: ['admin']
      }
    }
  ]
}

export default workflowRouter
