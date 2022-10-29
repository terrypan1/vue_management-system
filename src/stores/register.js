import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegisterStore = defineStore('register', {
    state: () => {
        return {
            isContent: ref(true),
            register: [],
            registerEmail: '',
            checkEmail: ref(''),
            end: ref('')
        }
    },
    actions: {
        async addCheckEmail(eMail) {
            this.registerEmail = (eMail)
            //console.log(this.registerEmail);
            localStorage.setItem('registerEmail', JSON.stringify(this.registerEmail))
            await axios.post('/api/sendEmail', this.registerEmail)
                .then(res => {
                    console.log(res);
                    // console.log("驗證碼回應");
                    // console.log(res.data.message);
                    this.checkEmail = res.data.message
                    // console.log(this.checkEmail);
                })
        },
        async addRegister(data) {
            await axios.post('/api/register', data)
                .then(res => {
                    console.log(res);
                    console.log("註冊回應");
                    console.log(res.data.message);
                    this.end = res.data.message
                })
        }
    }
})
