<template>
  <el-button type="primary" size="medium" @click="open">登录</el-button>
</template>

<script>
export default {
  name: 'LoginBtn',
  methods: {
    open() {
      this.$store.commit('updateWindow', { name: 'lr', val: true })
    },
  },
}
</script>
