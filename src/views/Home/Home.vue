<script setup>
import { useArticleContent } from '@/stores/Article';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

const intent = ref(''); //滾動請求判斷目標el
const articleContent = useArticleContent();
let num = 0; //取得文章筆數計算


articleContent.switch = false;
articleContent.getArticleData(num);
function scrollListener(){
  const scrollHeight =intent.value.scrollHeight; //取得頁面最大高度
  const scrollTop = intent.value.scrollTop
    || document.documentElement.scrollTop; //取得當前頁面滾動條y座標的位置
  const intentHeight = intent.value.clientHeight; //當前頁面高度
  const distance = scrollHeight - scrollTop - intentHeight; //頁面最大高-滾動座標-當前頁面高度
  if (distance < 50) {
    num+=10
    //當目標高度小於50，再次fetch
    articleContent.getArticleData(num);
  }
};


onMounted(() => {
  articleContent.article = [];
})

</script>

<template>
  <div class="container">
    <!-- 發問 -->
    <router-link to="/home_index/post" class="post">發  問</router-link>
    <!-- 文章預覽 -->
    <ul ref="intent" class="content" @scroll="scrollListener()">
      <li  v-for="item in articleContent.article" class="item">
        <router-link to="/home_index/seeArticle" @click="articleContent.browseArticles(item)">
          <h3>標題：{{item.title}}</h3>
          <div class="userDetail">
            <img :src="item.profilePicture" alt="img" class="userImg">
            <span class="userName">{{item.author}}</span>
            <span class="time">{{item.created_at}}</span>
          </div>
          <hr>
          <p>{{item.content}}</p>
          <hr>
          <div class="footer">
            <div class="department">部門：{{item.department}}</div>
            <div class="message">留言數：{{item.messageNum}}</div>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- search bar -->
    <router-link to="/home_index/articleSearch" class="search">
      <img src="../../assets/icon/iconmonstr-magnifier-1-240.png" alt="搜尋">
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  hr{
    color: #9a9999;
  }
}
.search{
    position: fixed;
    right: 20px;
    bottom: 20px;
    &:hover{
      background-color: white;
    }
    img{
      width: 50px;
      height: 80%;
    }
  }
.content{
  width: 80%;
  margin: 0 auto;
  margin-top: 15px;
  max-height: 90vh;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color:rgb(94, 93, 96);
    border-radius: 5px;
  }
  a:hover{
    background: rgba(255, 255, 255, 0);
  }
}
.item{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  padding: 5px 10px;
  border: thick double rgb(94, 93, 96);
  .userDetail{
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
    .userImg{
      width: 40px;
      height: 40px;
    }
    span{
      margin-left: 10px;
    }
    .time{
      color: #8d8d8d;
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
.post{
  height: 50px;
  width: 80%;
  font-size: 24px;
  line-height: 2;
  // background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(175,174,174,1) 100%, rgba(0,212,255,1) 100%);
  background-color: black;
  color: white;
  margin-top: 10px;
  text-align: center;
  border-radius: 50px;
  border: 1px solid rgb(169, 169, 169);
  box-shadow: 1px 2px 2px 1px #8d8d8d;
  &:hover{
    background-color: rgb(133, 221, 133);
  }
}


</style>