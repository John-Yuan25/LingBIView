import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "@/assets/icon/iconfont.css"
import myComps from './components/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 导入 Pinia 插件

const pinia = createPinia() // 初始化 Pinia
pinia.use(piniaPluginPersistedstate) // 激活 Pinia 插件

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(myComps)
app.mount('#app')

