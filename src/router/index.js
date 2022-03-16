import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RoomView from '../views/RoomView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RegisterView
  },
  {
    path: '/room',
    name: 'room',
    component: RoomView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
