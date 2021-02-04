<template>
  <el-button type="text" @click="open">
    <i class="iconfont icon-booklist"></i>
    <span>书单</span>
  </el-button>
</template>

<script>
export default {
  name: 'BooklistBtn',
  methods: {
    open() {
      this.$store.commit('updateWindow', { name: 'booklist', val: true })
    },
  },
}
</script>

<style scoped>
.icon-booklist {
  color: #3fd5f6;
}
</style>
