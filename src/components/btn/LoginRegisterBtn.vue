<template>
  <el-button class="shadowPulse" type="primary" size="medium" @click="open">登录</el-button>
  <teleport to="#popup">
    <transition name="zoom">
      <popup :rect="{ width: 500, height: 620 }" v-if="popupOpen" v-model="popupOpen">
        <div class="login-register">
          <div class="operation">
            <el-button
              class="btn"
              :class="{ 'btn-hidden': isLogin }"
              type="text"
              @click="switchButton"
            >
              <i class="iconfont icon-arrow-left"></i>登录
            </el-button>
            <el-button
              class="btn"
              :class="{ 'btn-hidden': !isLogin }"
              type="text"
              @click="switchButton"
            >
              注册<i class="iconfont icon-arrow-right"></i>
            </el-button>
          </div>
          <transition name="fadeInLeftOutRight" mode="out-in">
            <component class="form" :is="loginOrRegister"></component>
          </transition>
        </div>
      </popup>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { inject, computed, provide } from 'vue'
import { useStore } from '../../store'
import Popup from '../Popup.vue'
import Login from '../popup/Login.vue'
import Register from '../popup/Register.vue'

const store = useStore()
const isMobile = inject<boolean>('isMobile')

ref: popupOpen = false
ref: isLogin = true
ref: loginOrRegister = computed(() => {
  return isLogin ? Login : Register
})

function open() {
  if (isMobile) {
    store.commit('updateDrawerDisplay', false)
  }
  popupOpen = true
}

function switchButton() {
  isLogin = !isLogin
}

function closePopup() {
  popupOpen = false
}

provide('closePopup', closePopup)
</script>

<style scoped>
.login-register {
  width: 80%;
  height: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.operation {
  display: flex;
  justify-content: space-between;
}

.btn,
.iconfont {
  font-size: 25px;
}

.btn-hidden {
  visibility: hidden;
}

.form {
  margin-top: 60px;
}

:deep(.submit) {
  margin-top: 20px;
  width: 100%;
}

:deep(.el-form-item__label) {
  color: var(--global-color);
}

:deep(.el-input__inner) {
  background-color: var(--input-bgcolor);
  border-color: var(--input-bgcolor);
  color: var(--global-color);
}

:deep(.el-input__inner:hover),
:deep(.el-input__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(4, 120, 190, 0.1);
}

:deep(.el-input .el-input__clear) {
  color: var(--global-color);
}
</style>
