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

Vue.config.productionTip = false

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
