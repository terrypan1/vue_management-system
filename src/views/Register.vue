<script  setup>
  import router from '@/router';
import { onMounted, ref, watchEffect } from 'vue';
import { useRegisterStore } from '../stores/register';
  const store = useRegisterStore()
  const account = ref(""); const password = ref(""); const name = ref(""); const department = ref(""); const checkVerify = ref("")
  const checkEmail = []
  const registerList = []
  const $accountSpan = ref(null)
  const $password = ref(null)
  const $passwordSpan = ref(null)
  const $end = ref(null)
  const $back = ref(null)
  const dataEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  //
  const handleCheck = async() => {
      //讓陣列長度回到0 清空的概念
      checkEmail.length = 0
      // console.log(checkEmail);
      checkEmail[0]={
          "e_mail": account.value,
      }
      await store.addCheckEmail(checkEmail)
      
      if(store.checkEmail==='VerifiedEmailWasSent'){
        $accountSpan.value.style.color = 'blue'
        $accountSpan.value.innerHTML = '驗證碼已寄出'
      }else{
        $accountSpan.value.innerHTML = '請重新驗證'
      }
  }
  //直接推到第0格,使用push會導致累積
  const handleSend = async() => {
      registerList[0]={
          "e_mail": account.value,
          "password": password.value,
          "name": name.value,
          "department": department.value,
          "vCode": checkVerify.value
      }
      await store.addRegister(registerList)
      if(store.end ==='registrationSussesful'){
        $end.value.style.color = 'blue'
        $end.value.innerHTML = '註冊成功'
        $back.value.innerHTML = '3秒後回到首頁'
        setTimeout(() => {
          router.push('/Login')
        }, 3000);
      }else{
        $end.value.style.color = 'red'
        $end.value.innerHTML = '註冊失敗'
      }
  }
  const toLogin = ()=>{
    router.push('/Login')
  }
  onMounted(() => {
      watchEffect(() => {
          if(account.value.toLocaleString() === ''){
              $accountSpan.value.innerHTML = ''
          }
          else if (!dataEmail.test(account.value)) {
              $accountSpan.value.innerHTML = '請輸入正確格式'
          } else {
              $accountSpan.value.innerHTML = ''
          }
      })
      watchEffect(() => {
          // let req = /^[a-zA-Z0-9-_]{6,20}$/
          //提示用戶的span
          if (password.value.toLocaleString().length === 0) {
              $passwordSpan.value.innerHTML = ''
          } else if (password.value.toLocaleString().length < 6) {
              $passwordSpan.value.innerHTML = '最少 6 個字符最最多20個字元，至少 1 個大寫字母 1小寫字母、1 個數字和 1 個特殊字符特殊字符限制為!@#$%&*//'
          } else {
              $passwordSpan.value.innerHTML = ''
          }
      })
  })
  </script>
<template>
  <div class="content-class">
      <header class="border1px" @click.stop="function(){}">
        <div class="main">
          <div class="accountPosition item">
          <img src="../assets/icon/iconmonstr-user-5-240.png" alt="">
            信箱: <input type="text" v-model="account" placeholder="輸入信箱"><br>
            <span class="msg" ref="$accountSpan"></span>
          </div>
          <button class="accountBtn" @click="handleCheck">獲取驗證碼</button>
          <div class="password item">
            <img src="../assets/icon/iconmonstr-key-12-240.png" alt="">
            密碼: <input type="password" v-model="password" ref="$password" placeholder="輸入6~20位密碼" maxlength="20">
            <br>
            <div class="msg" ref="$passwordSpan"></div>
          </div>
          <div class="name item">
          <img src="../assets/icon/iconmonstr-book-25-240.png" alt="">
            姓名: <input type="text" v-model="name" ref="$name" placeholder="輸入姓名">
          </div>
          <div class="department item">
          <img src="../assets/icon/iconmonstr-home-6-240.png" alt="">
            部門: <input type="text" v-model="department" placeholder="部門填寫">
          </div>
          <div class="checkVerify item">
          <img src="../assets/icon/iconmonstr-lock-5-240.png" alt="">
            驗證碼: <input type="text" v-model="checkVerify" placeholder="驗證碼輸入">
          </div>
          
          <div class="buttonClass">
            <button @click="toLogin">回到登入</button>
          <a @click="handleSend"><img src="../assets/icon/iconmonstr-plus-square-multiple-filled-240.png" alt=""></a>
        </div>
          <span class="end" ref="$end"></span>
          <span class="back" ref="$back"></span>
        </div>
      </header>
    </div>
</template>

  
<style scoped lang="scss">
.content-class {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;

}

.main button {
  border: 2px solid black;
}

.main input {
  border-radius: 8px;
}

.main button {
  border-radius: 8px;
}


.border1px {
  border: thick double black;
  border-radius: 8px;
  margin: auto 0;
  width: 30%;
  height: 70%;
  display: flex;
  justify-content: center;
}

.msg {
  font-size: 14px;
  color: red;
}

.end {
  margin-left: 40%;
  font-size: 16px;
  color: blue;
}

.back {
  margin-left: 20%;
  font-size: 16px;
  color: blue;
}


.accountBtn {
  color: blue;
  background-color: #fff;
  cursor: pointer;
  margin-left: 55%;
}


.item {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  margin: auto;
}

.item img {
  width: 15%;
  height: 90%;
  margin: 5px;
}

.item input {
  width: 50%;
  margin: 5px;
  text-align: center;
}

.buttonClass {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 5%;
  height: 10%;
  align-items: center;
}
.buttonClass img:hover,.buttonClass a:hover {
  background-color:#fff
}
.buttonClass button:hover{
  transform: scale(1.1);
}

.item span {
  text-align: center;
}
.buttonClass button{
  width: 25%;
  height: 65%;
  font-size: 16px;
}
.buttonClass img{
  width: 80%;
  height:100%;
}
.buttonClass a{
  width: 20%;
  height: 100%;
  font-size: 16px;
}
@media screen and (max-width:1100px) {
  .border1px {
    width: 40%;
  }
}

@media screen and (max-width:825px) {
  .border1px {
    width: 50%;
  }
}
@media screen and (max-width:664px) {
  .border1px {
    width: 60%;
  }
}
@media screen and (max-width:550px) {
  .border1px {
    width: 70%;
  }
}
@media screen and (max-width:475px) {
  .border1px {
    width: 80%;
  }
}
</style>