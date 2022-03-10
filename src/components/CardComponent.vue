
<template>
    <div class="card mt-4">
        <div class="row">
            <div class="col-6"><h5 class="card-header">Groupomania</h5></div>
            <div class="col-6" ><button type="button" class="btn btn-danger" v-if="userId==userData.userId">Supprimer</button></div>
            
        </div>
    <div class="card-body">
        <h5 class="card-title">Créé le {{userData.createdAt}} par {{userData.user.pseudo}}</h5>
        <p class="card-text">{{userData.descriptif}}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        
    </div>
    <div class="row"></div>
    <div class="row"><p><i class="fa-solid fa-thumbs-up"></i> {{userData.nbLikes}}</p></div>
    <div class="row">
        <div class="col-6"><p><i class="fa-solid fa-thumbs-up"></i> liker</p></div>
        <div class="col-6"><p><i class="fa-solid fa-message"></i> commenter</p></div>
    </div>
    </div>
</template>

<script>
export default {
    props:['msg'],
  data() {
    return{
        userData:this.msg,
      pseudo:JSON.parse(localStorage.getItem('leTokenUser')).pseudo,
      userId:JSON.parse(localStorage.getItem('leTokenUser')).userId,
    }
  }

}

</script>

<style>

</style>