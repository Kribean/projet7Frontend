<template>
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
  <div class="form-group">
    <label for="email">Votre email</label>
    <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp" placeholder="Entrer votre email" required>
    <p id="emailErrorMsg"></p>
  </div>
  <div class="form-group">
    <label for="password">Mot de passe</label>
    <input type="password" class="form-control" id="password" v-model="password"   required>
    <p id="passwordErrorMsg"></p>
  </div>

  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="check">
    <label class="form-check-label" for="check">J'ai lu la RGPD</label>
    <p id="checkErrorMsg"></p>
  </div>
  <button type="submit" @click="verifyUserData" class="btn btn-primary">Envoyer</button>
</form>

</template>

<script>
	export default {
		data() {
			return {
				nom:'',
                prenom:'',
                email:'',
                password:'',
                check:false
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
                if(lesValiditeDeChamps)
                {
                    fetch('http://localhost:3000/api/auth/signup',{
                        method: 'POST',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            nom:this.nom,
                            prenom:this.prenom,
                            pseudo:this.pseudo,
                            email:this.email,
                            motDePasse:this.password
                        })
                    })
                    .then(()=>{
                        this.$router.push('login')})
                }
            }
		},
		created() {
			
		}
	}
</script>

<style>

</style>