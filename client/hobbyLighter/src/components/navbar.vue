<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="../assets/logo.png" alt="Logo" height="100%" class="logo" />
    </div>
    <div class="navbar-right">
      <div class="blueBg">
        <router-link to="/main" class="button-link">
          <i class="fas fa-plus"></i>
        </router-link>
        <div class="yellowBg">
          <!-- Link to the search page -->
          <router-link to="/search" class="button-link">
            <i class="fa-solid fa-magnifying-glass"></i>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.logo {
  padding: 10px 0;
}

.navbar {
  margin-top: 0px;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  width: 100%;
  height: 8vh;
  position: fixed; /* Fix navbar to the top */
  top: 0; /* Position navbar at the top */
  left: 0;
  z-index: 1000; /* Ensure navbar is above other elements */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow for distinction */
}

.navbar-left {
  text-align: center;
  width: 30%;
}

.navbar-right {
  width: 70%;
  display: flex;
  justify-content: right;
  align-items: center;
}

.blueBg {
  background-color: #14213D;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 90px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yellowBg {
  background-color: #FCA311;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 1;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style for router-link to look like buttons */
.button-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 25px;
  width: 100%;
  height: 100%;
}

.button-link i {
  margin: 0;
  font-size: 25px;
}

.button-link:hover {
  color: #fff;
}
</style>
