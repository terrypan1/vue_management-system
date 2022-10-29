<script setup>
import MemberLeft from '@/components/member/memberLeft.vue';
import MemberRight from '@/components/member/memberRight.vue';
</script>
<template>
  <div class="Blog">
    <MemberLeft class="left"/>
    <MemberRight class="right" />
  </div>
</template>
<style scoped lang="scss">
.Blog {
  display: flex;
}
@media screen and (max-width:768px) {
  .Blog{
    flex-direction: column-reverse;
    height: 100vh;
      .left{
      flex: 1;
    }
    .right{
      flex: 10;
    }
  }
  
}
</style>