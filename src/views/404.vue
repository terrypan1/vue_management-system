<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
//跳回首頁
const toHome = ()=>{
    router.push('/home_index')
}
</script>

<template>
    <div @click="toHome ">404</div>
</template>

<style lang="scss" scoped>
    div {
        margin: 10px 50%;
        font-size: 100px;
        cursor: pointer;
    }
</style>