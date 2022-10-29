<script setup>
import { ref } from 'vue';

const userPopUpsBox = ref('');
let change = () => {
  userPopUpsBox.value = !userPopUpsBox.value;
};

</script>

<template>

  <div class="container">
    <!-- 跳轉頁面到首頁 -->
    <div class="homeClass">
      <router-link to="/home_index" class="logoBtn ">
        <span>BoWa</span>
      </router-link>
      <!-- 跳轉頁面到首頁 -->
      <router-link to="/home_index" class="btn homeBtn">
        <img src="../../assets/icon/iconmonstr-home-7-240.png" alt="home">
      </router-link>
    </div>
    <div class="functionClass">
      <router-link to="/managerPage/ModifyPersonalRight" class="btn homeBtn">文章列表</router-link>
      <router-link to="/managerPage/Revise" class="btn homeBtn">修改個人資料</router-link>
      <router-link to="/managerPage/SearchEmployee" class="btn homeBtn">查詢員工資料</router-link>
      <router-link to="/managerPage/AddEmployee" class="btn homeBtn">新增白名單</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;

}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // flex: 1;
  height: 100vh;
  border-right: 2px solid #8d8d8d;
  a:hover {
    background: rgb(133, 221, 133);
    transform: translateY(-5px);
  }
  a {
    text-decoration: none;
    color: white
  }
}

.nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: block;
  }

  .btn {
    display: flex;
  }

  .homeBtn {
    margin-top: 50px;
  }
}

.logoBtn {
  font-family: "Comforter Brush";
    width: 73.2%;
    padding: 5px 0px;
    margin-top: 20px;
    background: rgb(0, 0, 0);
    background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(175, 174, 174) 100%, rgb(0, 212, 255) 100%);
    border: 1px solid #000;
    border-radius: 50px;
    box-shadow: 1px 5px 5px 2px #8d8d8d;
    text-align: center;
  span {
    font-size: 48px;
    color: #fff;
  }
}

.btn {
  width: 56.5%;
  padding: 5px 0px;
  background-color: rgb(0, 0, 0);
  border-radius: 50px;
  box-shadow: 1px 5px 5px 1px #8d8d8d;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    height: 80%;
  }
}

.userBtn {
  border: 0px;
  margin-bottom: 20px;
  overflow: hidden;

  &:hover {
    background: rgb(133, 221, 133);
    transform: translateY(-5px);
    cursor: pointer;
  }
}

.userPopUps {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: #5454547d;

  &.open {
    display: flex;
  }

  .popUpsBox {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
  }

  .popUpsContent {
    border-radius: 10px;
    border: thick double #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 300px;
    height: 300px;

    .popBtn {
      width: 50%;
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 10px;
      color: #8d8d8d;
      box-shadow: 1px 3px 8px 1px #8d8d8d;
      border-radius: 5px;
      overflow: hidden;

      &:hover {
        border-radius: 10px;
        transform: translateY(0px);
        color: #000;
        // img{
        //     transform: translateY(-50px);
        //     filter: drop-shadow(#8d8d8d 0 50px);
        // }
      }
    }

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
.homeClass{
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 37.8%;
  justify-content: space-between;
  align-items: center;
}
.functionClass{
  height: 62.2%;
  width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-around;
}
.functionClass a{
  // margin-top: 20px;
  text-align: center;
  padding:10px 10px;
  font-size: 18px;
  font-family: fantasy;
}

@media screen and (max-width:768px) {
  .container {
    flex-direction: row;
    flex:1;
  }

  .btn {
    width: 20%;
    margin: 0;
  }

  .logoBtn {
    width: 50%;

    span {
      font-size: 24px;
    }
  }

}
@media screen and (max-width:768px){
  .container{
    flex-direction: row;
    
  }
  .homeClass{
    flex-direction: row;
  }
  .functionClass{
    flex-direction: row;
  }
}
</style>