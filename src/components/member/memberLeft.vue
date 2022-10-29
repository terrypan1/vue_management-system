<script setup>
import { onMounted, ref } from 'vue';
import { useArticleContent } from '../../stores/Article';
import { useLoginStore } from '../../stores/login';
const logOut = useLoginStore();
const userPopUpsBox = ref('');
const article = useArticleContent();
//彈窗
let change = () => {
    userPopUpsBox.value = !userPopUpsBox.value;
};
let user = ref(false);
let admin = ref(false);

onMounted(() => {
    //依登入身分切換顯示 個人頁面btn
    let btnSwitch = JSON.parse(localStorage.getItem('login'));
    if (btnSwitch === 0) {
        user.value = true;
        admin.value = false;
    } else {
        admin.value = true;
        user.value = false;
    }
})
</script>

<template>
<div class="container">
    <div class="nav">
            <!-- 跳轉頁面到首頁 -->
            <router-link to="/home_index" class="logoBtn" >
            <span>BoWa</span>
        </router-link>
            <!-- 跳轉頁面到首頁 -->
        <router-link to="/home_index" class="btn homeBtn" >
            <img src="../../assets/icon/iconmonstr-home-7-240.png" alt="home">
        </router-link>
    </div>
        <!-- 彈窗 內容：個人頁面、登出-->
    <button class="btn userBtn" @click="change"> 
        <img src="../../assets/icon/iconmonstr-user.png" alt="user">
    </button>
</div>
    <div class="userPopUps" :class="{ open: userPopUpsBox }">
        <div class="popUpsBox">
            <div class="popUpsContent">
                <!-- 會員btn -->
                <router-link to="/modifypersonal" class="popBtn chang1" v-if="user">
                    <img src="../../assets/icon/iconmonstr-user-5-240.png" alt="">
                    <span>個人頁面</span>
                </router-link>
                <!-- 管理者btn -->
                <router-link to="/managerPage/ModifyPersonalRight" class="popBtn chang2" v-if="admin">
                    <img src="../../assets/icon/iconmonstr-user-5-240.png" alt="">
                    <span>個人頁面</span>
                </router-link>
                <router-link to="/" class="popBtn" @click="logOut.singOut()">
                    <img src="../../assets/icon/iconmonstr-door-6-240.png" alt="userImg">
                    <span>Log out</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container{
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        height: 100vh;
        border-right: 2px solid #8d8d8d;
        a:hover{
            background: rgb(133, 221, 133);
            transform:translateY(-5px);
        }
        .logoBtn:hover{
            background: rgb(0,0,0);
            background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(175,174,174,1) 100%, rgba(0,212,255,1) 100%);
        }
    }
    .nav{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        a{
            display: block;
        }
        .btn{
            display: flex;
        }
        .homeBtn{
            margin-top: 100px;
        }
    }
    .logoBtn{
        font-family: 'Comforter Brush';
        width: 73.2%;
        padding: 5px 0px;
        margin-top: 20px;
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(175,174,174,1) 100%, rgba(0,212,255,1) 100%);
        border: 1px solid #000;
        border-radius: 50px;
        box-shadow: 1px 5px 5px 2px #8d8d8d;
        text-align: center;
        span{
            font-size: 48px;
            color: #fff;
        }
    }
    .btn{
        width: 56.5%;
        padding: 5px 0px;
        background-color: rgb(0, 0, 0);
        border-radius: 50px;
        box-shadow: 1px 5px 5px 1px #8d8d8d;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 50px;
            height: 80%;
        }
    }
    .userBtn{
        border: 0px;
        margin-bottom: 20px;
        overflow: hidden;
        &:hover{
            background: rgb(133, 221, 133);
            transform:translateY(-5px);
            cursor: pointer;
        }
    }
    .userPopUps{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-items: center;
        background-color: #5454547d;
        &.open{
            display: flex;
        }
        .popUpsBox{
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
        }
        .popUpsContent{
            border-radius: 10px;
            border: thick double #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            width: 300px;
            height: 300px;
            .popBtn{
                width: 50%;
                display: flex;
                align-items: center;
                padding: 10px;
                margin: 10px;
                color: #8d8d8d;
                box-shadow: 1px 3px 8px 1px #8d8d8d;
                border-radius: 5px;
                overflow:hidden;
                &:hover{
                    border-radius: 10px;
                    transform: translateY(0px);
                    color: #000;
                }
            }
            img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            // .chang2{
            //     display: none;
            // }
        }
    }
    @media screen and (max-width:768px) {
    .container {
        flex-direction: row;
        .nav{
            flex-direction: row;
            height: 20vw;
            .homeBtn{
                margin: 0px;
            }
        }
    }
    .btn{
        width: 20%;
        margin: 0;
        img{
            width: 5vw;
        }
    }
    .logoBtn{
        width: 20%;
        padding: 10px 0px;
        margin: 0px 20px;
        span{
            font-size: 24px;
        }
    }
}
</style>