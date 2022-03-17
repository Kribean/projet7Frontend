<template>
    <nav class="navbar navbar-light bg-light mb-5">

            <router-link to="/room" class="navbar-brand">
                
                <div class="col-6 d-flex justify-content-between"><img src="../assets/icon.svg" width="60" height="60" class="d-inline-block align-top" alt="groupomania"><h1>Groupomania</h1></div>
 
            </router-link >


        <div class="col-6 d-flex justify-content-end">
                <button type="button" class="btn btn-primary m-1" @click="profil">Profil</button>

                <button type="button" class="btn btn-danger m-1" @click="disconnect">Se déconnecter</button>
        </div>
    </nav>
</template>

<script>
    export default {
        methods:{
            disconnect(){
                localStorage.removeItem('leTokenUser');
                this.$router.push('login')
            },
            profil(){
                this.$router.push('profile')
            }
        }
    }

</script>

<style>

</style>