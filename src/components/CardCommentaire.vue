<template>
  <!--modele pour l'insertion d'un commentaire lié à un message-->
  <div class="card m-3 cardWidth" v-bind:id="commData.id + 'cardComm'">
    <div class="card-header">Créé par {{ commData.user.pseudo }}</div>
    <div class="card-body">
      <form>
        <div class="row">
          <textarea
            class="form-control"
            v-bind:id="commData.id + 'comm'"
            rows="3"
            required
            v-if="boolAppear"
            v-model="commData.descriptif"
          ></textarea>
          <p class="lead" v-else>{{ commData.descriptif }}</p>
        </div>
        <div class="row">
          <div class="col-lg-3 col-xl-0">
            <button
              type="button"
              class="btn btn-dark m-2"
              v-show="AppearClickMessag(commData)"
              @click="boolAppear = !boolAppear"
            >
              Modifier
            </button>
          </div>
          <div class="col-lg-3 col-xl-4">
            <button
              type="button"
              class="btn btn-success m-2"
              v-show="boolAppear"
              @click="validateComment(commData.id)"
            >
              Valider
            </button>
          </div>
          <div class="col-lg-3 col-xl-4">
            <button
              type="button"
              class="btn btn-danger m-2"
              v-show="boolAppear"
              @click="deleteComment(commData.id)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comm"],
  data() {
    console.log(this.comm);
    return {
      commData: this.comm, //information sur le commentaire
      boolAppear: false, //booléen permettant l'apparition des boutons modifier un commentaire
    };
  },
  methods: {
    AppearClickMessag(userIdComm) {
      let boolClickMessag = false;
      if (
        userIdComm.userId == JSON.parse(localStorage.leTokenUser).userId ||
        JSON.parse(localStorage.leTokenUser).isAdmin
      ) {
        boolClickMessag = true;
      }

      return boolClickMessag && !this.boolAppear;
    },
    //modifier un commentaire
    validateComment(id) {
      this.boolAppear = false;
      let commentContent = document.getElementById(id + "comm");
      this.commData.descriptif = commentContent.value;
      fetch("http://localhost:3000/api/message/comments/" + id + "/modified", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.leTokenUser).token,
        },
        body: JSON.stringify({
          descriptif: commentContent.value,
        }),
      });
    },
    //supprimer un commentaire
    deleteComment(id) {
      this.boolAppear = false;
      let commentContent = document.getElementById(id + "cardComm");
      fetch("http://localhost:3000/api/message/comments/" + id + "/deleted", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.leTokenUser).token,
        },
      }).then(() => commentContent.remove());
    },
  },
};
</script>

<style>
.cardWidth {
  width: 80%;
}
</style>
