import Vue from 'vue'
import VueRouter from 'vue-router'
import CarbonEmission from '../views/CarbonEmission.vue'
import CarbonSink from '../views/CarbonSink.vue'
import CarbonHome from '../views/CarbonHome.vue'
import AboutUs from '../views/AboutUs.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'CarbonHome',
    redirect: '/carbonhome',
    component: CarbonHome,
    meta: {
      keepAlive: false,
      name: 'CarbonHome'
    }
  },
  {
    path: '/carbonhome',
    component: CarbonHome,
    meta: {
      keepAlive: false,
      name: 'CarbonHome'
    }
  },
  {
    path: '/carbonemission/:tab',
    component: CarbonEmission,
    meta: {
      keepAlive: false,
      name: 'CarbonEmission'
    },
  },
  {
    path: '/carbonsink',
    component: CarbonSink,
    meta: {
      keepAlive: false,
      name: 'CarbonSink'
    },
  },
  {
    path: '/aboutus',
    component: AboutUs,
    meta: {
      keepAlive: false,
      name: 'aboutus'
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history', 
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuthentication)) {
//     // this route requires auth, check if logged in
//     if (authentication.isAuthenticated()) {
//       // only proceed if authenticated.
//       next();
//     } else {
//       authentication.signIn();
//     }
//   } else {
//     next();
//   }
// });

export default router
