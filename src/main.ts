import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

const app = createApp(App)

axios.defaults.baseURL = '/api'
app.config.globalProperties.$axios = axios //全局注册，使用方法为:this.$axios   axios


app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn, // 设置中文
  })
app.mount('#app')
