import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useLoginStore } from '../stores/login';

// import memberData from '../utils/MemberData'
// import adminData from '../utils/AdminData'
// https://juejin.cn/post/7088926744278728740




let modules = import.meta.glob('../**/*.vue')
let routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component:()=> import('../views/404.vue')
  // },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
})


router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('守衛');
  const storLogin = useLoginStore();
  let nowPath = JSON.parse(localStorage.getItem('user'));
  let isLogin = JSON.parse(localStorage.getItem('login'));
  let nav = JSON.parse(localStorage.getItem('nav'))
  // console.log(isLogin, 'waef');
  // console.log(nav, 'nav');
  //已登錄無法回到首頁 除非登出
  if (to.path === '/login') {
    console.log(123);
    if (isLogin === 0 || isLogin === 1) {
      router.push('/home_index')
    }
  }
  // 判斷使用者為：會員
  if (isLogin === 0) {
    console.log('會員');
    const memberData = nav
    if (to.matched.length === 0) {
      router.push(to.path);
    } else if (to.matched.length === 0) {
      next(nowPath);
    }
    //首頁拼接
    memberData.forEach((value) => {
      const routesData = {
        path: value.path,
        name: value.name,
        component: modules['../views/' + value.component + '.vue'],
      }
      router.addRoute(routesData)
      //console.log(router.getRoutes());
    })
    memberData[0].children.forEach((value) => {
      //console.log(value);
      router.addRoute('Home_index', {
        path: value.path,
        name: value.name,
        component: modules['../views/' + value.component + '.vue'],
      })
    })
    router.addRoute(
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/404.vue')
      })
    console.log(router.getRoutes());
    window.localStorage.setItem('path', JSON.stringify(to.path));
    next();
  }
  // 判斷使用者為：管理
  else if (isLogin === 1) {
    console.log('管理');
    const adminData = nav
    //console.log(adminData);
    if (to.matched.length === 0) {
      router.push(to.path);
    } else if (to.matched.length === 0) {
      next(nowPath);
    }
    ////首頁拼接
    adminData.forEach((value) => {
      //console.log(value.path);
      const routesData = {
        path: value.path,
        name: value.name,
        component: modules['../views/' + value.component + '.vue'],
      }
      router.addRoute(routesData)
      //console.log(router.getRoutes());
    })
    adminData[0].children.forEach((value) => {
      router.addRoute('Home_index', {
        path: value.path,
        name: value.name,
        component: modules['../views/' + value.component + '.vue'],
      })
      console.log(router.getRoutes());
    })
    //管理者頁面
    adminData[1].children.forEach((value) => {
      router.addRoute('ManagerPage', {
        path: value.path,
        name: value.name,
        component: modules['../views/' + value.component + '.vue'],
      })
      //console.log(router.getRoutes());
    })
    router.addRoute(
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/404.vue')
      })
    window.localStorage.setItem('path', JSON.stringify(to.path));
    next();
  }
  else {
    next();
    window.localStorage.setItem('path', JSON.stringify(to.path));
  }
})
//後置守衛
router.afterEach(() => {
  NProgress.done()
})








export default router
