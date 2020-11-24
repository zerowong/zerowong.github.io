<template>
  <div class="pw-container">
    <div class="pw-header" @mousedown.self.left="mouseDown" @mouseup="mouseUp">
      <span class="pw-title">{{ title }}</span>
      <el-button class="pw-header-btn" type="text" v-if="showClose" @click="close">
        <i class="el-icon-circle-close"></i>
      </el-button>
    </div>
    <div class="pw-body">
      <slot></slot>
    </div>
    <div class="pw-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupWindow',
  props: {
    title: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    moveable: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    isMove: false,
    // 移动时计算的原点为左上角
    offsetLeft: 0,
    offsetTop: 0,
  }),
  methods: {
    mouseDown(event) {
      if (!this.moveable) return
      // 取得当前组件相对于视口的位置
      const { left, top } = this.$el.getBoundingClientRect()
      // 计算鼠标按下时坐标距组件左上角的偏移量
      this.offsetLeft = event.clientX - left
      this.offsetTop = event.clientY - top
      this.isMove = true
    },
    mouseMove(event) {
      // 移动该组件时才做计算
      if (!this.isMove) return
      const moveToLeft = event.clientX - this.offsetLeft
      const moveToTop = event.clientY - this.offsetTop
      this.$el.style.left = `${moveToLeft}px`
      this.$el.style.top = `${moveToTop}px`
    },
    mouseUp() {
      this.isMove = false
    },
    close() {
      this.$emit('close')
    },
  },
  mounted() {
    if (this.moveable) {
      window.addEventListener('mousemove', this.mouseMove)
    }
  },
  destroyed() {
    if (this.moveable) {
      window.removeEventListener('mousemove', this.mouseMove)
    }
  },
}
</script>

<style scoped>
.pw-container {
  /* 限制在可视窗口内，不影响滚动 */
  position: fixed;
  z-index: 10000;
}

.pw-body {
  height: calc(100% - 84px);
  width: 100%;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.pw-footer,
.pw-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: var(--bg-pw-header);
  border: 1px solid black;
}

.pw-header {
  border-radius: 18px 18px 0 0;
}

.pw-footer {
  border-radius: 0 0 18px 18px;
}

.pw-title {
  font-size: x-large;
}

.pw-header-btn {
  position: absolute;
  top: 4px;
  right: 3%;
  font-size: xx-large;
  color: red;
  padding: 0;
}
</style>
