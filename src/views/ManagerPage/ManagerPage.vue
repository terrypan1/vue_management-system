<script setup>
import managerLeft from '../../components/manager/ManagerLeft.vue';
import managerRight from '../../components/manager/ManagerRight.vue';
</script>
<template>
  <div class="Manager">
    <managerLeft class="left"></managerLeft>
    <managerRight class="right"></managerRight>
  </div>

</template>
<style scoped>

.Manager{
  display:flex;
}
.left{
  flex: 1;
}
.right{
  flex: 4;
}
@media screen and (max-width:768px) {
  .left{
    display: flex;
    flex-direction: row;
    /* flex: 1; */
    
  }
  .right{
    
    display: flex;
    /* flex:10; */
    /* max-height: 100vh; */
    /* overflow-y: overlay; */

  }
  .Manager{
    flex-direction: column-reverse;
  }
}
</style>