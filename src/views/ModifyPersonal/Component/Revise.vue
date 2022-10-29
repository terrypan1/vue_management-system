<script setup>
import axios from "axios";
import { onMounted, ref } from 'vue';
import Todo from './Todo.vue';
const isImg =ref(true)
const img = ref([])//後端傳來的圖片
const upLoadImg = ref([])//使用者上傳的圖片
// https://juejin.cn/post/7132840437777825829
const formData = new FormData();
function addImg(e) {
    const file = e.target.files[0]; //獲得上傳圖片的方法
    //console.log(e.target.files[0]);
    //uploadImg(file); //將文件送到後端
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', imageLoaded);
    formData.append("image", file);
}
function uploadImg(e) {
    //使用formData上傳文件
    formData.append("username", 'project');//打包就不用
    console.log(formData.get("username"));
    console.log(formData.get("image"));
    // console.log(formData.entries().next() );
    //'http://192.168.50.76:3000/api/uploadImg'
    axios.post(('/member/uploadImg'), formData,)
        .then((res) => {
            console.log(res);//data: {message: 'image was sent'} //data: {message: 'File too large'}
        });
}
const imageLoaded = (e) => {
    upLoadImg.value = e.target.result;
    if(upLoadImg.value){
        isImg.value = !isImg.value
    }
}
onMounted(() => {
    axios.post('/member/getProfilePicture')
        .then((res) => {
            //console.log(res.data.profilePicture);
            img.value.push("data:image/png;base64," + res.data.profilePicture)
            console.log(img.value[0]);
        });
})

</script>
<template>
    <div class="container">
        <div class="main">
            <div class="img">
                <img v-if="isImg" :src="img[0]" class="pic" /><br>
                <img v-if="upLoadImg" :src="upLoadImg" class="pic" /><br>
                <div class="inside">
                    <input type="file" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg">
                    <button @click="uploadImg(img)" class="btn">上傳</button>
                </div>
            </div>
            <Todo></Todo>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    flex: 4;

    li {
        list-style: none;
    }
}

.main {
    flex: 1;
}

.img {
    margin: 3% 0 0 30%;
    width: 200px;
    height: auto;
}

.pic {
    width: 200px;
    height: auto;
}

.btn {
    width: 30%;
    padding: 5px 0px;
    background-color: rgba(206, 206, 206, 1);
    border-radius: 50px;
    box-shadow: 1px 7px 5px 2px #8d8d8d;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.topInput {
    margin-top: 20px;
    margin-left: 30%;
}

.topBtn {
    margin-top: 30px;
    margin-left: 25%;
}
.inside {
    display: flex;
}

@media screen and (max-width:768px) {
    .navBox {
        margin-top: 10px;
    }

}

</style>