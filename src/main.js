import Vue from 'vue'
import {
  Button,
  Switch,
  Loading,
  Card,
  Avatar,
  Input,
  Pagination,
  InfiniteScroll,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Notification,
} from 'element-ui'
import './styles/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './utils/filters'
import axios from './utils/axios'

Vue.config.productionTip = false

Vue.config.errorHandler = function(err) {
  if (process.env.NODE_ENV === 'production') {
    axios.post('/client/error', { err: err.stack }).catch(() => {})
  } else {
    console.error(err)
  }
}

// eslint-disable-next-line semi-style
;['success', 'warning', 'info', 'error'].forEach((type) => {
  Notification[type] = (message) => {
    Notification({
      type,
      message,
      position: 'bottom-right',
    })
  }
})
Vue.prototype.$notification = Notification

Vue.prototype.$axios = axios

Vue.prototype.$throw = function(err) {
  if (err.isAxiosError) {
    if (err.response) {
      Notification.error(err.response.data)
    } else if (err.code === 'ECONNABORTED') {
      Notification.error('连接超时')
    } else if (err.message === 'Network Error') {
      Notification.error('网络错误')
    } else {
      console.error(err)
    }
  } else {
    Vue.config.errorHandler(err)
  }
}

const elementComponents = [
  Button,
  Switch,
  Loading,
  Card,
  Avatar,
  Input,
  Pagination,
  InfiniteScroll,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
]

elementComponents.forEach((component) => {
  Vue.use(component)
})

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

console.log(`
     ___   _____       ___   _____   _____   _____   _____   
    /   | |  _  \\     /   | /  ___/ /  ___/ | ____| |  _  \\  
   / /| | | |_| |    / /| | | |___  | |___  | |__   | |_| |  
  / ___ | |  ___/   / ___ | \\___  \\ \\___  \\ |  __|  |  _  /  
 / /  | | | |      / /  | |  ___| |  ___| | | |___  | | \\ \\  
/_/   |_| |_|     /_/   |_| /_____/ /_____/ |_____| |_|  \\_\\ 
`)
console.log('github: https://github.com/zerowong')
