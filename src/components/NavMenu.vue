<template>
  <nav class="nav-menu-root">
    <router-link class="route" exact-active-class="route-active" to="/">首页</router-link>
    <router-link class="route" exact-active-class="route-active" to="/blog">文章</router-link>
    <router-link class="route" exact-active-class="route-active" to="/about">关于</router-link>
    <router-link class="route" exact-active-class="route-active" to="/manager" v-if="isAdmin"
      >后台</router-link
    >
    <div class="operation">
      <component :is="currentBtn"></component>
      <setting-btn></setting-btn>
    </div>
    <header-text></header-text>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SettingBtn from './btn/SettingBtn.vue'
import LoginBtn from './btn/LoginBtn.vue'
import UserBtn from './btn/UserBtn.vue'
import HeaderText from './HeaderText.vue'

export default {
  name: 'NavMenu',
  components: {
    SettingBtn,
    LoginBtn,
    UserBtn,
    HeaderText,
  },
  computed: {
    ...mapGetters(['isAdmin']),
    currentBtn() {
      return this.$store.getters.logined
        ? this.$options.components.UserBtn
        : this.$options.components.LoginBtn
    },
  },
}
</script>

<style scoped>
.nav-menu-root {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  /* background-color: var(--blog-bgcolor); */
  background-color: transparent;
  box-shadow: 0 0 5px 0 black;
  display: flex;
  justify-content: center;
  column-gap: 10px;
}

.operation {
  position: absolute;
  top: 9px;
  right: 30px;
  display: flex;
  align-items: center;
  column-gap: 15px;
}

.route {
  display: inline-block;
  text-align: center;
  padding: 1em;
  box-sizing: border-box;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 100%;
  text-decoration: none;
  color: var(--blog-color);
  font-weight: bold;
}

.route::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary-color);
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.3s ease-out;
}

.route-active::before,
.route:hover::before {
  transform: scale(2);
}
</style>
