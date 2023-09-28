import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPersistedstate)
import router from './router'

// import '@/styles/reset.scss'
// import '@/styles/base.scss'
// import '@/styles/tailwind.css'
// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/theme-chalk/el-message.css'
// import 'element-plus/theme-chalk/el-message-box.css'
// import 'element-plus/theme-chalk/el-dialog.css'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import './assets/icon-font/iconfont.css'

import App from './App.vue'
const app = createApp(App)
// // 通过自定义注册指令插件
// import directivesPlugin from '@/utils/directivesPlugin'
// import directives from '@/utils/directives/index'
// app.use(directivesPlugin, directives)
app.use(router)
app.use(pinia)
// app.use(ElementPlus, {
//   locale: zhCn
// })
app.mount('#app')
