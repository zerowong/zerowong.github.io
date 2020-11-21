<template>
  <div>{{ time }}</div>
</template>

<script>
export default {
  name: 'RunningTime',
  data: () => ({
    start: new Date('08/18/2020 00:00:00'),
    time: '',
  }),
  methods: {
    tick() {
      setInterval(this.update, 1000)
    },
    update() {
      const interval = (new Date() - this.start) / 1000
      const day = Math.floor(interval / 86400)
      const hour = Math.floor(interval / 3600 - 24 * day)
      const minute = Math.floor(interval / 60 - 1440 * day - 60 * hour)
      const second = Math.round(interval - 86400 * day - 3600 * hour - 60 * minute)
      this.time = `本站已运行 ${day} 天 ${hour} 小时 ${minute} 分钟 ${second} 秒`
    },
  },
  mounted() {
    this.tick()
  },
}
</script>

<style scoped></style>
