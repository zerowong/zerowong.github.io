import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from 'element-ui'
import VueTypedJs from 'vue-typed-js'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Tooltip)

Vue.use(VueTypedJs)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
