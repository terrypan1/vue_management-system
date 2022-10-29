<script setup>
import axios from 'axios';
import { onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login';

const router = useRouter()
const store = useLoginStore()
const name = ref(""); const password = ref(""); const popUp = ref(''); const account = ref(""); const checkEmail = []
let userData = '';
const $name = ref(''); const $password = ref(''); const $accountSpan = ref(null)
const dataEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// 
const userLogin = (url) => {
  //測試帳號
  if (name.value === 'user' && password.value === '1111') {
    localStorage.setItem('userName', JSON.stringify(userData));
    axios.get('http://localhost:3000/memberData')
      .then(res => {
        localStorage.setItem('nav', JSON.stringify(res.data))
        store.userID = 0
        localStorage.setItem('login', JSON.stringify(store.userID))
        router.push('/home_index')
      })
  } else if (name.value === 'admin' && password.value === '2222') {
    localStorage.setItem('userName', JSON.stringify(userData));
    axios.get('http://localhost:3000/adminData')
      .then(res => {
        localStorage.setItem('nav', JSON.stringify(res.data))
        store.userID = 1
        localStorage.setItem('login', JSON.stringify(store.userID))
        router.push('/home_index')
      })
  }

  //正常
  if (name.value === '' || password.value === '') {
    if (name.value === '') {
      $name.value.innerHTML = '請輸入帳號'
    } else {
      $password.value.innerHTML = '請輸入密碼'
    }
  }
  else {
    //1.先將userName跟密碼推到userData
    //2.userData送到store
    //3.localStorage.setItem ("userName")
    store.userName = name.value;
    userData = {
      "userName": name.value,
      "password": password.value
    }
    store.postLogin(userData);
  }
}
//編程式導航 沒登入挑轉到註冊到Register.vue
const toRegister = (url) => {
  router.push(url)
}
//忘記密碼
const forget = () => {
  popUp.value = !popUp.value
  console.log(popUp.value);
}
//送出email
const postEmail = () => {
  checkEmail.length = 0
  checkEmail[0] = {
    "e_mail": account.value,
  }
  store.addCheckEmail(checkEmail)
  if (store.checkEmail === 'newPasswordWasSent') {
    $accountSpan.value.style.color = 'blue'
    $accountSpan.value.innerHTML = '驗證碼已寄出'
  } else {
    $accountSpan.value.innerHTML = '請重新驗證'
  }
}


onMounted(() => {
    watchEffect(() => {
    if (name.value.length > 0) {
      $name.value = ''
    }
    if (password.value.length > 0) {
      $password.value = ''
    }
  })
  watchEffect(() => {
    if (account.value.toLocaleString() === '') {
      $accountSpan.value.innerHTML = ''
    }
    else if (!dataEmail.test(account.value)) {
      $accountSpan.value.innerHTML = '請輸入正確格式'
    } else {
      $accountSpan.value.innerHTML = ''
    }
  })
})
</script>

<template>
  <div class="content-class">
    <header class="border1px">
      <div class="main">
        <div class="logo">BoWa</div>
        <div class="login">
          <img src="../assets/icon/iconmonstr-user-5-240.png" alt="">
          <span>帳號:</span><input type="text" v-model="name" placeholder="輸入帳號"><br>
          <span class="msg" ref="$name"></span>
        </div>
        <div class="login">
          <img src="../assets/icon/iconmonstr-key-12-240.png" alt="">
          <span>密碼:</span> <input type="password" v-model="password" placeholder="輸入密碼"><br>
          <span class="msg" ref="$password"></span>
        </div>
        <p class="forgetPassword" @click="forget">忘記密碼</p>
        <div class="footer">
          <div @click="toRegister('/register')" class="register"><img src="../assets/icon/iconmonstr-cv-1-240.png" alt="註冊"></div>
          <div @click="userLogin('/home_index')" class="loginBtn"><img src="../assets/icon/iconmonstr-door-5-240.png" alt="登入"></div>
        </div>
      </div>
      <div class="userPopUps" :class="{ open:popUp }">
        <div class="popUpsBox">
          <div class="popUpsContent">
            <div class="inputBox">
              輸入e-mail:
              <input type="text" v-model="account" placeholder="輸入信箱"><br />
              <span class="msg" ref="$accountSpan"></span><br />
            </div>
            <div class="btnBox">
              <div @click="postEmail">確認送出</div><br />
              <div @click="forget">返回</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.content-class {
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
.border1px {
  width: 35vw;
  height: 40vw;
  margin: auto 0;
  border: thick double black;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo{
    font-family: 'Comforter Brush';
    padding: 10px 15px;
    margin-bottom: 40px;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(175,174,174,1) 100%, rgba(0,212,255,1) 100%);
    border: 1px solid rgb(255, 255, 255);
    border-radius: 50px;
    text-align: center;
    font-size: 36px;
    color: #fff;
  }
}

.main {
  height: 30vw;
  width: 25vw;
  position: relative;
  img{
    width: 20%;
    height: 20%;
    margin-right: 10px;
  }
  .login{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    input{
      padding-left: 3px;
    }
  }
  .footer{
    position: absolute;
    width: 50%;
    height: 20%;
    right: 0%;
    bottom: 0%;
    // margin-top: 30%;
    // margin-left: 55%;
    display: flex;
    justify-content: flex-end;
    div{
      margin-left: 15px;
      display: flex;
      justify-content: flex-end;
    }
    img{
      
      width: 70%;
      height: 70%;
      cursor: pointer;
    }
    .register{
      position: relative;
      &:hover::before {
        position: absolute;
        text-align: center;
        width: 10vw;
        top: -40px;
        color: #fff;
        font-size: .8em;
        background: #346e7a;
        padding: 5px;
        border-radius: 5px;
        content: '還沒註冊嗎?註冊';
      }
    }
  }
  .forgetPassword{
      margin-left: 70%;
      width: 6vw;
      &:hover{
        cursor: pointer;
        transform: translateY(-5px);
        color: red;
      }
    }
}


.main button {
  border: 2px solid black;
  border-radius: 8px;
  margin-top: 10px;
  padding: 5px;
}

.main input {
  border-radius: 8px;
}

.password {
  margin-top: 10px;
}

.msg {
  font-size: 14px;
  color: red;
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
    .inputBox{
      width: 80%;
      display: flex;
      flex-direction: column;
      input{
        margin-top: 20px;
        border-radius: 5px;
        padding: 0px 5px;
      }
    }
    .btnBox{
      width: 80%;
      display: flex;
      justify-content: end;
      div{
        margin-left: 5px;
        padding: 3px;
        &:hover{
          cursor: pointer;
          transform: translateY(-5px);
          color: #fff;
          background-color: #000;
          border-radius: 10px;

        }
      }
    }
  }
}
</style>

