<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useArticleContent } from '../../../stores/Article';
// const { proxy, ctx } = getCurrentInstance()
// const _this = ctx
// const $input = ref(null)
const isOnly = ref(true)
const $change = ref('')
let num = ref(0)
let list = ref([])
let loading = false
let downing = false
const content = ref([])
const img = ref([])
const articleContent = useArticleContent();
const scrollHandle = () => {
    // console.log('滾了');
    const scrollHeight = document.body.scrollHeight;
    const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    const distance = scrollHeight - scrollTop - clientHeight
    //console.log(distance);
    if (distance <= 100) {
        // console.log('該加載了')
        load()
    }
}
const load = async () => {
    if (loading) return
    if (downing) return
    console.log('加載了');
    loading = true
    num.value+=10
    await axios.post('/member/personalListQuest',
        {
            "article":num.value //從第幾筆開始
        }
    )
        .then((res) => {
            console.log(num.value);
            console.log(res.data.questData.length);
            list.value = list.value.concat(res.data.questData)
            console.log(list.value.length);
            console.log(list.value);
            content.value = []
            list.value.forEach(item => {
                //console.log(item.content);
                content.value.push([item.content])
                
                //console.log(content.value);
            });
            if(res.data.questData.length<10){
                downing = true
            }
        })
    loading = false;
    console.log('false');
}
//刪除留言and刷新頁面
function deleteMessage(todo) {
    articleContent.deleteArticle(todo)
    setTimeout(() => {
        window.location.reload();
    }, 50);
}

//
const change = async (memberID, item, content) => {
    isOnly.value = !isOnly.value
    $change.value[item].innerHTML = "保存"
    // console.log(isOnly.value);
    // console.log(content);
    if (isOnly.value === true) {
        $change.value[item].innerHTML = "修改"
        let data = {
            "id": memberID,
            "content": content
        }
        console.log(data);
        await axios.post('/member/updateQuestById', data)
            .then((res) => {
                console.log(res);
            })
    }
}
let user = ref(false);
let admin = ref(false);

onMounted(() => {
    let btnSwitch = JSON.parse(localStorage.getItem('login'));
    if (btnSwitch === 0) {
        user.value = true;
        admin.value = false;
        console.log('會員');
    } else {
        admin.value = true;
        user.value = false;
        console.log('管理');
    }
    axios.post('/member/personalListQuest', {
        "article": num.value//從第幾筆開始
    })
        .then((res) => {
            //console.log(res.data.questData.length);
            //console.log(res.data.questData);
            //console.log(res.data.questData[0].profilePicture);
            list.value = list.value.concat(res.data.questData)
            //console.log('list', list.value);
            list.value.forEach(item => {
                //console.log(item.profilePicture);
                content.value.push([item.content])
                img.value.push("data:image/png;base64,"+item.profilePicture)
                //console.log(content.value);
            });
            //console.log(img.value[0]);
            
        })
    window.addEventListener("scroll", scrollHandle)
    //console.log(num.value);
})

</script>

<template>
    <div class="container">
        <ul class="content">
            <li v-for="(todo,item) in list" :key="item">
                <!-- click跳轉瀏覽文章 -->
                    <div class="article-left">
                        <div class="user">
                            <img :src="img[0]" alt="" class="img">
                            <span class="article-user">{{todo.author}}</span>
                        </div>
                        <textarea class="article-content" rows="4" :readonly="isOnly" v-model="content[item]"></textarea>
                        <router-link to="/modifypersoSeeArticle" v-if="user"  @click="articleContent.browseArticles(todo)" class="articleItem">
                            完整閱讀
                        </router-link>
                        <router-link to="/managerPage/FullArticle" v-if="admin" @click="articleContent.browseArticles(todo)" class="articleItem">
                            完整閱讀
                        </router-link>
                    </div>
                    <div class="article-right">
                        <button class="message" @click="change(todo.id,item,content[item])" ref="$change">修改</button>
                        <button class="delete" @click="deleteMessage(todo)">刪除</button>
                        <div class="message">留言數:{{todo.messageNum}}</div>
                    </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.container {
    flex: 4;
    max-height: 100vh;
    overflow-y:overlay;
    li {
        list-style: none;
    }
}
.content {
    // width: 80%;
    margin-top: 15px;
}
li {
    display: flex;
    justify-content: space-between;
    width: 80%;
    // height: 120px;
    border: 1px solid black;
    margin: 30px 10% 10px;
}
.articleItem{
    padding:5px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    &:hover{
        background-color: #bababa;
        color: #fafafa;
        border-radius: 10px;
    }
}
.user{
    margin-left: 10px;
    // display: flex;
    // flex-direction: column;
}
.article-user {
    margin-top: 50px;
}
.article-left {
    flex: 7;
    display: flex;
    flex-direction: column;
    width: 60%;
    position: relative;
}
.article-right {
    margin-top: 5px;
    margin-right: 10px;
}
.article-content {
    overflow: hidden;
    border: none;
    width: 80%;
    margin: 20px 20px;
    background-color: #fafafa;
    /** 禁止textarea拉伸 */
    resize: none;
    outline: none;

    /* WebKit, Blink, Edge */
    &::-webkit-input-placeholder {
        color: #bababa;
    }

    /* Mozilla Firefox 4 to 18 */
    &:-moz-placeholder {
        color: #bababa;
    }

    /* Mozilla Firefox 19+ */
    &::-moz-placeholder {
        color: #bababa;
    }

    /* Internet Explorer 10-11 */
    &:-ms-input-placeholder {
        color: #bababa;
    }
}

button {
    width: 100px;
    height: 40px;
    cursor: pointer;
}
.message {
    margin-top: 10px;
    border: 1px solid black;
}
.img {
    width: 50px;
    height: auto;
    margin-top: 10px;
    margin-left: 10px;
}
</style>