/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const taskRouter = {
  path: '/task',
  component: Layout,
  redirect: '/task/start',
  alwaysShow: true, // will always show the root menu
  name: 'task',
  meta: {
    title: '我的事务',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'start',
      component: () => import('@/views/task/start'),
      name: 'TaskStart',
      meta: {
        title: '发起事务',
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'claim',
      component: () => import('@/views/task/claim'),
      name: 'TaskClaim',
      meta: {
        title: '待签事务',
        roles: ['admin', 'editor']
      }
    },
    {
      path: 'todo',
      component: () => import('@/views/task/todo'),
      name: 'TaskTodo',
      meta: {
        title: '待办事务',
        roles: ['admin']
      }
    }
  ]
}

export default taskRouter
