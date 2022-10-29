import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// const router = useRouter();
// this.router.push({ name: 'administrator' })

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            userName: '',//本地登入帳號
            userID: '',//判斷登入者為：會員/管理
            logInName: '',//res登入帳號
            nav: ref([]),//登入路徑
            checkEmail: ref(''),
            registerEmail: '',
        }
    },
    getters: {

    },
    actions: {
        postLogin(userData) {
            //console.log(userData);
            //'http://192.168.50.76:3000/api/login'
            axios.post('/api/login', userData)
                .then(res => {
                    console.log(res.data);
                    console.log(res.data.memberData);
                    if (res.data.memberData) {
                        this.nav = res.data.memberData
                        this.logInName = 'user@email.com'
                        this.userID = res.data.permission
                    } else {
                        this.nav = res.data.adminData
                        this.logInName = 'admin@email.com'
                        this.userID = res.data.permission
                    }
                    console.log(this.nav);
                    console.log('this.userID', this.userID);
                    localStorage.setItem('nav', JSON.stringify(this.nav))
                    if (this.userID === 0 || this.userID === 1) {
                        console.log('有進來了');
                        localStorage.setItem('login', JSON.stringify(this.userID))
                        this.router.push('/home_index')
                    } else {
                        this.userID = '3';
                        localStorage.removeItem('nav')
                        alert('帳號密碼錯誤');
                        return
                    }
                })
        },
        async addCheckEmail(eMail) {
            this.registerEmail = (eMail)
            localStorage.setItem('forgetEmail', JSON.stringify(this.registerEmail))
            await axios.post('/api/forgotPassword', this.registerEmail)
                .then(res => {
                    console.log(res);
                    this.checkEmail = res.data.message
                })
        },
        //登出，通知系統帳號登出，清除本地資料
        singOut() {
            localStorage.clear();
            sessionStorage.clear();
            axios.post('/api/logout');
        }
    }
})  