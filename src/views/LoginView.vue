<template>
<div class="row">
  <p id="messageErr"></p>
</div>
<div class="row">
    <div class="col-2"></div>
    <div class="col-8">
  <form>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email" placeholder="Entrer email" required>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
  </div>

  <button type="submit" @click="verifyUserLogin" class="btn btn-primary">Envoyer</button>
</form>
    </div>
    <div class="col-2"></div>
</div>

</template>

<script>
export default {
  data() {
    return{
      email:'',
      password:'',
      messageErr:''
    }
  },
  methods: {
    verifyUserLogin(){
                    fetch('http://localhost:3000/api/auth/login',{
                        method: 'POST',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            email:'bramael.bruno@gmail.com',
                            motDePasse:"azerty"
                        })
                    })
                    .then((data)=>{
                      return data.json()})
                    .then((data)=>{console.log(data);
                      localStorage.setItem('leTokenUser',JSON.stringify(data))})
                    .catch(()=>{return document.getElementById('messageErr').textContent='Les identifiants taper n\' ont pas été retrouvé'})
    }
    
  },


}


</script>

<style>

</style>