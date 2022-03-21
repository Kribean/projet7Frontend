<template>
  <!--mise en place de l'entete-->
  <NavBarAfter></NavBarAfter>
  <div class="container">
    <!--mise en place du formulaire permettant de modifier les identifiants de l'utilisateur -->
    <form class="formulaire">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          v-model="nom"
          aria-describedby="nom"
          placeholder="Entrer nom"
          pattern="[A-Za-z]{2,10}[ -]?[A-Za-z]{2,10}"
          required
        />
        <p id="nomErrorMsg"></p>
      </div>
      <div class="form-group">
        <label for="prenom">Prenom</label>
        <input
          type="text"
          class="form-control"
          id="prenom"
          v-model="prenom"
          aria-describedby="prenom"
          placeholder="Entrer prenom"
          pattern="[A-Za-z]{2,10}[ -]?[A-Za-z]{2,10}"
          required
        />
        <p id="prenomErrorMsg"></p>
      </div>
      <div class="form-group">
        <label for="pseudo">Pseudo</label>
        <input
          type="text"
          class="form-control"
          id="pseudo"
          v-model="pseudo"
          aria-describedby="pseudonyme"
          placeholder="Entrer pseudo"
          pattern="[A-Za-z]{2,10}[ -]?[A-Za-z]{2,10}"
          required
        />
        <p id="pseudoErrorMsg"></p>
      </div>
      <button type="submit" @click="verifyUserData" class="btn btn-primary">
        Modifier
      </button>
    </form>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <button type="submit" @click="deleteProfil" class="btn btn-danger m-3">
          Supprimer mon compte
        </button>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import NavBarAfter from "../components/NavBarAfter.vue";
export default {
  name: "ProfileView",
  components: { NavBarAfter },
  data() {
    return {
      nom: JSON.parse(localStorage.leTokenUser).nom,
      prenom: JSON.parse(localStorage.leTokenUser).prenom,
      pseudo: JSON.parse(localStorage.leTokenUser).pseudo,
    };
  },
  methods: {
    //vérification des champs utilisateurs
    verifyUserData() {
      let lesValiditeDeChamps = true;
      for (let input of document.querySelectorAll(".formulaire input")) {
        //on ne prend pas en compte le bouton submit
        if (input.getAttribute("type") != "submit") {
          //on verifie l'identité des champs, autre que le bouton submit si un des champs n'est pas valide on met le booléen lesValiditeDeChamps à false
          if (!input.reportValidity()) {
            lesValiditeDeChamps = false;
            document.getElementById(
              input.getAttribute("id").concat("ErrorMsg")
            ).textContent = "Vous avez mal complété ce champ";
          } else {
            document.getElementById(
              input.getAttribute("id").concat("ErrorMsg")
            ).textContent = "";
          }
        }
      }
      //si les champ sont valides on envoie au back pour traitement
      if (lesValiditeDeChamps) {
        fetch("http://localhost:3000/api/auth/modifyProfil", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.leTokenUser).token,
          },
          body: JSON.stringify({
            nom: this.nom,
            prenom: this.prenom,
            pseudo: this.pseudo,
          }),
        }).then(() => {
          //modification des champs dans le local storage
          localStorage.setItem(
            "leTokenUser",
            JSON.stringify({
              pseudo: this.pseudo,
              nom: this.nom,
              prenom: this.prenom,
              userId: JSON.parse(localStorage.leTokenUser).userId,
              token: JSON.parse(localStorage.leTokenUser).token,
            })
          );
          this.$router.push("room");
        });
      }
    },
    //suppression du profil et des posts liés au profil
    deleteProfil() {
      fetch("http://localhost:3000/api/auth/deleteProfil", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.leTokenUser).token,
        },
      }).then(() => {
        localStorage.removeItem("leTokenUser");
        this.$router.push("login");
      });
    },
  },
};
</script>

<style></style>
