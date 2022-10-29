<script setup>
import modifyPersonalLeft from './Component/modifyPersonalLeft.vue';
import modifyPersonalSeeArticle from './Component/modifyPersonalSeeArticle.vue';
</script>
<template>
    <div class="container">
      <modify-personal-left />
      <modify-personal-see-article />
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