import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import chartsRouter from './modules/charts'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: '权限测试页',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: '页面权限',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: '指令权限'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },
  { path: '/goods',
    component: Layout,
    meta: {
      icon: 'shopping',
      title: '商品管理',
      roles: ['admin']
    },
    children: [
      {
        path: 'goodsList',
        component: () => import('@/views/goods/goodsList'),
        name: 'goodsList',
        meta: { title: '商品列表', noCache: true, icon: 'list' }
      },
      {
        path: 'goodsClass',
        component: () => import('@/views/goods/goodsClass'),
        name: 'goodsClass',
        meta: { title: '商品分类', noCache: true, icon: 'nested' }
      }
    ]
  },
  { path: '/order',
    component: Layout,
    meta: {
      icon: 'component'
    },
    children: [
      {
        path: 'mix-order',
        component: () => import('@/views/order/index'),
        name: 'Order',
        meta: { title: '订单管理', noCache: true }
      }
    ]
  },
  { path: '/user',
    component: Layout,
    meta: {
      icon: 'user',
      roles: ['admin']

    },
    children: [
      {
        path: 'mix-user',
        component: () => import('@/views/user/index'),
        name: 'User',
        meta: { title: '账号管理', noCache: true }
      }
    ]
  },
  { path: '/shop',
    component: Layout,
    meta: {
      icon: 'tree-table',
      roles: ['admin']

    },
    children: [
      {
        path: 'mix-user',
        component: () => import('@/views/shop/index'),
        name: 'Shop',
        meta: { title: '店铺管理', noCache: true }
      }
    ]
  },

  chartsRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
