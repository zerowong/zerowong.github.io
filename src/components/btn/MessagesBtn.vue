<template>
  <el-button type="text" @click="open">
    <i class="iconfont icon-messages"></i>
    <span>留言</span>
  </el-button>
</template>

<script>
export default {
  name: 'MessagesBtn',
  methods: {
    open() {
      this.$store.commit('updateWindow', { name: 'messages', val: true })
    },
  },
}
</script>

<style scoped>
.icon-messages {
  color: #3dc3c6;
}
</style>
