<template>
  <div class="popover">{{ content }}</div>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    content: String,
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
  },
  mounted() {
    setTimeout(this.close, 1000)
  },
}
</script>

<style scoped>
.popover {
  position: absolute;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  padding: 6px 15px 10px 15px;
  border-radius: 4px;
}
</style>
