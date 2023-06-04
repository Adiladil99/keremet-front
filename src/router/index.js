import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '@/views/OrderView.vue'
import MovingView from '@/views/MovingView.vue'
import PaymentView from '@/views/PaymentView.vue'
import AdminView from '@/views/AdminView.vue'
import ProfileView from '@/views/ProfileView.vue'
import DriverView from '@/views/DriverView.vue'
import TrackerView from '@/views/TrackerView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'OrderView',
    component: OrderView
  },
  {
    path: '/moving',
    name: 'MovingView',
    component: MovingView
  },
  {
    path: '/payment',
    name: 'PaymentView',
    component: PaymentView
  },
  {
    path: '/tracker/:slug',
    name: 'TrackerView',
    component: TrackerView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/driver',
    name: 'DriverView',
    component: DriverView
  },
  {
    path: '/profile/:slug',
    name: 'ProfileViewSlug',
    component: ProfileView
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView
  },
  {
    path: '/admin/:slug',
    name: 'AdminViewSlug',
    component: AdminView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Проверяем, есть ли у нас хэш-адрес в объекте to
    if (to.hash) {
      
        const el = document.querySelector(to.hash);
        if (el) {
        const scrollTop = el.getBoundingClientRect().top + window.pageYOffset - 0;
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        return null;
      }

    } else {
      document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
      // return { top: 0 }
    }
  }
})

export default router
