<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="../assets/logo.png" alt="Logo" height="100%" class="logo" />
    </div>
    <div class="navbar-right">
      <div class="blueBg">
        <!-- Link do strony dodawania nowego posta -->
        <router-link to="/new" class="button-link">
          <i class="fas fa-plus"></i>
        </router-link>
        <div class="yellowBg">
          <!-- Link do strony wyszukiwania -->
          <router-link to="/search" class="button-link">
            <i class="fa-solid fa-magnifying-glass"></i>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
</script>
<style>
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
  position: fixed; /* Przykleja navbar do góry */
  top: 0; /* Ustawia navbar na górze */
  left: 0;
  z-index: 1000; /* Zapewnia, że navbar będzie nad innymi elementami */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Opcjonalny cień, aby odróżnić navbar od reszty treści */
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
  justify-content: right;
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
  justify-content: right;
  align-items: center;
}

/* Stylizacja router-link, aby wyglądały jak przyciski */
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
