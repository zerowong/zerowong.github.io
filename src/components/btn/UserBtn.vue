<template>
  <el-dropdown placement="bottom" :tabindex="-1" :show-timeout="0" @command="onCommand">
    <el-avatar class="avatar" :src="user.avatar" :size="32">{{ user.name[0] }}</el-avatar>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="user">
        <i class="iconfont icon-user"></i>个人资料
      </el-dropdown-item>
      <el-dropdown-item command="logout">
        <i class="iconfont icon-logout"></i>退出
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../utils/axios'

export default {
  name: 'UserBtn',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    logout() {
      axios.get('/logout').finally(() => this.$store.commit('updateUser', {}))
    },
    onCommand(command) {
      switch (command) {
        case 'user':
          this.$store.commit('updateWindow', { name: 'user', val: true })
          break
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
  },
}
</script>

<style scoped>
.avatar {
  display: block;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.1s;
}

.avatar:hover {
  transform: scale(1.5);
}
</style>
