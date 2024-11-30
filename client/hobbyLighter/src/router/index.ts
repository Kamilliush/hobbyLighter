import { createRouter, createWebHistory } from 'vue-router';

import ProfileView from '@/views/profile/ProfileView.vue';
import BadgesComponent from '@/components/BadgesComponent.vue';
import ProfileEventsComponent from '@/components/ProfileEventsComponent.vue';
import ProfilePostsComponent from '@/components/ProfilePostsComponent.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import HobbySelection from '@/components/HobbySelection.vue'; // Import the new component

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
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      children: [
        {
          path: 'badges',
          component: BadgesComponent,
        },
        {
          path: 'events',
          component: ProfileEventsComponent,
        },
        {
          path: 'posts',
          component: ProfilePostsComponent,
        },
      ],
    },
  ],
});

export default router;
