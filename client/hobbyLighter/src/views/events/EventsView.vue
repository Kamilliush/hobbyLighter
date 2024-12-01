<template>
    <div class="container_events">
      <nav class="nav_profile">
        <RouterLink to="/events/event" class="nav_item" active-class="active">
          <p>events</p>
        </RouterLink>
        <RouterLink to="/events/challenges" class="nav_item" active-class="active">
          <p>challenges</p>
        </RouterLink>
      </nav>
      <RouterView />
      <!-- Add Navigation Component -->
      <Navigation />
    </div>
  </template>
  
  <script>
  import { RouterView } from "vue-router";
  import { defineComponent } from "vue";
  import Event from "@components/EventsEventComponent.vue";
  import Challenges from "@components/EventsChallengesComponent.vue";
  import Navigation from "@/components/Navigation.vue"; // Import Navigation
  
  export default defineComponent({
    name: "EventsView",
    components: {
      Event,
      Challenges,
      Navigation, // Register Navigation Component
    },
  });
  </script>
  
  <style scoped>
  .container_events {
    display: flex;
    flex-direction: column; /* Change to column to stack content vertically */
    align-items: center;
    width: 100%;
    min-height: 100vh; /* Ensure full height for fixed navigation */
    padding-bottom: 80px; /* Add padding to account for the fixed navigation bar */
  }
  
  .nav_profile {
    display: flex;
    justify-content: space-around;
    background-color: transparent;
    padding: 1rem 0;
    margin-top: 5%;
    width: 50%;
    height: 10%;
  }
  
  .nav_item {
    color: black;
    text-decoration: none;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .nav_item:hover {
    transform: scale(1.1);
  }
  
  .nav_item.active {
    color: black;
    border-bottom: 2px solid #fbbd00;
    padding-bottom: 5px;
  }
  </style>
  