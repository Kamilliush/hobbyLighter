<template>
    <nav class="navbar">
      <div class="navbar-left">
        <img src="../assets/logo.png" alt="Logo" height="100%" class="logo" />
      </div>
      <div class="navbar-right">
        <div class="blueBg">
            <button @click="addNewPost"><i class="fas fa-plus"></i>
            </button>
            <div class="yellowBg">
                <button @click="search"><i class="fa-brands fa-searchengin"></i></button>
            </div>
        </div>
      </div>
    </nav>
</template>
  
  <script>
  export default {
    name: 'Navbar',
    methods: {
      addNewPost() {
        console.log('Plus button clicked!');
      },
      search() {
        console.log('Search button clicked!');
      },
    },
  };
  </script>
  
  <style>
    .logo{
        padding: 10px 0;
    }
    .navbar{
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        width: 100%;
        height: 8vh;
    }
    .navbar-left{
        text-align: center;
        width: 30%;
    }
    .navbar-right{
        width: 70%;
        display: flex;
        justify-content: right;
        align-items: center;
    }
    .blueBg{
        background-color: #14213D;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        width: 90px;
        height: 45px;
        display: flex;
        justify-content: right;
        align-items: center;

    }
    .blueBg button{
        margin-right: 10px;
        background-color: aqua;
        /*Reset's every elements apperance*/
        background: none repeat scroll 0 0 transparent;
        border: medium none;
        border-spacing: 0;
        color: #ffffff;
        font-family: 'PT Sans Narrow',sans-serif;
        font-size: 25px;
        font-weight: normal;
        line-height: 1.42rem;
        list-style: none outside none;
        padding: 0;
        text-align: left;
        text-decoration: none;
        text-indent: 0;
    }
    .yellowBg{
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
    .yellowBg button{
        margin-right: 15px;
        background-color: aqua;
        /*Reset's every elements apperance*/
        background: none repeat scroll 0 0 transparent;
        border: medium none;
        border-spacing: 0;
        color: #ffffff;
        font-family: 'PT Sans Narrow',sans-serif;
        font-size: 25px;
        font-weight: normal;
        line-height: 1.42rem;
        list-style: none outside none;
        padding: 0;
        text-align: left;
        text-decoration: none;
        text-indent: 0;
    }
  </style>
  