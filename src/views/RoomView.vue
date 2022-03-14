
<template>
<div class="container">
    <div class="row">
        <section class="bg-primary">

        </section>
    </div>
    <section class="bg-secondary text-light rounded-pill">
    <div class="row">
        
            <div class="col-4 align-self-center">
                <p class="h4 text-center"><i class="fa-solid fa-user"></i> Bienvenue {{pseudo}}</p>
            </div>
            <div class="col-8">
                <button type="button" class="btn btn-light btn-lg btn-block btn-full mt-2 mb-2 mr-2" @click="open = !open">Que voulez-vous dire?</button>
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
                    <button type="submit" @click="sendMessageAndImage" class="btn btn-success m-4 btn-full">Envoyer</button>
                </div>
            </form>
        </template>
    </MyModal>
    
    </div>
    <div class="row" v-for="msg in tableauMessages" :key="msg"><!--mettre les commentaires-->
        <CardComponent v-bind:msg="msg">
        </CardComponent>
    </div>
</div>
  
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import MyModal from '../components/MyModal.vue'
const API_URL ='http://localhost:3000/api/message/'
export default {
    name: 'RoomView',
    components: {MyModal,
        CardComponent
    },
    
  data() {
    return{
      pseudo:JSON.parse(localStorage.getItem('leTokenUser')).pseudo,
      tableauMessages:[],
      open:false,
      files:{},
      textAreaMessage:''
      
      

    }
  },
  methods: {
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
          if(this.textAreaMessage && localStorage.leTokenUser)
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
          }

      }
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
        .then(result => {console.log(result);
            return this.tableauMessages = result})
    }
}


</script>

<style scoped>
.btn-full{
    width: 80%;
}

</style>