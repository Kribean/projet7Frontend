<template>
    <nav class="navbar navbar-light bg-light mb-5">
        <div class="col-6">
            <router-link to="/room" class="navbar-brand">
                <img src="../assets/icon.svg" width="30" height="30" class="d-inline-block align-top" alt="groupomania">
                <h1>Groupomania</h1>
            </router-link >
        </div>

        <div class="col-3">
                <button type="button" class="btn btn-primary" @click="profil">Profil</button>
        </div>
        <div class="col-3">
                <button type="button" class="btn btn-danger" @click="disconnect">Se déconnecter</button>
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