import Vue from 'vue'
import {
  Button,
  Tooltip,
  Link,
  Image,
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
} from 'element-ui'
import VueTypedJs from 'vue-typed-js'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'
import 'overlayscrollbars/css/OverlayScrollbars.min.css'
import 'highlight.js/styles/atom-one-dark.css'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './utils/filters'

Vue.config.productionTip = false

const elementComponents = [
  Button,
  Tooltip,
  Link,
  Image,
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

Vue.use(VueTypedJs)
Vue.use(OverlayScrollbarsPlugin)

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
