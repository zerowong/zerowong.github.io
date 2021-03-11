<template>
  <div :class="rootClass">
    <div :class="operationClass">
      <component :is="profileOrLogin"></component>
      <div class="operation-btn">
        <setting-btn />
      </div>
    </div>
    <router-link
      v-for="route in routesInfo"
      :key="route.to"
      :class="routeClass"
      :exact-active-class="routeActiveClass"
      :to="route.to"
    >
      {{ route.name }}
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive, computed, watch } from 'vue'
import { useStore } from '../store'
import SettingBtn from './btn/SettingBtn.vue'
import LoginRegisterBtn from './btn/LoginRegisterBtn.vue'
import ProfileBtn from './btn/ProfileBtn.vue'

const store = useStore()
const isMobile = inject<boolean>('isMobile')
const rootClass = isMobile ? 'routes-menu-root-mobile' : 'routes-menu-root-pc'
const routeClass = isMobile ? 'route-mobile' : 'route-pc'
const routeActiveClass = isMobile ? 'route-mobile-active' : 'route-active'
const operationClass = isMobile ? 'operation-mobile' : 'operation'

const routesInfo = reactive([
  { to: '/', name: '首页' },
  { to: '/posts', name: '文章' },
  { to: '/about', name: '关于' },
])
ref: isAdmin = computed<boolean>(() => store.getters.isAdmin)
ref: logined = computed<boolean>(() => store.getters.logined)
ref: profileOrLogin = computed(() => {
  return logined ? ProfileBtn : LoginRegisterBtn
})

watch($isAdmin, (val) => {
  if (val) {
    routesInfo.push({ to: '/manager', name: '后台' })
  } else {
    routesInfo.pop()
  }
})
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

.route-pc,
.route-mobile {
  display: inline-block;
  text-align: center;
  padding: 1em;
  box-sizing: border-box;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
  height: 100%;
  text-decoration: none;
  color: var(--global-color);
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
