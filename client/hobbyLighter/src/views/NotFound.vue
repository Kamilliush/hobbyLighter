<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <router-link to="/main" class="home-link">Go to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .not-found h1 {
    font-size: 3rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .not-found p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .home-link {
    padding: 10px 20px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .home-link:hover {
    background-color: darkorange;
  }
  </style>
  