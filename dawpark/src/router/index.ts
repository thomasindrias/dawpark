import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeMobile from '../views/mobile/Home.vue';
import HomeDesktop from '../views/desktop/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    components: {
      mobile: HomeMobile,
      desktop: HomeDesktop,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      mobile: () => import('../views/mobile/About.vue'),
      desktop: () => import('../views/desktop/About.vue'),
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
