<template>
  <nav class="nav-menu-root">
    <router-link class="route" exact-active-class="route-active" to="/">HOME</router-link>
    <router-link class="route" exact-active-class="route-active" to="/blog">BLOG</router-link>
    <router-link class="route" exact-active-class="route-active" to="/about">ABOUT</router-link>
    <router-link class="route" exact-active-class="route-active" to="/manager" v-if="isAdmin"
      >后台管理</router-link
    >
    <div class="operation">
      <component :is="currentBtn"></component>
      <setting-btn></setting-btn>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import SettingBtn from './btn/SettingBtn.vue'
import LoginBtn from './btn/LoginBtn.vue'
import UserBtn from './btn/UserBtn.vue'

export default {
  name: 'NavMenu',
  components: {
    SettingBtn,
    LoginBtn,
    UserBtn,
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 100%;
  text-decoration: none;
  color: var(--blog-color);
  transition: 0.3s;
}

.route:hover,
.route-active {
  background-color: var(--primary-color);
}
</style>
