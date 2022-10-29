<script setup>
import { ref } from "@vue/reactivity";
import { useArticleContent } from "../../../stores/Article";

const article = useArticleContent();
const messageValue = ref('');
function clearInput() {
    messageValue.value = '';
}

let key = JSON.parse( localStorage.getItem('key'));//取得該筆文章id
article.refreshWindow(key); //刷新頁面時再次fetch該比文章，帶入該筆文章id
function addMessage(key, messageValue) {
    console.log(messageValue);
    article.addMessage(messageValue)
    setTimeout(() => {
        article.refreshWindow(key)
        console.log('刷新了');
    },50)
    
}
</script>

<template>
    <div class="container">
        <h1>{{article.articleContent.title}}</h1>
        <div class="content">
            <div class="userData">
                <img :src=article.articleContent.profilePicture alt="照片">
                <span>{{article.articleContent.author}}</span>
                <span class="time">{{article.articleContent.created_at}}</span>
            </div>
            <hr>
            <p class="text">{{article.articleContent.content}}</p>
            <hr>
            <div class="footer">
                <span>部門：{{article.articleContent.department}}</span>
                <label for="switch" class="messageTitle">回覆</label>
            </div>
            <input type="checkbox" id="switch"  class="messageBox"> 
            <div class="messageInput">
                <textarea name="saySomething" v-model="messageValue" >
                </textarea>
                <label for="switch" @click="addMessage(key,messageValue),clearInput()" class="sandBtn">送出</label>
            </div>
        </div>
        <ul class="messageContent">
            <li class="messageItem" v-for=" item in article.articleContent.message">
                <div class="messageUserData">
                    <img :src=item.profilePicture alt="照片">
                    <span>{{item.author}}</span>
                    <span class="time">{{item.created_at}}</span>
                </div>
                <hr>
                <p>{{item.comments}}</p>
                <span class="department">部門：{{item.department}}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .container{
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        hr{
            margin-top: 10px;
        }
        h1{
            margin-top: 10px;
        }
        img{
                height: 50px;
        }
        span{
                margin-left: 10px;
        }
        .time{
            color: #8d8d8d;
        }
        .content{
            margin-top: 20px;
            width: 80%;
            padding: 20px;
            border: thick double rgb(94, 93, 96);
        }
        .userData{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .messageTitle{
            cursor: pointer;
            padding: 10px;
            &:hover{
                background: rgb(183, 185, 183);
                color: #fff;
                border-radius: 5px;
            }
        }
        .messageBox{
            display: none;
        }
        .text{
            margin-bottom: 20px;
        }
        textarea{
            font-size: 24px;
            width: 100%;
            resize: none;
            margin-bottom: 10px;
            padding: 0px 5px;
            text-align: justify;
        }
        .messageInput{
            display: flex;
            justify-content: center;
            max-height: 0;
            overflow: hidden;
            transition: 0.5S;
            .sandBtn{
                cursor: pointer;
                width: 60px;
                height: 50px;
                margin-left: 10px;
                border: 1px solid rgb(183, 185, 183) ;
                text-align: center;
                line-height: 1.5;
                padding: 10px 0px;
                &:hover{
                    border: 1px solid rgb(183, 185, 183) ;
                    transform: translateY(-5px);
                    border-radius: 50%;
                    background-color:#000 ;
                    color: #fff;
                }
            }
        }
        .messageBox:checked~.messageInput{
            margin-top: 20px;
            width: 100%;
            max-height: 100px;
            padding: 5px 0px;
        }
        .messageContent{
            width: 80%;
            margin-top: 20px;
            max-height: 50vh;
            overflow-y: overlay;
            &::-webkit-scrollbar {
                width: 1px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0);
            }
            .messageItem{
                padding: 20px;
                border: 2px solid rgb(94, 93, 96);
                margin-top: 10px;
                .messageUserData{
                    display: flex;
                    img{
                        width: 10%;
                    }
                }
                p{
                    margin: 5px auto;
                }
                .department{
                    margin: 0;
                }
            }
        }
        .footer{
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
                margin-left: 0;
            }
        }
    }
</style>