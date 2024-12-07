<template>
  <div class="container">
    <div class="header">
      <div class="back-arrow" @click="goBack">
        <span>&lt;</span>
      </div>
      <img src="@/assets/logo.png" alt="Hobby Lighter Logo" class="logo" />
    </div>
    <form class="auth-form" @submit.prevent="handleRegister">
      <div class="input-group">
        <input
          ref="username"
          v-bind:class="{ 'input-error': error.username }"
          type="text"
          placeholder="Username"
          class="input-field"
        />
        <font-awesome-icon icon="user" class="input-icon" />
      </div>
      <div class="input-group">
        <input
          ref="email"
          v-bind:class="{ 'input-error': error.email }"
          type="email"
          placeholder="Email"
          class="input-field"
        />
        <font-awesome-icon icon="envelope" class="input-icon" />
      </div>
      <div class="input-group">
        <input
          ref="password"
          v-bind:class="{ 'input-error': error.password }"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Password"
          class="input-field"
        />
        <font-awesome-icon
          :icon="passwordVisible ? 'eye' : 'eye-slash'"
          class="input-icon"
          @click="togglePasswordVisibility"
        />
      </div>
      <button type="submit" class="auth-button">Sign Up</button>
    </form>
    <p class="footer-text">
      <a href="/signin">Already have an account?</a>
    </p>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  name: "SignUp",
  data() {
    return {
      passwordVisible: false,
      error: {
        username: false,
        email: false,
        password: false,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push("/signin");
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async handleRegister() {
      const username = this.$refs.username.value;
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;

      this.error.username = !username;
      this.error.email = !email || !this.isValidEmail(email);
      this.error.password = !password;

      if (!username || !email || !password || !this.isValidEmail(email)) {
        return;
      }

      try {
        const response = await fetch('http://172.20.10.2:3000/api/auth/register', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          this.error.username = true;
          this.error.email = true;
          this.error.password = true;
        } else {
          alert("Registration successful!");
          const token = data.token;
          localStorage.setItem('token', token);

          // Store username in Pinia store and localStorage
          const userStore = useUserStore();
          userStore.setUsername(username);

          // Redirect to hobby selection
          this.$router.push('/select-hobbies');
        }
      } catch (err) {
        console.error("Error during registration:", err);
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
/* Global styles for html and body */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
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
  margin-bottom: 20px; /* Increased margin between input fields */
}

/* Input icon styles */
.input-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1.2rem;
}

/* Input field styles */
.input-field {
  width: 100%;
  padding: 18px;
  padding-right: 45px;
  font-size: 1.3rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Auth-button styles */
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

/* Footer text styles */
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

/* Error styling */
.input-error {
  border: 2px solid red !important;
}
</style>
