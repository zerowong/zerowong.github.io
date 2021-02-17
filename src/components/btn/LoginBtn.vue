<template>
  <el-button class="shadowPulse" type="primary" size="medium" @click="open">登录</el-button>
</template>

<script>
export default {
  name: 'LoginBtn',
  inject: ['isMobile'],
  methods: {
    open() {
      if (this.isMobile) {
        this.$store.commit('updateDrawer', false)
      }
      this.$store.commit('updateWindow', { name: 'lr', val: true })
    },
  },
}
</script>
