import { createRouter, createWebHistory } from 'vue-router'

import ProfileView from '@/views/profile/ProfileView.vue'
import BadgesComponent from '@/components/BadgesComponent.vue'
import ProfileEventsComponent from '@/components/ProfileEventsComponent.vue'
import ProfilePostsComponent from '@/components/ProfilePostsComponent.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/register',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/profile/ProfileView.vue'),
      children: [
        {
          path: 'badges',
          component: BadgesComponent, // Powiązanie trasy z komponentem Badges
        },
        {
          path: 'events',
          component: ProfileEventsComponent, // Powiązanie trasy z komponentem Badges
        },
        {
          path: 'posts',
          component: ProfilePostsComponent, // Powiązanie trasy z komponentem Badges
        },
      ],
    },
  ],
})

export default router
