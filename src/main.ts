import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { i18n, detectAndUpdateLocale } from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// 异步检测并更新语言
detectAndUpdateLocale(i18n)
