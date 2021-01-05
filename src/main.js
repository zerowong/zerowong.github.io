import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Link,
  Image,
} from 'element-ui'
import VueTypedJs from 'vue-typed-js'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const elementComponents = [Container, Header, Main, Menu, MenuItem, Button, Tooltip, Link, Image]

elementComponents.forEach((component) => {
  Vue.use(component)
})

Vue.use(VueTypedJs)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
