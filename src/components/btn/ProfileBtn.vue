<template>
  <el-avatar class="avatar" :src="user?.avatar" :size="avatarSize" @click="open">
    {{ user?.name[0] }}
  </el-avatar>
  <teleport to="#popup">
    <transition name="zoom">
      <popup
        :title="user?.name"
        :rect="{ width: 500, height: 600 }"
        v-if="popupOpen"
        v-model="popupOpen"
      >
        <div class="profile">
          <el-avatar class="profile-avatar" :src="user?.avatar" :size="120">{{
            user?.name[0]
          }}</el-avatar>
          <el-card class="name-card" shadow="nerver">
            <span class="name">{{ user?.name }}</span>
          </el-card>
          <el-card
            class="profile-item"
            v-for="(item, index) in list"
            :key="index"
            body-style="display: flex;justify-content: space-between;"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
          </el-card>
          <el-button style="width: 100%" type="danger" @click="logout">登出</el-button>
        </div>
      </popup>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { toRef, inject } from 'vue'
import { useStore } from '../../store'
import { axios } from '../../utils'
import { date } from '../../utils/filters'
import Popup from '../Popup.vue'

const store = useStore()
const isMobile = inject<boolean>('isMobile')

ref: user = toRef(store.state, 'user')

const list = [
  { name: '邮箱', value: user?.mail },
  {
    name: '注册于',
    value: date(user?.createdAt ?? '1979/7/1 00:00'),
  },
]
const avatarSize = isMobile ? 100 : 32

ref: popupOpen = false

function open() {
  if (isMobile) {
    store.commit('updateDrawer', false)
  }
  popupOpen = true
}

function logout() {
  axios.get('/logout').finally(() => store.commit('updateUser', null))
}
</script>

<style scoped>
.profile {
  padding: 0 40px;
}

.avatar {
  display: block;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.1s;
}

.avatar:hover {
  transform: scale(1.5);
}

.name-card,
.profile-item {
  border: unset;
  box-shadow: 0 0 12px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.name-card {
  margin-top: 80px;
  padding-top: 60px;
  text-align: center;
}

.profile-avatar {
  position: absolute;
  top: 60px;
  left: calc(50% - 60px);
  display: block;
  font-size: 5rem;
  cursor: pointer;
}

.profile-avatar:hover {
  opacity: 0.5;
}

.name {
  font-size: xx-large;
}

:deep(.el-card) {
  background-color: var(--global-bgcolor);
  color: var(--global-color);
  border: none;
}
</style>
