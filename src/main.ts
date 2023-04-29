import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as Icons from '@element-plus/icons-vue'

import './assets/global.scss'
import './assets/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

//注册全局图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
