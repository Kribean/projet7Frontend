<template>
    <div class="card m-3 cardWidth " v-bind:id="commData.id+'cardComm'">
      <div class="card-header">
    Créé par {{commData.user.pseudo}}
  </div>
    <div class="card-body">
        <form>
            <div class="row">
                <textarea class="form-control" v-bind:id="commData.id+'comm'" rows="3" required v-if="boolAppear" v-model="commData.descriptif"></textarea>
                <p class="lead" v-else>{{commData.descriptif}}</p>
                
        </div>
        <div class="row">
            <div class="col-lg-3 col-xl-0"><button type="button" class="btn btn-dark m-2" v-show="!boolAppear" @click="boolAppear = !boolAppear">Modifier</button></div>
            <div class="col-lg-3 col-xl-4"><button type="button" class="btn btn-success m-2" v-show="boolAppear" @click="validateComment(commData.id)">Valider</button></div>
            <div class="col-lg-3 col-xl-4"><button type="button" class="btn btn-danger m-2" v-show="boolAppear" @click="deleteComment(commData.id)">Supprimer</button></div>
        </div>
        </form>
    </div>
    </div>
</template>

<script>
    export default {
        props:['comm'],
        data(){

            return{
                commData:this.comm,
                boolAppear:false}

        },
        methods: {
            validateComment(id){
                this.boolAppear=false;
                let commentContent = document.getElementById(id+'comm');
                console.log(id+'comm');
                console.log(commentContent);
                this.commData.descriptif = commentContent.value;
                fetch('http://localhost:3000/api/message/comments/'+id+'/modified',{
                    method: 'PUT',
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token
                    },
                    body: JSON.stringify({
                    descriptif:commentContent.value,
                    })
                })
            },
            deleteComment(id){
                this.boolAppear=false;
                let commentContent = document.getElementById(id+'cardComm');
                fetch('http://localhost:3000/api/message/comments/'+id+'/deleted',{
                    method: 'DELETE',
                    headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token
                    }
                })
                .then(()=>commentContent.remove())

            },
        },
        


    }

</script>

<style>
.cardWidth{
    width:80%;
}

</style>