<template>
  <NavBarBefore></NavBarBefore>
  <div class="container">
    <div class="row">
      <p id="messageErr" class="bg-danger text-white"></p>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model="email"
              placeholder="Entrer email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            v-on:click.prevent="verifyUserLogin"
            class="btn btn-primary m-3"
          >
            Envoyer
          </button>
        </form>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import NavBarBefore from "../components/NavBarBefore.vue";
export default {
  name: "LoginView",
  components: { NavBarBefore },
  data() {
    return {
      email: "",
      password: "",
      messageErr: "",
    };
  },
  methods: {
    //verification de l'utilisateur lors du login
    verifyUserLogin() {
      //envoie de l'authentification au back
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          motDePasse: this.password,
        }),
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          //enregistrement du token dans le local storage pour avoir les informations de bases sur l'utilisateur quelquesoit sa localisation sur la page
          //si probleme, un message s'affichera
          localStorage.setItem("leTokenUser", JSON.stringify(data));
          this.$router.push("room");
        })
        .catch(() => {
          return (document.getElementById("messageErr").textContent =
            "Les identifiants tapés n' ont pas été retrouvé");
        });
    },
  },
};
</script>

<style></style>
