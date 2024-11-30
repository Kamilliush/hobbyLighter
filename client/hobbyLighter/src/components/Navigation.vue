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
  data() {
    return {
      currentRoute: "/", // Domyślna strona startowa
      menuItems: [
        { name: "Calendar", route: "/calendar", icon: "fa-solid fa-calendar fa-2x" },
        { name: "Home", route: "/", icon: "fa-solid fa-house fa-2x" },
        { name: "Profile", route: "/profile", icon: "fa-solid fa-user fa-2x" },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.currentRoute = route;
      this.$router.push(route); // Nawigacja przy użyciu Vue Router
    },
  },
};
</script>
<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a2345; /* Ciemnogranatowe tło */
  padding: 0.5rem 1rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: fixed; /* Przyklejenie do ekranu */
  bottom: 0; /* Ustawienie na dole */
  left: 0;
  right: 0;
  z-index: 1000; /* Ustaw wyższy z-index, aby komponent był nad innymi elementami */
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
  background-color: #f4a424; /* Żółty */
  color: black;
}

.nav-item i {
  font-size: 24px;
}

/* Animacja zaznaczenia */
.nav-item:hover {
  background-color: rgba(244, 164, 36, 0.7);
}
</style>
  