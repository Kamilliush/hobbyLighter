<template>
    <div class="container">
      <!-- Back Arrow and Logo -->
      <div class="header">
        <div class="back-arrow" @click="goBack">
          <span>&lt;</span>
        </div>
        <img src="@/assets/logo.png" alt="Hobby Lighter Logo" class="logo" />
      </div>
      
      <!-- Sign Up Form -->
      <form class="auth-form">
        <div class="input-group">
          <input type="text" placeholder="Username" class="input-field" />
          <font-awesome-icon icon="user" class="input-icon" />
        </div>
        <div class="input-group">
          <input type="email" placeholder="Email" class="input-field" />
          <font-awesome-icon icon="envelope" class="input-icon" />
        </div>
        <div class="input-group">
          <input :type="passwordVisible ? 'text' : 'password'" placeholder="Password" class="input-field" />
          <font-awesome-icon :icon="passwordVisible ? 'eye' : 'eye-slash'" class="input-icon" @click="togglePasswordVisibility" />
        </div>
        <button type="submit" class="auth-button">Sign Up</button>
      </form>
      
      <!-- Footer -->
      <p class="footer-text">
        <a href="/">Already have an account?</a>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignUp',
    data() {
      return {
        passwordVisible: false, // Toggle for password visibility
      };
    },
    methods: {
      goBack() {
        this.$router.push('/'); // Navigate back to the Sign In page
      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible; // Toggle visibility
      },
    },
  };
  </script>
  
  <style>
  /* Global styles for html and body */
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff; /* Set the background to white */
    font-family: Arial, sans-serif;
  }
  
  /* Flex container to center the form */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  .header {
    position: relative;
    width: 180px;
  }
  
  .back-arrow {
    position: absolute;
    top: -10px;
    left: -20px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .back-arrow span {
    font-weight: bold;
    color: black;
  }
  
  .logo {
    display: block;
    width: 180px;
    margin-bottom: 30px;
  }
  
  /* Input group to wrap icon and input field */
  .input-group {
    position: relative;
    width: 100%;
    max-width: 450px;
    /* Odległości między polami pozostają bez zmian */
  }
  
  .input-icon {
    position: absolute;
    top: 50%;
    right: 15px; /* Przenieś ikonkę na prawą stronę */
    transform: translateY(-50%);
    color: #aaa;
    font-size: 1.2rem;
  }
  
  .input-field {
    width: 100%;
    padding: 18px;
    padding-right: 45px; /* Dodaj miejsce na ikonkę po prawej */
    font-size: 1.3rem;
    border: 1.5px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .auth-button {
    width: 100%;
    padding: 18px;
    font-size: 1.3rem;
    font-weight: bold;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .auth-button:hover {
    background-color: darkorange;
  }
  
  .footer-text {
    margin-top: 15px;
    font-size: 0.9rem;
    color: black;
  }
  
  .footer-text a {
    color: black;
    text-decoration: none;
  }
  
  .footer-text a:hover {
    text-decoration: underline;
  }
  </style>
  