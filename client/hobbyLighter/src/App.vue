<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  font-family: sans-serif;
}

#app{
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100%;
  box-sizing: border-box; 
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  background-color: white;
}

.app{
  width: 100%;
}
</style>
