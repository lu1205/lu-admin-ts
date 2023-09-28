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

import App from './App.vue'
const app = createApp(App)

app.use(router)
app.use(pinia)
// app.use(ElementPlus, {
//   locale: zhCn
// })
app.mount('#app')
