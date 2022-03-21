<template>
  <!--mise en place de l'entete si l'utilisateur est loggué sur des pages autres que login ou register-->
  <nav class="navbar navbar-light bg-light mb-5">
    <router-link to="/room" class="navbar-brand">
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
    </router-link>

    <div class="col-6 d-flex justify-content-end">
      <button type="button" class="btn btn-primary m-1" @click="profil">
        Profil
      </button>

      <button type="button" class="btn btn-danger m-1" @click="disconnect">
        Se déconnecter
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    disconnect() {
      //lors de la déconnexion, les informations stocké par rapport au token sont supprimé et l'utilisateur est envoyé sur la page login
      localStorage.removeItem("leTokenUser");
      this.$router.push("login");
    },
    profil() {
      //permet d'etre redirigé sur la page profil
      this.$router.push("profile");
    },
  },
};
</script>
