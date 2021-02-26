<template>
  <div :class="rootClass">
    <div :class="operationClass">
      <component :is="userOrLogin"></component>
      <div class="operation-btn">
        <setting-btn></setting-btn>
        <el-button type="text" v-if="isMobile && logined" @click="logout">
          <i style="font-size: 40px;" class="iconfont icon-logout"></i>
        </el-button>
      </div>
    </div>
    <router-link
      v-for="route in routes"
      :key="route.to"
      :class="routeClass"
      :exact-active-class="routeActiveClass"
      :to="route.to"
      >{{ route.name }}</router-link
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SettingBtn from './btn/SettingBtn.vue'
import LoginBtn from './btn/LoginBtn.vue'
import UserBtn from './btn/UserBtn.vue'
import UserBtnMobile from './btn/UserBtnMobile.vue'

export default {
  name: 'RoutesMenu',
  components: {
    SettingBtn,
    LoginBtn,
    UserBtn,
    UserBtnMobile,
  },
  inject: ['isMobile'],
  data: () => ({
    routes: [
      { to: '/', name: '首页' },
      { to: '/blog', name: '文章' },
      { to: '/about', name: '关于' },
    ],
  }),
  computed: {
    ...mapGetters(['isAdmin', 'logined']),
    userOrLogin() {
      return this.logined
        ? this.isMobile
          ? this.$options.components.UserBtnMobile
          : this.$options.components.UserBtn
        : this.$options.components.LoginBtn
    },
    rootClass() {
      return `routes-menu-root-${this.isMobile ? 'mobile' : 'pc'}`
    },
    routeClass() {
      return `route${this.isMobile ? '-mobile' : '-pc'}`
    },
    routeActiveClass() {
      return `route-${this.isMobile ? 'mobile-' : ''}active`
    },
    operationClass() {
      return `operation${this.isMobile ? '-mobile' : ''}`
    },
  },
  methods: {
    logout() {
      this.$axios.get('/logout').finally(() => this.$store.commit('updateUser', null))
    },
  },
  watch: {
    isAdmin(newVal) {
      if (newVal) {
        this.routes.push({ to: '/manager', name: '后台' })
      } else {
        this.routes.pop()
      }
    },
  },
}
</script>

<style scoped>
.routes-menu-root-pc {
  display: flex;
  column-gap: 10px;
}

.routes-menu-root-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
}

.operation {
  position: absolute;
  top: 9px;
  right: 30px;
  display: flex;
  align-items: center;
  column-gap: 15px;
}

.operation-btn {
  display: flex;
  justify-content: center;
}

.operation-mobile {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 30px;
}

[class*='route-'] {
  display: inline-block;
  text-align: center;
  padding: 1em;
  box-sizing: border-box;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
  height: 100%;
  text-decoration: none;
  color: var(--blog-color);
  font-weight: bold;
  border-radius: 18px;
}

.route-pc {
  width: 80px;
}

.route-mobile {
  width: 80%;
}

.route-mobile-active {
  background-color: var(--primary-color);
}

.route-mobile::before,
.route-pc::before {
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
.route-pc:hover::before {
  transform: scale(2);
}

.route-mobile:hover::before {
  transform: scaleY(2);
}
</style>
