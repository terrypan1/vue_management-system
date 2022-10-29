<script setup>
import { ref } from "@vue/reactivity";
import { useArticleContent } from "../../stores/Article";


const articleContent = useArticleContent();
const searchValue = ref('');
function clearInput() {
    searchValue.value = '';
}
</script>

<template>
    <div class="container">
    <!-- searchBox -->
    <div class="searchBox"><input type="text" v-model="searchValue" placeholder="搜尋文章標題" >
        <img src="../../assets/icon/iconmonstr-magnifier-1-240.png" alt="搜尋" @click="articleContent.searchArticle(searchValue),clearInput()">
    </div>
    <!-- search結果 -->
    <ul class="searchResults">
        <li v-for= "item in articleContent.articleSearch" class="searchItem">
            <router-link to="/home_index/seeArticle" @click="articleContent.browseArticles(item)">
                <h3>{{item.title}}</h3>
                <div class="userDetail">
                <img :src="item.profilePicture" alt="userImg" class="userImg">
                <span class="userName">{{item.author}}</span>
                </div>
                <p>{{item.content}}</p>
                <div class="footer">
                    <div>部門：{{item.department}}</div>
                    <div class="message">留言數：{{item.messageNum}}</div>
                </div>
            </router-link>
        </li> 
    </ul>
    </div>
</template>

<style scoped lang="scss">
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.searchBox{
    margin-top: 20px;
    width: 80%;
    height: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    input{
        width: 75%;
        height: 50px;
        text-align: center;
        border-radius: 50px;
        border: 2px solid rgb(94, 93, 96);
        font-size: 26px;
        &::-webkit-input-placeholder{
            font-size: 26px;
        }
    }
    img{
        margin-left: 50px;
        width: 50px;
        height: 70%;
        cursor: pointer;
        &:hover{
            transform: translateY(-5px);
        }
    }
}
.searchResults{
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
    max-height: 90vh;
    overflow-y: overlay;
    &::-webkit-scrollbar {
        width: 1px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0);
    }
    a:hover{
    background: rgba(255, 255, 255, 0);
    }
}
.searchItem{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 5px 10px;
    border: thick double rgb(94, 93, 96);
    .userDetail{
        display: flex;
        align-items: center;
        .userImg{
        width: 40px;
        height: 40px;
        }
        .userName{
        margin-left: 10px;
        }
    }
    p{
        width: 60vw;
        height: 9vw;
        overflow: hidden;
    }
    .footer{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>