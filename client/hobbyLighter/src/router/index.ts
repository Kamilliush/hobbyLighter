  import { createRouter, createWebHistory } from 'vue-router'
  import HomeView from '../views/HomeView.vue'
import SearchBar from '../views/search/SearchBar.vue'

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/search',
        name: 'search',
        component: SearchBar,
      },
    ],
  })

  export default router
