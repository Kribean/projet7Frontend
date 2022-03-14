<template>
    <div class="modalIchi">
        <div class="modalIchi__inner">
            <h2>
                <slot name="title">
                </slot>
            </h2>
            <div>
                <slot>
                </slot>
            </div>
            <button class="btn btn-danger" @click="$emit('closeModal')">Fermer</button>
        </div>
    </div>
</template>

<script>
    export default{
        emits:['closeModal']
    }
</script>

<style scoped>
    .modalIchi{
        width:100%;
        height:100vh;
        background:rgba(0,0,0,0.5);
        z-index:10;
        position:fixed;
        top:0;
        left:0;
        padding-top:30px;
    }

    .modalIchi__inner{
        max-width:80%;
        min-width:20%;
        padding:1em 2em;
        height:auto;
        margin:auto;
        background:white;
    }
</style>