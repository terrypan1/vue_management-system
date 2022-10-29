import { createApp, markRaw } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './assets/base.scss'
import router from './router'
import { useLoginStore } from './stores/login'


const pinia = createPinia();




//讓$this.router.push能在pinia使用
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
pinia.use(piniaPluginPersistedstate);

const log = useLoginStore();
// if (log.userID) {
//     log.userID = JSON.parse(localStorage.getItem('login'));
//     console.log(log.userID, '123');
// } else {
//     console.log('失敗了');
// }


app.use(router)
app.mount('#app')