<script setup>
import { ref } from '@vue/reactivity';
import { useArticleContent } from '../../stores/Article';
const upData = useArticleContent();
const articleValue = ref('');
const title = ref('');
</script>

<template>
    <div class="container">
        <div class="title">標題：
            <input type="text" v-model="title" >
        </div>
        <div class="postBox">
            <textarea name="post" placeholder="想告訴大家什麼呢？" class="postContent" v-model="articleValue"></textarea>
            <router-link to="/home_index" @click="upData.updatedArticleData(title,articleValue)">
                <img src="../../assets/icon/iconmonstr-telegram-5-240.png" alt="送出">
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container{
        width: 100%;
        .title{
            width: 80%;
            margin: 20px auto;
            display: flex;
            font-size: 32px;
            font-weight: bold;
            input{
                margin-left: 10px;
                width:80%;
                border-radius: 10px;
                text-align: center;
                font-size: 26px;
            }
        }
    }
    .postBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        .postContent{
            padding: 10px;
            font-size: 24px;
            width: 80%;
            height: 40vw;
            resize: none;
            border:10px double #000;
        }
        a{
            position: absolute;
            bottom: 20px;
            right: 20px;
            overflow: hidden;
            &:hover{
                background-color:#fff;
                img{
                    transform: translateY(-75px);
                    filter: drop-shadow(rgb(133, 221, 133) 0 75px);
                }
            }
        }
        img{
            width: 5vw;
        }
    }
</style>