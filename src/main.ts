import { createApp } from 'vue'
import locale from 'element-plus/lib/locale'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import ElButton from 'element-plus/lib/el-button'
import ElAvatar from 'element-plus/lib/el-avatar'
import ElSwitch from 'element-plus/lib/el-switch'
import ElForm from 'element-plus/lib/el-form'
import ElFormItem from 'element-plus/lib/el-form-item'
import ElInput from 'element-plus/lib/el-input'
import ElCard from 'element-plus/lib/el-card'
import ElPagination from 'element-plus/lib/el-pagination'
import ElLoading from 'element-plus/lib/el-loading'
import ElPopover from 'element-plus/lib/el-popover'
import ELInfiniteScroll from 'element-plus/lib/el-infinite-scroll'
import router from './router'
import { store, key } from './store'
import App from './App.vue'
import './styles/index.css'

const loading = ElLoading.service({
  lock: true,
  spinner: 'iconfont icon-loading entryLoading',
  background: 'var(--global-bgcolor)',
})
window.addEventListener('load', () => loading.close())

const app = createApp(App)

app.use(router)
app.use(store, key)

locale.use(lang)
app.use(ElLoading)
app.directive('InfiniteScroll', ELInfiniteScroll)

app.component('ElButton', ElButton)
app.component('ElAvatar', ElAvatar)
app.component('ElSwitch', ElSwitch)
app.component('ElForm', ElForm)
app.component('ElFormItem', ElFormItem)
app.component('ElInput', ElInput)
app.component('ElCard', ElCard)
app.component('ElPagination', ElPagination)
app.component('ElPopover', ElPopover)

app.provide('isMobile', /Mobile/i.test(navigator.appVersion))

app.mount('#app')
