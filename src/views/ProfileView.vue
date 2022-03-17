<template>
<NavBarAfter></NavBarAfter>
<div class="container">
    <form class="formulaire">
      <div class="form-group">
    <label for="nom">Nom</label>
    <input type="text" class="form-control" id="nom" v-model="nom" aria-describedby="emailHelp" placeholder="Entrer nom" pattern="[A-Za-z]{2,10}[ -]?[A-Za-z]{2,10}" required>
    <p id="nomErrorMsg"></p>
  </div>
        <div class="form-group">
    <label for="prenom">Prenom</label>
    <input type="text" class="form-control" id="prenom" v-model="prenom" aria-describedby="emailHelp" placeholder="Entrer prenom" pattern="[A-Za-z]{2,10}[ -]?[A-Za-z]{2,10}" required>
    <p id="prenomErrorMsg"></p>
  </div>
          <div class="form-group">
    <label for="pseudo">Pseudo</label>
    <input type="text" class="form-control" id="pseudo" v-model="pseudo" aria-describedby="emailHelp" placeholder="Entrer pseudo" pattern="[A-Za-z]{2,10}[ -]?[A-Za-z]{2,10}" required>
    <p id="pseudoErrorMsg"></p>
  </div>
  <button type="submit" @click="verifyUserData" class="btn btn-primary">Modifier</button>
</form>
<div class="row">
    <div class="col-2"></div>
    <div class="col-8"><button type="submit" @click="deleteProfil" class="btn btn-danger">Supprimer mon compte</button></div>
    <div class="col-2"></div>
</div>
</div>

</template>

<script>
import NavBarAfter from '../components/NavBarAfter.vue'
	export default {
    name: 'ProfileView',
    components: {NavBarAfter },
		data() {
			return {
				nom:JSON.parse(localStorage.leTokenUser).nom,
                prenom:JSON.parse(localStorage.leTokenUser).prenom,
                pseudo:JSON.parse(localStorage.leTokenUser).pseudo,
			}
		},
		methods:{
            verifyUserData(){
                let lesValiditeDeChamps = true;
                for (let input of document.querySelectorAll(".formulaire input"))
                {
                    if(input.getAttribute('type')!='submit')
                    {
                        if(!(input.reportValidity()))
                        {
                            lesValiditeDeChamps = false;
                            document.getElementById(input.getAttribute('id').concat('ErrorMsg')).textContent="Vous avez mal complété ce champ";                            
                        }
                        else
                        {
                            document.getElementById(input.getAttribute('id').concat('ErrorMsg')).textContent="";
                        }
                    }
                }
                alert(lesValiditeDeChamps);
                if(lesValiditeDeChamps)
                {
                    fetch('http://localhost:3000/api/auth/modifyProfil',{
                        method: 'PUT',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json',
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token,
                        },
                        body: JSON.stringify({
                            nom:this.nom,
                            prenom:this.prenom,
                            pseudo:this.pseudo,

                        })
                    })
                    .then(()=>{
                        localStorage.setItem('leTokenUser', JSON.stringify({pseudo: this.pseudo, nom: this.nom, prenom: this.prenom, userId:JSON.parse(localStorage.leTokenUser).userId, token:JSON.parse(localStorage.leTokenUser).token}));
                        this.$router.push('room')})

                }
            },

            deleteProfil(){
                fetch('http://localhost:3000/api/auth/deleteProfil',{
                method: 'DELETE',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.leTokenUser).token
                }
                })
                .then(()=>{
                    localStorage.removeItem('leTokenUser');
                    this.$router.push('login');
                })
                
            
            }
    }

	}
</script>

<style>

</style>