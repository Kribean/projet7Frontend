<template>
  <!--mise en place du composant pour le modele de message-->
  <div class="card mt-4">
    <div class="row">
      <div class="col-lg-6 col-xs-4 card-header"><h2>Groupomania</h2></div>
      <!--si l'utilisateur à créé le message ou si il est admin alors deux boutons d'édition/suppression sont ajoutés au message-->
      <div class="col-lg-3 col-xs-4 card-header">
        <button
          type="button"
          class="btn btn-dark"
          v-if="userId == userData.userId || isAdmin"
          @click="$emit('open-modal-to-modify', userData)"
        >
          Modifier
        </button>
      </div>
      <div class="col-lg-3 col-xs-4 card-header">
        <button
          type="button"
          class="btn btn-danger"
          v-if="userId == userData.userId || isAdmin"
          @click="deleteCard(userData)"
        >
          Supprimer
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <!--permet de savoir quand l'utilisateur à créé le message-->
        <p>Créé le {{ userData.createdAt }} par {{ userData.user.pseudo }}</p>
      </div>
      <div class="row">
        <p class="card-text">{{ userData.descriptif }}</p>
      </div>

      <!--ajout le l'image si il y a une image-->
      <div class="row align-item-center">
        <div class="col-2"></div>
        <div class="col-8">
          <img
            v-if="userData.imageUrl != 'NULL'"
            v-bind:src="userData.imageUrl"
            class="img-fluid"
            alt="Responsive image"
          />
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <div class="row"></div>
    <!--ajout du nombre de like du message-->
    <div class="row">
      <p><i class="fa-solid fa-thumbs-up"></i> {{ nbDeLikePourLeMessage }}</p>
    </div>
    <div class="row">
      <!--si l'utilisateur a liké ou non, le bouton like sera adapté-->
      <div class="col-6">
        <button
          type="button"
          class="btn btn-primary btn-sm m-3"
          @click="likerMessage(userData.id, 1)"
          v-if="!userData.likeOrNot"
        >
          <i class="fa-solid fa-thumbs-up"></i> liker
        </button>
        <button
          type="button"
          class="btn btn-secondary btn-sm m-3"
          @click="likerMessage(userData.id, 0)"
          v-else
        >
          <i class="fa-solid fa-thumbs-up"></i> unliker
        </button>
      </div>
      <div class="col-6">
        <button
          type="button"
          class="btn btn-primary btn-sm m-3"
          @click="boolComm = !boolComm"
        >
          <i class="fa-solid fa-message"></i> commenter
        </button>
      </div>
    </div>
    <!--création d'un commentaire lié au message-->
    <div class="row" v-show="boolComm">
      <form>
        <div class="form-group m-4">
          <textarea
            class="form-control"
            v-bind:id="userData.id"
            rows="3"
            placeholder="Votre commentaire"
            required
          ></textarea>
        </div>
        <div class="row justify-content-center">
          <button
            type="submit"
            @click="sendMessage(userData.id)"
            class="btn btn-success m-4 btn-full"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
    <div class="row">
      <button
        type="button"
        class="btn btn-secondary btn-lg btn-block"
        @click="showComments(userData.id)"
      >
        Commentaire(s)
      </button>
    </div>
    <!--mise en place de la série de commentaires-->
    <div
      class="row"
      v-for="comm in tableauComments"
      :key="comm"
      v-show="boolCommView"
    >
      <!--ici on met les comm il faut une card comm-->
      <CardCommentaire v-bind:comm="comm"></CardCommentaire>
    </div>
  </div>
</template>

<script>
import CardCommentaire from "./CardCommentaire.vue";
export default {
  emits: ["open-modal-to-modify"],
  name: "CardComponent",
  components: {
    CardCommentaire,
  },
  props: ["msg"],
  data() {
    return {
      boolComm: false, //affiche la partie édition d'un commentaire
      userData: this.msg, //data lié au message
      boolCommView: false, //affiche ou non les commentaires d'un message
      tableauComments: [], //tableau des commentaires du message
      nbDeLikePourLeMessage: this.msg.likes.length, //nombre de like
      pseudo: JSON.parse(localStorage.getItem("leTokenUser")).pseudo,
      userId: JSON.parse(localStorage.getItem("leTokenUser")).userId,
      isAdmin: JSON.parse(localStorage.getItem("leTokenUser")).isAdmin,
    };
  },
  methods: {
    //envoie du message
    sendMessage(idComm) {
      let textComment = document.getElementById(idComm).value;
      let urlComment =
        "http://localhost:3000/api/message/" + idComm + "/comments";
      //on verifie si le message est vide
      if (textComment.trim()) {
        this.boolComm = false;
        this.boolCommView = false;
        fetch(urlComment, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.leTokenUser).token,
          },
          body: JSON.stringify({
            descriptif: textComment,
          }),
        });
      }
    },
    //suppression du message si l'utilisateur a le droit
    deleteCard(varMsg) {
      //on vérifie si le message contient une image ou non
      if (varMsg.imageUrl != "NULL") {
        fetch("http://localhost:3000/api/message/" + varMsg.id + "/deleteMsg", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.leTokenUser).token,
          },
        }).then(() => {
          location.reload();
        });
      } else {
        fetch(
          "http://localhost:3000/api/message/" +
            varMsg.id +
            "/deleteMsgWithoutImg",
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + JSON.parse(localStorage.leTokenUser).token,
            },
          }
        ).then(() => {
          location.reload();
        });
      }
    },

    //fonciton permettant de liker un message
    likerMessage(identiteMessage, valueLike) {
      let url =
        "http://localhost:3000/api/message/" + identiteMessage + "/like";
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.leTokenUser).token,
        },
        body: JSON.stringify({
          like: valueLike,
        }),
      });
      //on vérifie si un like a déjà été émis par l'utilisateur ou non et si like ou unlike on affiche de manière dynamique. L'enregistrement du like ou un like est faite au dessus via le fetch
      if (this.userData.likeOrNot == false) {
        this.nbDeLikePourLeMessage++;
        this.userData.likeOrNot = true;
      } else if (this.userData.likeOrNot == true) {
        this.nbDeLikePourLeMessage--;
        this.userData.likeOrNot = false;
      }
    },

    //fonction permettant de voir les commentaires d'un message. Pour cela on a besoin d'une input qui est l'identité du message ciblé
    showComments(identiteMessage) {
      this.boolCommView = !this.boolCommView;
      if (this.boolCommView) {
        fetch(
          "http://localhost:3000/api/message/" +
            identiteMessage +
            "/allComments",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + JSON.parse(localStorage.leTokenUser).token,
            },
          }
        )
          .then((result) => {
            return result.json();
          })
          .then((tableauComments) => {
            this.tableauComments = tableauComments;
          });
      }
    },
  },
};
</script>
