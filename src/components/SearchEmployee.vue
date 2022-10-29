
<script setup>
import axios from "axios";
import { ref } from "vue";
let loading = false;
let num = 0;
let notEnough = false
const data = ref([]);
const input = ref({ text: "" });
const scrollDistance = ref('')
//加載頁面
function load() {
  if (loading) return;
  loading = true;
  if (notEnough) return;
  axios({
    method: 'post',
    url: '/admin/getListUserData',
    //API要求的資料
    data: {
      num: num
    }
  })
    .then((res) => {
      console.log(res.data.userData)
      for(let i=0; i<res.data.userData.length;i++){
        res.data.userData[i].profilePicture = 'data:image/png;base64,' + res.data.userData[i].profilePicture ;
        if(res.data.userData[i].servicestatus===1){
          res.data.userData[i].servicestatus="在職"
        }else{
          res.data.userData[i].servicestatus = "離職"
        }
      }
      data.value = data.value.concat(res.data.userData)
      num += 10;
      loading = false;
      if(res.data.userData.length<10){
        notEnough = true;
      }
    })
}
//計算滾輪距離
function scrollHandle() {
  //scrollHeight(視窗總高度)-scrollTop(已滾動距離頂部高度)-clientHeight(當前可視高度)
  const scrollHeight = scrollDistance.value.scrollHeight;
  const scrollTop = scrollDistance.value.scrollTop || document.documentElement.scrollTop;
  const clientHeight = scrollDistance.value.clientHeight;
  const distance = scrollHeight - scrollTop - clientHeight
  if (distance < 50) {
    load();
  }
};
//滾輪監聽
const scrollAddEventListener = () => {
  scrollDistance.value.addEventListener('scroll', scrollHandle, false);
};
//儲存
const save = (index) => {
  let serviceStatus = 0
  if(data.value[index].servicestatus==="在職"){
    serviceStatus = 1;
  }else{
    serviceStatus = 0;
  }
  axios.post('/admin/changedServiceStatus', {
    e_mail: data.value[index].e_mail,
    servicestatus: serviceStatus

  })
    .then((res) => {
      console.log(res);
    })
  alert('保存成功');
}
//搜尋
const search = () => {
  axios.post('/admin/queryUserData', {
    "keyword": input.value.text
  })
    .then((res) => {
      console.log(res);
      data.value = res.data.queryResults
      for(let i=0; i<data.value.length;i++){
        data.value[i].profilePicture = 'data:image/png;base64,' + data.value[i].profilePicture ;
        if(res.data.queryResults[i].servicestatus===1){
          res.data.queryResults[i].servicestatus="在職"
        }else{
          res.data.queryResults[i].servicestatus = "離職"
        }
      }
      console.log(data.value);
    })
}
load();
</script>
<template>
  <div class="container">
    <div class="input">
      <input type="text" v-model="input.text" placeholder="search" @keydown.enter="search" />
      <button><img class="magnifier" src='../assets/icon/iconmonstr-magnifier-1-240.png' alt=""
          @click="search"></button>
    </div>
    <!-- {{ userEmail() }} -->
    <ul class="mainView" ref="scrollDistance" @scroll="scrollAddEventListener">
      <li v-for=" (item,index) in data" :key="index">
        <div class="employeePhoto">
          <div class="imgHome">
            <img :src="item.profilePicture" alt="">
          </div>
          <button @click="save(index)">保存</button>
        </div>
        <div class="employeeData" >
          <div class="account">帳號：{{item.e_mail}}</div>
          <div class="name">姓名：{{item.name}}</div>
          <div class="department">部門：{{item.department}}</div>
          <div class="serviceStatus">在職狀態:
            <select v-model="item.servicestatus">
              <option disabled value="">是否在職</option>
              <option>在職</option>
              <option>離職</option>
            </select>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style scoped lang="scss">
.container {
  flex: 3;
  box-sizing: border-box;
  padding: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.container ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 90%;
  max-height: 90vh;
  overflow-y: overlay;
  list-style: none;
}

.container li {
  display: flex;
  margin: 10px 10px;
  width: 45%;
  height: 30%;
  border: 2px solid #ccc;
  border-radius: 10px;
  transform: scale(1);
  transition: .5s;
}
.container li:hover{
  transform: scale(1.05);
  -moz-border-image: -moz-linear-gradient(top left, #3acfd5 0%, #3a4ed5 100%);
	-webkit-border-image: -webkit-linear-gradient(top left, #3acfd5 0%, #3a4ed5 100%);
	border-image: linear-gradient(to bottom right, #3acfd5 0%, #3a4ed5 100%);
	border-image-slice: 1;
  border-radius: 8px;
}

.input {
  display: flex;
  justify-content: center;
}

.input input {
  width: 50%;
  border-radius: 10px;
  text-align: center;
}

.input img {
  padding: 0 5px;
  width: 100%;
}

.magnifier {
  width: 40px;
  height: 40px;
}

.container button {
  border: none;
  background-color: transparent;
  transition: .1s;
}

.container button:hover {
  transform: scale(1.1);
}

.employeePhoto {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin:auto 0;
  align-items: center;
  padding-top: 5px;
  height: 95%;
}

.employeePhoto button {
  border: 2px solid black;
  border-radius: 10px;
  margin: 2px;
  height: 15%;
  width: 50%;
  font-size: 70%;
}
// .imgHome{
//   width: 100px;
//   height: 100px;
// }
.employeePhoto img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin: 5px 0;
  border:2px solid green;
  padding: 5px;
}

.employeeData {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  
}

.employeeData select {
  width: 50%;
  border-radius: 10px;
}

.mainView {
  margin-top: 10px;
  padding: 0px 10px;
}
@media screen and (max-width:768px) {
}
</style>