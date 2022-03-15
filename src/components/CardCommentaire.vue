<template>
    <div class="card m-3 cardWidth">
    <div class="card-body">
        <form>
            <div class="row">
                <textarea class="form-control" rows="3" required v-if="boolAppear" v-model="commData.descriptif"></textarea>
                <p class="lead" v-else>{{commData.descriptif}}</p>
                
        </div>
        <div class="row">
            <div class="col-3"><button type="button" class="btn btn-light m-2" @click="boolAppear = !boolAppear">Modifier</button></div>
            <div class="col-3"><button type="button" class="btn btn-success m-2" v-show="boolAppear">Valider</button></div>
            <div class="col-3"><button type="button" class="btn btn-danger m-2" v-show="boolAppear">Supprimer</button></div>
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
        


    }

</script>

<style>
.cardWidth{
    width:80%;
}

</style>