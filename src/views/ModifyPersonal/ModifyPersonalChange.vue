<script setup>
import ModifyPersonalLeft from '../ModifyPersonal/Component/modifyPersonalLeft.vue';
import Revise from './Component/Revise.vue';

</script>
<template>
    <div class="container">
        <ModifyPersonalLeft></ModifyPersonalLeft>
        <Revise></Revise>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    li {
        list-style: none;
    }
}
@media screen and (max-width:768px) {
    .container {
        flex-direction: column;
    }
}
</style>