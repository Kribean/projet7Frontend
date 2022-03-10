
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
                <button type="button" class="btn btn-light btn-lg btn-block btn-full mt-2 mb-2 mr-2" >Que voulez-vous dire?</button>
            </div>
            
        
    </div>
    </section>
    <div class="row" v-for="msg in tableauMessages" :key="msg"><!--mettre les commentaires-->
        <CardComponent v-bind:msg="msg">
        </CardComponent>
    </div>
</div>

</template>

<script>
import CardComponent from '../components/CardComponent.vue'
const API_URL ='http://localhost:3000/api/message/'
export default {
    name: 'RoomView',
    components: {
        CardComponent,
    },
    
  data() {
    return{
      pseudo:JSON.parse(localStorage.getItem('leTokenUser')).pseudo,
      tableauMessages:[]

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