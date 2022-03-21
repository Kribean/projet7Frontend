<template>
  <!--mise en place de l'entete-->
  <NavBarAfter></NavBarAfter>
  <div class="container">
    <div class="row">
      <section class="bg-primary"></section>
    </div>
    <!--section ou l'utilisateur voit son pseudo mais aussi peut émettre un post-->
    <section class="bg-secondary text-light rounded-pill">
      <div id="zoneEdit" class="row">
        <div class="col-lg-4 col-xs-6 align-self-center">
          <p class="text-center">
            <i class="fa-solid fa-user"></i> Bienvenue {{ pseudo }} -
            <span v-if="isAdmin"> tu es admin</span>
          </p>
        </div>
        <div class="col-lg-8 col-xs-6 align-self-center">
          <button
            type="button"
            class="btn btn-light btn-lg btn-block btn-full mt-1 mb-1"
            @click="openModalQueVoulezVous"
          >
            Que voulez-vous dire?
          </button>
        </div>
      </div>
    </section>
    <div class="row">
      <!--modal permettant la création ou la modification d'un post-->
      <MyModal v-show="open" @closeModal="close">
        <template #title>Ecrivez votre message</template>
        <template #default>
          <form>
            <div class="form-group m-4">
              <label for="textAreaMessage">Votre message</label>
              <textarea
                class="form-control"
                id="textAreaMessage"
                v-model="textAreaMessage"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="form-group m-4">
              <div class="row">
                <label for="areaImage">Voulez-vous insérer une image?</label>
              </div>
              <div class="row">
                <input
                  type="file"
                  class="form-control-file"
                  id="areaImage"
                  @change="onFileChange"
                />
              </div>
            </div>
            <div class="row justify-content-center">
              <button
                type="submit"
                @click="sendMessageAndImage"
                class="btn btn-success m-4 btn-full"
                v-show="!optionModify"
              >
                Envoyer
              </button>
              <button
                type="submit"
                @click="modifyMessageAndImage"
                class="btn btn-success m-4 btn-full"
                v-show="optionModify"
              >
                Modifier
              </button>
            </div>
          </form>
        </template>
      </MyModal>
    </div>
    <!--afficahage des messages-->
    <div class="row" v-for="msg in tableauMessages" :key="msg">
      <!--message individuel-->
      <CardComponent v-bind:msg="msg" @open-modal-to-modify="openModalToModify">
      </CardComponent>
    </div>
  </div>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";
import MyModal from "../components/MyModal.vue";
import NavBarAfter from "../components/NavBarAfter.vue";
const API_URL = "http://localhost:3000/api/message/";
export default {
  name: "RoomView",
  components: { MyModal, CardComponent, NavBarAfter },

  data() {
    return {
      //pseudo de l'utilisateur
      pseudo: JSON.parse(localStorage.getItem("leTokenUser")).pseudo,
      tableauMessages: [], //tableau contenant tous les messages
      tableauLikes: [], //tableau des likes liés aux messages
      open: false, //booléen pour l'ouverture du modal
      files: {}, //fichier image
      textAreaMessage: "", //message rentré par l'utilisateur
      optionModify: false, //affichage pour le pannel modifier
      idMsgToModify: null, //identifiant du message à modifier
      previousUrl: "", //url de l'image avant modification
      isAdmin: JSON.parse(localStorage.getItem("leTokenUser")).isAdmin, //booléen permettant de savoir si admin
    };
  },
  methods: {
    //ouverture du modal
    openModalQueVoulezVous() {
      this.open = !this.open;
      this.optionModify = false;
    },
    //fermeture du modal
    close() {
      this.open = false;
    },
    //permet d'enregistrer le fichier image dans la variable file
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      console.log(this.files);
      if (!this.files.length) return;
    },
    //envoie du message avec image
    sendMessageAndImage() {
      if (this.files[0] && this.textAreaMessage && localStorage.leTokenUser) {
        let formData = new FormData();
        formData.append("userID", JSON.parse(localStorage.leTokenUser).userId);
        formData.append("descriptif", this.textAreaMessage);
        formData.append("image", this.files[0]);

        fetch("http://localhost:3000/api/message/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.leTokenUser).token,
          },
          body: formData,
        }).then(() => {
          location.reload();
        });
      } else if (
        !this.files[0] &&
        this.textAreaMessage &&
        localStorage.leTokenUser
      ) {
        fetch("http://localhost:3000/api/message/addWithoutImg", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.leTokenUser).token,
          },
          body: JSON.stringify({
            userId: JSON.parse(localStorage.leTokenUser).userId,
            descriptif: this.textAreaMessage,
          }),
        }).then(() => {
          location.reload();
        });
      }
    },

    //ouverture du modal d'édition si on veut modifier un message
    openModalToModify(x) {
      this.open = true;
      this.textAreaMessage = x.descriptif;
      this.optionModify = true;
      this.idMsgToModif = x.id;
      this.previousUrl = x.imageUrl;
    },
    //modifier un message où une image est présente
    modifyMessageAndImage() {
      if (this.files[0] && this.textAreaMessage && localStorage.leTokenUser) {
        let formData = new FormData();
        formData.append("userID", JSON.parse(localStorage.leTokenUser).userId);
        formData.append("descriptif", this.textAreaMessage);
        formData.append("image", this.files[0]);
        formData.append("previousUrl", this.previousUrl);

        fetch(
          "http://localhost:3000/api/message/" +
            this.idMsgToModif +
            "/modifyMessage",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer " + JSON.parse(localStorage.leTokenUser).token,
            },
            body: formData,
          }
        ).then(() => {
          location.reload();
        });
      } else if (
        !this.files[0] &&
        this.textAreaMessage &&
        localStorage.leTokenUser
      ) {
        fetch(
          "http://localhost:3000/api/message/" +
            this.idMsgToModif +
            "/modifyMessageWithoutImg",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + JSON.parse(localStorage.leTokenUser).token,
            },
            body: JSON.stringify({
              userId: JSON.parse(localStorage.leTokenUser).userId,
              descriptif: this.textAreaMessage,
            }),
          }
        ).then(() => {
          location.reload();
        });
      }
    },
  },
  created() {
    fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.leTokenUser).token,
      },
    })
      .then((result) => {
        console.log("okboss");
        return result.json();
      })
      .then((tableauMessages) => {
        console.log(tableauMessages);
        this.tableauMessages = tableauMessages;
      });
  },
};
</script>

<style scoped>
.btn-full {
  width: 80%;
}

/*redimensionnement et responsive*/
@media screen and (max-width: 990px) {
  .btn-full {
    width: 70%;
    margin-left: 10%;
    font-size: 15px;
  }
}
</style>
