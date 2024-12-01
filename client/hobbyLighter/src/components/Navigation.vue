<template>
  <nav class="navigation">
    <div
      v-for="item in menuItems"
      :key="item.name"
      :class="['nav-item', { active: currentRoute === item.route }]"
      @click="navigateTo(item.route)"
    >
      <i :class="item.icon"></i>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      currentRoute: this.$route.path, // Initialize with the current path
      menuItems: [
        { name: "Calendar", route: "/calendar", icon: "fa-solid fa-calendar fa-2x" },
        { name: "Home", route: "/main", icon: "fa-solid fa-house fa-2x" },
        { name: "Profile", route: "/profile", icon: "fa-solid fa-user fa-2x" },
      ],
    };
  },
  watch: {
    '$route.path'(newPath) {
      this.currentRoute = newPath;
    },
  },
  methods: {
    navigateTo(route) {
      this.currentRoute = route;
      this.$router.push(route); // Navigate using Vue Router
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1a2345; /* Dark navy background */
  padding: 0.5rem 1rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: fixed; /* Fix to the bottom */
  bottom: 0; /* Position at the bottom */
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it's above other elements */
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: transparent;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-item.active {
  background-color: #f4a424; /* Yellow */
  color: black;
}

.nav-item i {
  font-size: 24px;
}

/* Hover effect for nav items */
.nav-item:hover {
  background-color: rgba(244, 164, 36, 0.7);
}
</style>
