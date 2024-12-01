<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Hobby Lighter Logo" class="logo" />
    <form class="auth-form" @submit.prevent="handleLogin">
      <div class="input-group">
        <input
          ref="username"
          v-bind:class="{ 'input-error': error.username }"
          type="text"
          placeholder="Username"
          class="input-field"
        />
      </div>
      <div class="input-group">
        <input
          ref="password"
          v-bind:class="{ 'input-error': error.password }"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Password"
          class="input-field"
        />
        <span class="input-icon" @click="togglePasswordVisibility">
          {{ passwordVisible ? '👁' : '👁‍🗨' }}
        </span>
      </div>
      <button type="submit" class="auth-button">Sign In</button>
    </form>
    <p class="footer-text"><a href="/register">Don’t have an account?</a></p>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  name: "SignIn",
  data() {
    return {
      passwordVisible: false,
      error: {
        username: false,
        password: false,
      },
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async handleLogin() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;

      this.error.username = !username;
      this.error.password = !password;

      if (!username || !password) {
        return;
      }

      try {
        const response = await fetch(`http://172.20.10.2:3000/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          this.error.username = true;
          this.error.password = true;
        } else {
          localStorage.setItem("token", data.token);

          // Store username in Pinia store and localStorage
          const userStore = useUserStore();
          userStore.setUsername(username);

          // Fetch user hobbies
          const userResponse = await fetch(`http://172.20.10.2:3000/api/users/hobbies`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          const userData = await userResponse.json();
          if (userResponse.ok) {
            localStorage.setItem("userHobbies", JSON.stringify(userData.hobbies));
          }

          // Redirect to main page
          this.$router.push("/main");
        }
      } catch (err) {
        console.error("Error during login:", err);
      }
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

/* Logo style */
.logo {
  width: 180px;
  margin-bottom: 30px;
}

/* Auth-form styles */
.auth-form {
  width: 90%;
  max-width: 450px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Input group to wrap input field and icon */
.input-group {
  position: relative;
  width: 100%;
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

/* Input icon styles */
.input-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1.2rem;
  cursor: pointer;
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
  font-weight: 300;
  color: black;
}

.footer-text a {
  margin-left: 120px;
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

/* Responsive design for smaller screens */
@media screen and (max-width: 768px) {
  .logo {
    width: 150px;
  }

  .input-field {
    font-size: 1.2rem;
    padding: 16px;
  }

  .auth-button {
    font-size: 1.2rem;
    padding: 16px;
  }

  .footer-text {
    font-size: 0.85rem;
  }
}
</style>
