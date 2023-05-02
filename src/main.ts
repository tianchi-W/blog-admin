import { createApp } from 'vue'
import pinia from './stores/store'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import * as Icons from '@element-plus/icons-vue'

import './assets/global.scss'
import './assets/common.scss'
//解决 弹出框、提示框等样式未引入问题
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'

const app = createApp(App)

pinia.use(piniaPersist)
app.use(router)
app.use(pinia)
app.mount('#app')

//注册全局图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
