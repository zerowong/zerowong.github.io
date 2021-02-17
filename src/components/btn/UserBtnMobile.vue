<template>
  <el-avatar class="avatar" :src="user.avatar" :size="100" @click.native="onClick">
    {{ user.name[0] }}
  </el-avatar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserBtnMobile',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onClick() {
      this.$store.commit('updateDrawer', false)
      this.$store.commit('updateWindow', { name: 'user', val: true })
    },
  },
}
</script>

<style scoped>
.avatar {
  font-size: 4rem;
}
</style>
