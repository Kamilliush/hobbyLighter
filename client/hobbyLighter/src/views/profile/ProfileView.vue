<template>
  <div class="profile">
    <div class="top_container">
      <img class="logo" src="../../assets/kaczuszka_momo.jpg" />
      <p class="username">{{ username }}</p>
      <div class="badges">
        <img class="badge" src="../../assets/bit_duck.jpg" />
        <img class="badge" src="../../assets/bit_duck.jpg" />
        <img class="badge" src="../../assets/bit_duck.jpg" />
        <img class="badge" src="../../assets/bit_duck.jpg" />
        <img class="badge" src="../../assets/bit_duck.jpg" />
        <button class="more_badges_btn"> ... </button>
      </div>
    </div>

    <nav class="nav_profile">
      <RouterLink to="/profile/posts" class="nav_item" active-class="active">
        <p>posts</p>
      </RouterLink>
      <RouterLink to="/profile/events" class="nav_item" active-class="active">
        <p>events</p>
      </RouterLink>
      <RouterLink to="/profile/badges" class="nav_item" active-class="active">
        <p>badges</p>
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from '@/stores/user';
import RadarChart from "@components/PentagonChart.vue";
import Badges from "@components/BadgesComponent.vue"; 
import Events from "@components/ProfileEventsComponent.vue";
import Posts from "@components/ProfilePostsComponent.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    RadarChart,
    Badges,  
    Events,
    Posts,
  },
  setup() {
    const userStore = useUserStore();
    return {
      username: userStore.username,
    };
  },
});
</script>

<style scoped>
.profile {
  min-height: 15vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.top_container{
  width: 100%;
  padding-top: 2%;
  display: grid;
  grid-template-areas: 
  "logo name name"
  "logo badges badges";
}

.logo{
  width: 25vw;
  height: 25vw;
  background-color: grey;
  border-radius: 100%;
  grid-area: logo;
  align-self: center;
  justify-self: center;
}

.username{
  color: black;
  font-size: 30px;
  grid-area: name;
  align-self: center;
  justify-self: center;
}

.badges{
  width: 40vw;
  display: flex;
  justify-content: space-between;
  grid-area: badges;
  align-self: center;
  justify-self: center;
}

.badge{
  width: 5vw;
  height: 5vw;
  background-color: grey;
  border-radius: 100%;
}

.more_badges_btn{
  outline: none;
  border: none;
  background-color: transparent;
}

.nav_profile {
  display: flex;
  justify-content: space-around;
  background-color: transparent;
  padding: 1rem 0;
  margin-top: 5%;
  width: 100%;
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
