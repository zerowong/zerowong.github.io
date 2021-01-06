/* eslint-disable object-curly-newline */
import Vue from 'vue'
import { Container, Header, Main, Button, Tooltip, Link, Image, Switch } from 'element-ui'
import VueTypedJs from 'vue-typed-js'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'
import 'overlayscrollbars/css/OverlayScrollbars.min.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const elementComponents = [Container, Header, Main, Button, Tooltip, Link, Image, Switch]

elementComponents.forEach((component) => {
  Vue.use(component)
})

Vue.use(VueTypedJs)
Vue.use(OverlayScrollbarsPlugin)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
