import axios from "axios";
import { defineStore } from "pinia";

export const usemodifyPersonal = defineStore('modifyPersonal', {
    state: () => {
        return {
            user: [],
            password: []
        }
    },
    getters: {

    },
    actions: {
        async getInfo() {
            //初始得到個人資料跟密碼
            await axios.post('/member/getPersonalData')
                .then(res => {
                    //console.log(res);
                    console.log(res.data.modify);
                    this.user = res.data.modify
                    this.password.push(res.data.modify[3])
                    this.user.splice(3, 1);
                    localStorage.setItem('info', JSON.stringify(this.user))
                    localStorage.setItem('password', JSON.stringify(this.password))
                })
        },
        //修改個人資料
        changeInfo() {
            console.log(this.user);
            axios.post('/member/updataPersonalData', this.user)
                .then(res => console.log(res))
        }
    }
})