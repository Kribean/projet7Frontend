
<template>
<NavBarAfter></NavBarAfter>
<div class="container">
    <div class="row">
        <section class="bg-primary">

        </section>
    </div>
    <section class="bg-secondary text-light rounded-pill">
    <div id="zoneEdit" class="row">
        
            <div class="col-lg-4 col-xs-6 align-self-center">
                <p class="text-center"><i class="fa-solid fa-user"></i> Bienvenue {{pseudo}} - <span v-if="isAdmin"> tu es admin</span></p>
            </div>
            <div class="col-lg-8 col-xs-6  align-self-center">
                <button type="button" class="btn btn-light btn-lg btn-block btn-full mt-1 mb-1" @click="openModalQueVoulezVous">Que voulez-vous dire?</button>
            </div>
    </div>
    </section>
    <div class="row">

    <MyModal v-show="open" @closeModal="close">
        <template #title>Ecrivez votre message</template>
        <template #default>
            <form>
                <div class="form-group m-4">
                <label for="textAreaMessage">Votre message</label>
                <textarea class="form-control" id="textAreaMessage" v-model="textAreaMessage" rows="3" required></textarea>
                </div>
                <div class="form-group m-4">
                    <div class="row">
                        <label for="areaImage">Voulez-vous insérer une image?</label>
                    </div>
                    <div class="row">
                        <input type="file" class="form-control-file" id="areaImage" @change="onFileChange">
                    </div>
                    
                </div>
                <div class="row justify-content-center">
                    <button type="submit" @click="sendMessageAndImage" class="btn btn-success m-4 btn-full" v-show="!optionModify">Envoyer</button>
                    <button type="submit" @click="modifyMessageAndImage" class="btn btn-success m-4 btn-full" v-show="optionModify">Modifier</button>
                </div>
            </form>
        </template>
    </MyModal>
    
    </div>

    <div class="row" v-for="msg in tableauMessages" :key="msg"><!--mettre les commentaires-->
        <CardComponent v-bind:msg="msg" @open-modal-to-modify="openModalToModify" >
        </CardComponent>
    </div>
</div>
  
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import MyModal from '../components/MyModal.vue'
import NavBarAfter from '../components/NavBarAfter.vue'
const API_URL ='http://localhost:3000/api/message/'
export default {
    name: 'RoomView',
    components: {MyModal,
        CardComponent, NavBarAfter
    },
    
  data() {
    return{
      pseudo:JSON.parse(localStorage.getItem('leTokenUser')).pseudo,
      tableauMessages:[],
      tableauLikes:[],
      open:false,
      files:{},
      textAreaMessage:'',
      optionModify:false,
      idMsgToModify:null,
      previousUrl:'',
      isAdmin:JSON.parse(localStorage.getItem('leTokenUser')).isAdmin,

    }
  },
  methods: {
      openModalQueVoulezVous(){
          this.open = !this.open;
          this.optionModify=false;

      },
      close(){
         this.open=false
      },
      onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      console.log(this.files);
      if (!this.files.length)
        return;
    },
      sendMessageAndImage(){
          if(this.files[0] && this.textAreaMessage && localStorage.leTokenUser)
          {
            let formData =new FormData();
            formData.append('userID',JSON.parse(localStorage.leTokenUser).userId);
            formData.append('descriptif',this.textAreaMessage);
            formData.append('image',this.files[0]);
          
        fetch('http://localhost:3000/api/message/add',{
        method: 'POST',
        headers:{
        'Accept':'application/json',
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token,
        },
        body: formData
        })
        .then(()=>{
            
            location.reload();})
          }
          else if (!this.files[0] && this.textAreaMessage && localStorage.leTokenUser)
                    {
          
        fetch('http://localhost:3000/api/message/addWithoutImg',{
        method: 'POST',
        headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token,
        },
        body: JSON.stringify({
                            userId:JSON.parse(localStorage.leTokenUser).userId,
                            descriptif:this.textAreaMessage
                        })
        })
        .then(()=>{
            
            location.reload();})
          }

      },

      openModalToModify(x)
      {
          this.open=true;
          this.textAreaMessage =x.descriptif ;
          this.optionModify = true;
          this.idMsgToModif = x.id;
          this.previousUrl = x.imageUrl;
          console.log('boom');
          console.log(x.imageUrl);
          console.log(this.idMsgToModif);
      },

        modifyMessageAndImage(){
          if(this.files[0] && this.textAreaMessage && localStorage.leTokenUser)
          {
            let formData =new FormData();
            formData.append('userID',JSON.parse(localStorage.leTokenUser).userId);
            formData.append('descriptif',this.textAreaMessage);
            formData.append('image',this.files[0]);
            formData.append('previousUrl',this.previousUrl);
          
        fetch('http://localhost:3000/api/message/'+this.idMsgToModif+'/modifyMessage',{
        method: 'PUT',
        headers:{
        'Accept':'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token,
        },
        body: formData
        })
        .then(()=>{location.reload();})
          }
          else if (!this.files[0] && this.textAreaMessage && localStorage.leTokenUser)
                    {

            
          
        fetch('http://localhost:3000/api/message/'+this.idMsgToModif+'/modifyMessageWithoutImg',{
        method: 'PUT',
        headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token,
        },
        body: JSON.stringify({
                            userId:JSON.parse(localStorage.leTokenUser).userId,
                            descriptif:this.textAreaMessage
                        })
        })
        .then(()=>{location.reload();})
          }

      },
  },
   created() {
        fetch(API_URL,{
                        method: 'GET',
                        headers:{
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token,
                        }})
        .then(result => {console.log('okboss');
        return result.json()})
        .then(tableauMessages => {
            console.log(tableauMessages)
            this.tableauMessages = tableauMessages
            }
           )
    }
}


</script>

<style scoped>
.btn-full{
    width: 80%;
}
#zoneEdit{

}
@media screen and (max-width: 990px) {
.btn-full{
    width: 70%;
    margin-left:10%;
    font-size: 15px;
}
}

</style>