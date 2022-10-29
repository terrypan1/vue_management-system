<script setup>
import axios from 'axios';
import { ref } from 'vue';
const emailList = ref([])
const accountValue = ref("")
let num = 0;
let loading = false;
let notEnough = false
const delEmail = ref("")
const delIndex = ref("")
const delSuccess = ref("")
const resAnswer = ref("")
const scrollDistance = ref("")
const userPopUpsBox = ref('');
const accountSearch = ref("")
//加載資料
function load() {
  if (loading) return;//滾輪開關
  loading = true;
  if (notEnough) return;//資料不夠的開關
  axios.post('/admin/getListWhiteSheet', { 
    num: num,
  })
    .then((res) => {
      emailList.value = emailList.value.concat(res.data.whiteSheet)
      num += 10;
      loading = false;
      if (res.data.whiteSheet.length < 10) {
        notEnough = true
      }
      console.log(emailList.value);
    })
}
//計算滾輪到底的距離
function scrollHandle() {
  //scrollHeight-scrollTop-clientHeight
  const scrollHeight = scrollDistance.value.scrollHeight;//整張頁面的高度
  const scrollTop = scrollDistance.value.scrollTop || document.documentElement.scrollTop;//滾輪下拉計算距離頂部的高度
  const clientHeight = scrollDistance.value.clientHeight;//當前視窗的高度
  const distance = scrollHeight - scrollTop - clientHeight//離底部的距離

  if (distance < 50) {
    load();
  }
};
//滾輪監聽
const scrollAddEventListener = () => {
  scrollDistance.value.addEventListener('scroll', scrollHandle);
};
//帳號新增
const accountValueEnter = () => {
  axios.post('/admin/addWhiteSheet', {
    e_mail: accountValue.value
  })
    .then((res) => {
      console.log(res.data);
      if(res.data.message==="emailTypeError"){
        resAnswer.value = "Email格式錯誤"
      }
      else if(res.data.message==="whiteSheetExist"){
        resAnswer.value = "Email帳號已存在"
      }
      else{
        resAnswer.value = res.data.message
      }
    })
  accountValue.value = ""  
  setTimeout(reloadPage, 500);
}
//當前頁面刷新
function reloadPage() {
  window.location.reload()
}
//帳號搜尋
const accountSearchEnter = () => {
  console.log(accountSearch.value)
  axios.post('admin/queryWhiteSheet',{
    "e_mail":accountSearch.value
  })
  .then((res) => {
    emailList.value = res.data.queryResults
  })

}
//刪除
const del = () => {
  axios.post('admin/delWhiteSheet', {
    "e_mail": delEmail.value.e_mail
  })
    .then((res) => {
      console.log(res);
      delSuccess.value = res.data.message
    })
  emailList.value.splice(delIndex.value, 1)
  delEmail.value = ""
  setTimeout(() => {
    delSuccess.value = ""
  }, 5000)
  userPopUpsBox.value = !userPopUpsBox.value;
}
//彈窗
const change = (item, index) => {
  userPopUpsBox.value = !userPopUpsBox.value;
  delEmail.value = emailList.value[index]
  delIndex.value = index
};
//取消
const cancel = (value,index) => {
  userPopUpsBox.value = !userPopUpsBox.value;
}
  

load();
</script>
<template>
  <div class="container">
    <div class="inputClass">
      <div class="addAddress">員工帳號：
        <input type="text" placeholder="E-mail" v-model="accountValue" @keydown.enter="accountValueEnter">
        <button @click="accountValueEnter">添加</button>
      </div>
      <span>{{resAnswer}}</span>
      <div class="search">帳號查詢：
        <input type="text" placeholder="Search E-mail" v-model="accountSearch" @keydown.enter="accountSearchEnter">
        <button @click="accountSearchEnter">搜尋</button>
        
      </div>
      <div class="delSuccess">
        {{delSuccess}}
      </div>
    </div>
    <div class="contentClass" ref="scrollDistance" @scroll="scrollAddEventListener">
      <div class="contentParent" v-for="(item,index) in emailList" :key="index">
        <div class="content">
          <div class="text">{{item.e_mail}}</div>
        </div>
        <button @click="change(item,index)">刪除</button>
      </div>
      <div class="userPopUps"  :class="{ open: userPopUpsBox }" >
        <div class="popUpsBox">
          <div class="popUpsContent" >
            <div class="text">確定要刪除</div>
            <div>{{delEmail.e_mail}}</div>
            
            <div class="buttonClass">
              <button @click="cancel(item,index)">取消</button>
              <button @click="del(item,index)">確定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  

}

.inputClass {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.addAddress {
  display: flex;
  justify-content: space-around;
  width: 55%;
}
.addAddress input{
  width: 50%;
}
.search input{
  width: 50%;
}
.inputClass span{
  color:rgb(5, 166, 85);
  font-size: 15px;
}


.inputClass .search {
  display: flex;
  justify-content: space-around;
  width: 55%;
}


.contentClass {
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  border: thick double black;
  align-items: center;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: overlay;
  //  -moz-border-image: -moz-linear-gradient(top left, #f8100c 0%, #510dd0 100%);
	// -webkit-border-image: -webkit-linear-gradient(top left, #f8100c 0%, #510dd0 100%);
	// border-image: linear-gradient(to bottom right, #f8100c 0%, #510dd0 100%);
	// border-image-slice: 1;
  
}

.contentParent {
  display: flex;
  align-items: center;
}

.content {
  background-color: white;
  border: 2px solid black;
  width: 100%;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: .1s;
}

.content .text {
  width: 13em;
}
.content:hover{
  -moz-border-image: -moz-linear-gradient(top left, #3acfd5 0%, #3a4ed5 100%);
	-webkit-border-image: -webkit-linear-gradient(top left, #3acfd5 0%, #3a4ed5 100%);
	border-image: linear-gradient(to bottom right, #3acfd5 0%, #3a4ed5 100%);
	border-image-slice: 1;
  border-radius: 10px;
  transform: scale(1.05);
}

.contentParent button {
  border-radius: 10px;
  width: 30%;
  height: 70%;
}
.contentParent button:hover {
  transform: scale(1.1);
}

.inputClass input {
  text-align: center;
  border-radius: 10px;
}

.inputClass button {
  border-radius: 10px;
  font-size: auto;
}
.delSuccess{
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
    @keyframes popup {
    0% {transform: scale(0);}
    20% {transform: scale(1.1);}
    50% {transform: scale(0.95);}
    80% {transform: scale(1.05);}
    100% {transform: scale(1);}
  }
  
  }

  .popUpsBox {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    animation: popup 0.5s;
  }

  .popUpsContent {
    border-radius: 10px;
    border: thick double #000;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    width: 300px;
    height: 300px;
    flex-direction: column;
    

    .text {
      text-align: center;
    }

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

      }
    }

    .buttonClass {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }

  }
}
.buttonClass button{
  border-radius: 10px;
}
.buttonClass button:hover{
  border-radius: 10px;
  transform: scale(1.1);
}
@media screen and (max-width:768px){
}

</style>