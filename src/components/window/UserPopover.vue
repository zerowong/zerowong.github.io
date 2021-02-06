<template>
  <el-popover
    placement="top-start"
    trigger="hover"
    :visible-arrow="false"
    :open-delay="200"
    :tabindex="-1"
  >
    <div class="user-popover">
      <el-avatar class="avatar" :src="user.avatar" :size="60">{{ user.name[0] }}</el-avatar>
      <div class="user-popover-profile">
        <span class="name">{{ user.name }}</span>
        <i v-if="isOnline" class="iconfont icon-online">在线</i>
        <i v-else class="iconfont icon-offline">{{ user.lastActiveAt | dateFromNow }}</i>
      </div>
    </div>
    <span class="name" slot="reference">{{ user.name }}</span>
  </el-popover>
</template>

<script>
export default {
  name: 'UserPopover',
  props: { user: Object },
  computed: {
    isOnline() {
      return Date.now() - Date.parse(this.user.lastActiveAt) <= 900000
    },
  },
}
</script>

<style scoped>
.user-popover {
  display: flex;
}

.user-popover-profile {
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

/* 留言用户头像 */
.avatar {
  margin-right: 20px;
  /* 没有头像或头像加载失败时的头像文字 */
  font-size: 2rem;
  min-width: 60px;
  cursor: pointer;
}

/* 留言用户名字文本 */
.name {
  font-weight: bold;
  color: var(--primary-color);
  cursor: pointer;
}
</style>
