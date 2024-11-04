import {createRouter, createWebHistory} from 'vue-router';
import {useStore} from 'vuex';
import Login from '@/pages/auth/Login.vue';

import Appointment from '@/pages/appointment/Appointment.vue'
import AppointmentNew from '@/pages/appointment/AppointmentNew.vue'
import AppointmentEdit from '@/pages/appointment/AppointmentEdit.vue'

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Appointment,
    },
    {
      path: '/appointments',
      name: 'appointments',
      children: [
        {
          path: '',
          name: 'appointments-list',
          component: () => Appointment,
          meta: {requiresAuth: true},
        },
        {
          path: 'new',
          name: 'appointments-new',
          component: () => AppointmentNew,
          meta: {requiresAuth: true},
        },
        {
          path: ':id',
          name: 'appointments-edit',
          component: () => AppointmentEdit,
          meta: {requiresAuth: true},
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFound.vue'),
    },
  ]
;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
