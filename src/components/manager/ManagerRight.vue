<script setup>

</script>

<template>
    <div class="container">
        <RouterView  />
    </div>
</template>

<style scoped lang="scss">

.container{
    // flex: 4;
    li{
        list-style:none;
    }
}
@media screen and (max-width:768px){
    .container{
        display: flex;
        flex:9
    }
}
</style>