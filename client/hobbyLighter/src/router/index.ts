import { createRouter, createWebHistory } from 'vue-router';

import ProfileView from '@/views/profile/ProfileView.vue';
import BadgesComponent from '@/components/BadgesComponent.vue';
import ProfileEventsComponent from '@/components/ProfileEventsComponent.vue';
import ProfilePostsComponent from '@/components/ProfilePostsComponent.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import HobbySelection from '@/components/HobbySelection.vue';
import MainPage from "@/components/MainPage.vue";



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
      path: '/select-hobbies',
      name: 'HobbySelection',
      component: HobbySelection,
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView,
      children: [
        {
          path: 'badges',
          name: 'Badges',
          component: BadgesComponent,
        },
        {
          path: 'events',
          name: 'ProfileEvents',
          component: ProfileEventsComponent,
        },
        {
          path: 'posts',
          name: 'ProfilePosts',
          component: ProfilePostsComponent,
        },
      ],
    },
    // Optionally, add a catch-all route for 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'), // You can create a NotFound.vue component
    },
  ],
});

export default router;
