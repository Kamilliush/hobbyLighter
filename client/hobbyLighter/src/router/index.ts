import { createRouter, createWebHistory } from 'vue-router';

import ProfileView from '@/views/profile/ProfileView.vue'
import BadgesComponent from '@/components/BadgesComponent.vue'
import ProfileEventsComponent from '@/components/ProfileEventsComponent.vue'
import ProfilePostsComponent from '@/components/ProfilePostsComponent.vue'
import EventsEventComponent from '@/components/EventsEventComponent.vue'
import EventsChallengesComponent from '@/components/EventsChallengesComponent.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import EventsView from '@/views/events/EventsView.vue'
import HobbySelection from '@/components/HobbySelection.vue';
import MainPage from "@/components/MainPage.vue";

import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signin', // Redirect root to /signin
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/register',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/components/SearchBar.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/events/EventsView.vue'),
      children: [
        {
          path: 'event',
          component: EventsEventComponent, // Powiązanie trasy z komponentem Badges
        },
        {
          path: 'challenges',
          component: EventsChallengesComponent, // Powiązanie trasy z komponentem Badges
        },
      ],
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
    // Catch-all route for 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
