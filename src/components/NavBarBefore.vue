<template>
  <!--mise en place du templace d'entete réserver aux pages login et register-->
  <nav class="navbar navbar-light bg-light">
    <div class="col-6">
      <div class="col-6 d-flex justify-content-between">
        <img
          src="../assets/icon.svg"
          width="60"
          height="60"
          class="d-inline-block align-top"
          alt="groupomania"
        />
        <h1>Groupomania</h1>
      </div>
    </div>

    <div class="col-6 d-flex justify-content-end">
      <router-link class="btn btn-outline-primary m-1" to="/login"
        >Login</router-link
      >
      <router-link class="btn btn-outline-primary m-1" to="/register"
        >Register</router-link
      >
    </div>
  </nav>
</template>
