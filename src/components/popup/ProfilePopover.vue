<template>
  <el-popover trigger="hover" placement="top-start" :show-after="200" :show-arrow="false">
    <template #reference>
      <span class="name">{{ user.name }}</span>
    </template>
    <template #default>
      <div class="popover">
        <el-avatar class="avatar" :src="user.avatar" :size="60">{{ user.name[0] }}</el-avatar>
        <div class="profile">
          <span class="name">{{ user.name }}</span>
          <i v-if="isOnline" class="iconfont icon-online">在线</i>
          <i v-else class="iconfont icon-offline">{{ dateFromNow(user.lastActiveAt) }}</i>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { User } from './messages'
import { dateFromNow } from '../../utils/filters'

const props = defineProps<{ user: User }>()

ref: isOnline = computed(() => Date.now() - Date.parse(props.user.lastActiveAt) <= 60000)
</script>

<style scoped>
.popover {
  display: flex;
}

.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon-online {
  color: green;
}

.icon-offline {
  color: red;
}

.avatar {
  margin-right: 20px;
  font-size: 2rem;
  min-width: 60px;
  cursor: pointer;
}

.name {
  font-weight: bold;
  color: var(--primary-color);
  cursor: pointer;
}
</style>
