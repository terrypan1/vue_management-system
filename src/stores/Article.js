import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import icon from '../assets/icon/iconmonstr-user-5-240.png';
import { useLoginStore } from "./login";
const login = useLoginStore();

export const useArticleContent = defineStore('text', {
    state: () => {
        return {
            article: [],//首頁文章預覽
            img: [],//首頁文章預覽user img
            articleSearch: [],//搜尋文章資料暫存
            articleContent: ref(''),//響應式更新值
            key: '',//瀏覽文章刷新重新fetch
            loading: false,//首頁取得文章fetch開關
            switch: false,//判斷res陣列開關
        }
    },
    actions: {
        //取得首頁預覽文章 ok
        getArticleData(num) {
            //判斷 防止短時間重複fetch開關& 回傳是否還有資料的開關
            if (this.loading === true || this.switch === true) return
            this.loading = true;//防止短時間重複fetch開關
            axios.post('/member/getListQuest',
                { article: num }
            )
                .then(res => {
                    //判斷圖片是否為預設圖，若為預設圖，位置改成預設
                    for (let i = 0; i < res.data.questData.length; i++) {
                        res.data.questData[i].profilePicture === "preset" || res.data.questData[i].profilePicture === "" ? res.data.questData[i].profilePicture = icon : res.data.questData[i].profilePicture = 'data: image / png; base64,' + res.data.questData[i].profilePicture;
                    }
                    //滾動fetch，res判斷儲存陣列是否為空，不為空則合併
                    this.article === [] ? this.article = res.data.questData : this.article = this.article.concat(res.data.questData);
                    //判斷回傳資料是否還有資料，沒有就不在進fetch
                    if (res.data.questData.length === 0) {
                        this.switch = true
                        console.log(num);
                    }
                    this.loading = false;
                })
        },
        //發表文章 ok
        updatedArticleData(title, articleValue) {
            axios.post('/member/postNewQuest',
                {
                    title: title,//標題
                    text: articleValue, //文章內容
                }
            )
        },
        //搜尋文章 ok
        searchArticle(value) {
            axios.post('/member/queryQuest',
                {
                    keyword: value
                }
            )
                .then(res => {
                    for (let i = 0; i < res.data.questData.length; i++) {
                        //判斷圖片是否為預設圖，若為預設圖，位置改成預設
                        res.data.questData[i].profilePicture === "preset" || res.data.questData[i].profilePicture === "" ? res.data.questData[i].profilePicture = icon : res.data.questData[i].profilePicture = 'data: image / png; base64,' + res.data.questData[i].profilePicture;
                    }
                    this.articleSearch = res.data.questData;
                })
        },
        //瀏覽文章 ok
        browseArticles(value) {
            localStorage.setItem('key', JSON.stringify(value.id));
            axios.post('/member/getQuestByid',
                { id: value.id }//api要求資料
            )
                .then(res => {
                    this.key = JSON.parse(localStorage.getItem('key'));
                    this.articleContent = res.data.questData;
                    //判斷發文者照片 若無就給預設圖
                    res.data.questData.profilePicture === "preset" || res.data.questData.profilePicture === "" ? this.articleContent.profilePicture = icon : this.articleContent.profilePicture = 'data: image / png; base64,' + res.data.questData.profilePicture;
                    let imgContent = this.articleContent.message
                    //判斷留言照片 若無就給預設圖
                    for (let i = 0; i < imgContent.length; i++) {
                        imgContent[i].profilePicture === "preset" || imgContent[i].profilePicture === "" ? imgContent[i].profilePicture = icon : imgContent[i].profilePicture = 'data: image / png; base64,' + imgContent[i].profilePicture;
                    }
                })
        },
        //瀏覽頁面刷新 ok
        refreshWindow(key) {
            console.log('刷新');
            axios.post('/member/getQuestByid',
                { id: key }//api要求資料
            )
                .then(res => {
                    //判斷發文者照片 若無就給預設圖
                    this.articleContent = res.data.questData;
                    res.data.questData.profilePicture === "preset" || res.data.questData.profilePicture === "" ? this.articleContent.profilePicture = icon : this.articleContent.profilePicture = 'data: image / png; base64,' + res.data.questData.profilePicture;
                    let imgContent = this.articleContent.message
                    //判斷留言照片 若無就給預設圖
                    for (let i = 0; i < imgContent.length; i++) {
                        imgContent[i].profilePicture === "preset" || imgContent[i].profilePicture === "" ? imgContent[i].profilePicture = icon : imgContent[i].profilePicture = 'data: image / png; base64,' + imgContent[i].profilePicture;
                    }
                })
        }
        ,
        //新增留言 ok
        addMessage(value) {
            console.log(value, 'message');
            axios.post('/member/newComment',
                {
                    questId: this.articleContent.id,
                    content: value,
                }
            )
        },
        //刪除文章
        deleteArticle(value) {
            console.log(value.id);
            console.log('有執行');
            axios.post('/member/delQuest',
                {
                    id: value.id
                }
            ).then(res => {
                console.log(res);
            })
        }
    }
})