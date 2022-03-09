<template>
  <!--nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav-->
  <nav class="navbar navbar-light bg-light">

<div class="col-6">
    <a class="navbar-brand" href="#">
    <img src="./assets/icon.svg" width="30" height="30" class="d-inline-block align-top" alt="groupomania">
    Groupomania
  </a>
</div>

<div class="col-6">
<router-link class="btn btn-outline-primary m-1" to="/login">Login</router-link>
<router-link class="btn btn-outline-primary m-1" to="/register">Register</router-link>
</div>
</nav>
  <router-view/>
</template>

<style lang="scss">
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
