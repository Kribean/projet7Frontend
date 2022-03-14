
<template>
    <div class="card mt-4">
        <div class="row">
            <div class="col-6"><h5 class="card-header">Groupomania</h5></div>
            <div class="col-6" ><button type="button" class="btn btn-danger" v-if="userId==userData.userId">Supprimer</button></div>
            
        </div>
    <div class="card-body">
        <h5 class="card-title">Créé le {{userData.createdAt}} par {{userData.user.pseudo}}</h5>
        <p class="card-text">{{userData.descriptif}}</p>
        <img  v-bind:src="userData.imageUrl" class="img-fluid" alt="Responsive image">
        
    </div>
    <div class="row"></div>
    <div class="row"><p><i class="fa-solid fa-thumbs-up"></i> {{nbDeLikePourLeMessage}}</p></div>
    <div class="row">
        <div class="col-6">
          <button type="button" class="btn btn-primary btn-sm m-3" @click="likerMessage(userData.id,1)" v-if="!(userData.likeOrNot)"><i class="fa-solid fa-thumbs-up"></i> liker</button>
          <button type="button" class="btn btn-secondary btn-sm m-3" @click="likerMessage(userData.id,0)" v-else><i class="fa-solid fa-thumbs-up"></i> unliker</button>
          </div>
        <div class="col-6"><button type="button" class="btn btn-primary btn-sm m-3"><i class="fa-solid fa-message"></i> commenter</button></div>
    </div>
    <div class="row">
        <button type="button" class="btn btn-secondary btn-lg btn-block">Commentaire(s)</button>
    </div>
    <div class="row">

    </div>
    </div>
</template>

<script>
export default {
    props:['msg'],
  data() {
    console.log(this.msg);
    console.log(this.msg.nbLikes)
    return{
        userData:this.msg,
        nbDeLikePourLeMessage:this.msg.likes.length,
      pseudo:JSON.parse(localStorage.getItem('leTokenUser')).pseudo,
      userId:JSON.parse(localStorage.getItem('leTokenUser')).userId,
    }
  },
  methods: {
    likerMessage(identiteMessage,valueLike){
      alert(this.userData.likeOrNot);
      let url = 'http://localhost:3000/api/message/'+identiteMessage+'/like';
      fetch(url,{
        method: 'POST',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token
        },
        body: JSON.stringify({
        like:valueLike,
                        })
      })
      if(this.userData.likeOrNot==false)
      {
        this.nbDeLikePourLeMessage++;
        this.userData.likeOrNot=true;
      }
      else if(this.userData.likeOrNot==true)
      {
        this.nbDeLikePourLeMessage--;
        this.userData.likeOrNot=false;
      }
      
    }
    
  },

}

</script>

<style>

</style>