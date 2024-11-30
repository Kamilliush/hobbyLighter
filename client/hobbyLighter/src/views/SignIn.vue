<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Hobby Lighter Logo" class="logo" />
    <form class="auth-form">
      <div class="input-group">
        <input type="text" placeholder="Username" class="input-field" />
        <font-awesome-icon icon="user" class="input-icon" />
      </div>
      <div class="input-group">
        <input :type="passwordVisible ? 'text' : 'password'" placeholder="Password" class="input-field" />
        <font-awesome-icon :icon="passwordVisible ? 'eye' : 'eye-slash'" class="input-icon" @click="togglePasswordVisibility" />
      </div>
      <button type="submit" class="auth-button">Sign In</button>
    </form>
    <p class="footer-text"><a href="/register">Don’t have an account?</a></p>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      passwordVisible: false, // Dodane dla przełączania widoczności hasła
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
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
  justify-content: center; /* Center container horizontally */
  align-items: center;     /* Center container vertically */
  background-color: #ffffff; /* Set the background to white */
  font-family: Arial, sans-serif; /* Optional: Set a default font */
}

/* Flex container to center the form */
.container {
  display: flex;
  flex-direction: column;  /* Stack children vertically */
  align-items: center;     /* Center horizontally */
  justify-content: center; /* Center vertically */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Logo style */
.logo {
  width: 180px;            /* Slightly larger logo size */
  margin-bottom: 30px;     /* Add more space below logo */
}

/* Auth-form styles */
.auth-form {
  width: 90%;              /* Full width with responsive sizing */
  max-width: 450px;        /* Slightly larger maximum width */
  margin-top: 20px;
  display: flex;
  flex-direction: column;  /* Stack inputs and button vertically */
  gap: 20px;               /* Add more space between form elements */
}

/* Input group to wrap input field and icon */
.input-group {
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;             /* Full width of form */
  padding: 18px;           /* Slightly larger padding */
  padding-right: 45px;     /* Add space for icon on the right */
  font-size: 1.3rem;       /* Slightly larger font size */
  border: 1.5px solid #ccc; /* Slightly thicker border */
  border-radius: 8px;      /* More rounded input fields */
  box-sizing: border-box;  /* Include padding in width */
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 15px;            /* Position icon on the right */
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1.2rem;
  cursor: pointer;        /* Make the icon clickable */
}

/* Auth-button styles remain unchanged */
.auth-button {
  width: 100%;             /* Full width */
  padding: 18px;           /* Slightly larger padding */
  font-size: 1.3rem;       /* Slightly larger button font */
  font-weight: bold;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 8px;      /* More rounded corners */
  cursor: pointer;
}

.auth-button:hover {
  background-color: darkorange;
}

/* Footer text styles remain unchanged */
.footer-text {
  margin-top: 15px;        /* Space above the footer text */
  font-size: 0.9rem;       /* Smaller font size */
  font-weight: 300;        /* Light font weight for thinner text */
  color: black;            /* Text color as black */
}

.footer-text a {
  margin-left: 120px;
  color: black;            /* Link color */
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline; /* Underline link on hover */
}

/* Responsive design for smaller screens */
@media screen and (max-width: 768px) {
  .logo {
    width: 150px;          /* Adjust logo size for smaller screens */
  }

  .input-field {
    font-size: 1.2rem;     /* Adjust font size for inputs */
    padding: 16px;         /* Adjust padding for inputs */
  }

  .auth-button {
    font-size: 1.2rem;     /* Adjust button font size */
    padding: 16px;         /* Adjust padding for button */
  }

  .footer-text {
    font-size: 0.85rem;    /* Slightly smaller text size for mobile */
  }
}
</style>
