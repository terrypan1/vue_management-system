<script setup>
import { usemodifyPersonal } from '@/stores/modifyPersonal.js';
import axios from "axios";
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy, ctx } = getCurrentInstance()
const _this = ctx
const isModify = ref(''); const isOld = ref(''); const isNew = ref('');
const checked = ref(false);const isCheck = ref(true);const isPassword = ref(false);
const password = ref([])
const $passwordSpan = ref(null)
const $isBtn = ref('')
const store = usemodifyPersonal()
//選擇radio框 渲染input框
const handleCheck = (item) => {
    //console.log(store.user[item].info);
    console.log($isBtn.value[item].disabled);
    if(item===0){
        //console.log(123);
        $isBtn.value[0].disabled = true
        $isBtn.value[item].innerHTML = '無法修改'
        isModify.value = '請聯繫管理員修改'
    }else{
        isModify.value = store.user[item].info
    }
}
//修改個人資料
const handleModify = (item) => {
    store.user[item].info = isModify.value
    localStorage.removeItem('info')
    localStorage.setItem('info', JSON.stringify(store.user))
    isModify.value = ''
}
//送出修改個人資料
const saveInfo = () => {
    store.changeInfo()
    alert('修改成功')
}
//打開密碼框
const changePassword = () => {
    isPassword.value = !isPassword.value
}
//修改密碼發送
const postPassword = () => {
    let data = {
        oldPassword: isOld.value,
        newPassword: isNew.value
    }
    axios.post('/member/changePassword', data)
        .then((res) => {
            console.log(res.data);
            if (res.data.message === 'success') {//data: {message: 'image was sent'} //data: {message: 'File too large'}
                alert('修改成功')
            }else{
                alert('修改失敗')
            }
        });
}
//
onMounted(async () => {
    //得到個人資料
    await store.getInfo()
    password.value = store.password[0].info
    //console.log(password.value);
    // watchEffect(() => {
    //     //提示用戶的span
    //     if (password.value.toLocaleString().length === 0) {
    //         $passwordSpan.value.innerHTML = ''
    //     } else if (password.value.toLocaleString().length < 6) {
    //         $passwordSpan.value.innerHTML = '最少 6 個字符最最多20個字元，至少 1 個大寫字母 1小寫字母、1 個數字和 1 個特殊字符特殊字符限制為!@#$%&*//'
    //     } else {
    //         $passwordSpan.value.innerHTML = ''
    //     }
    // });
})
</script>
<template>
    <input type="text" class="topInput" v-model="isModify" placeholder="請選擇要修改的內容">
    <ul>
        <li v-for="(todo,item) in store.user" :key="item" class="btn topBtn">
            <!-- 一定要綁定同一個:name 不然會失效 -->
            <input type="radio" :checked="isCheck" :name="checked" @click="handleCheck(item)">
            <span>{{todo.title+':'+todo.info}}</span>
            <button @click="handleModify(item)" ref="$isBtn">修改</button>
        </li>
        <li class="btn topBtn">
            <input type="radio" :checked="isCheck" :name="checked" @click="changePassword">
            密碼:{{password}}
        </li>
        <div v-if="isPassword">
            <li class="btn topBtn">
                輸入舊密碼: <input type="text" v-model="isOld">
            </li>
            <li class="btn topBtn">
                輸入新密碼: <input type="text" v-model="isNew">
                <div class="msg" >最少 6 個字符最最多20個字元，至少 1 個大寫字母 1小寫字母、1 個數字和 1 個特殊字符特殊字符限制為!@#$%&*//</div>
            </li>
            <button class="leftBtn" @click="postPassword">確認修改密碼</button>
        </div>
    </ul>
    <button class="btnSave leftBtn" @click="saveInfo">保存</button>
</template>
<style lang="scss" scoped>
.btn {
    width: 35%;
    padding: 5px 0px;
    background-color: rgba(206, 206, 206, 1);
    border-radius: 50px;
    box-shadow: 1px 7px 5px 2px #8d8d8d;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btnSave {
    width: 20%;
    padding: 5px 0px;
    background-color: rgba(206, 206, 206, 1);
    border-radius: 50px;
    box-shadow: 1px 7px 5px 2px #8d8d8d;
    display: flex;
    align-items: center;
    justify-content: center;
}

.topInput {
    margin-top: 20px;
    margin-left: 30%;
}

.topBtn {
    margin-top: 30px;
    margin-left: 25%;
}
.msg {
    font-size: 14px;
    color: red;
}
.leftBtn {
    margin-top: 30px;
    margin-left: 40%;
}
</style>