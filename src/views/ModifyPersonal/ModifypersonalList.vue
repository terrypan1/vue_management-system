<script setup>
import ModifyPersonalLeft from '../ModifyPersonal/Component/modifyPersonalLeft.vue';
import ModifyPersonalRight from '../ModifyPersonal/Component/modifyPersonalRight.vue';
</script>
<template>
    <div class="Blog">
      <ModifyPersonalLeft/>
      <ModifyPersonalRight />
    </div>
</template>
<style scoped>
    .Blog {
      display: flex;
    }
    
    .Blog .left {
      flex: 5;
    }
    
    @media screen and (max-width:768px) {
      .Blog {
        flex-direction: column;
      }
    
    }
    </style>