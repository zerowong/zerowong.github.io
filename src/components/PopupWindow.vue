<template>
  <div :class="['pw-container', { 'pw-container-moveable': moveable }]">
    <div class="pw-header" @mousedown.self.left="mouseDown" @mouseup="mouseUp">
      <span class="pw-title">{{ title }}</span>
      <el-button class="pw-header-btn" type="text" v-if="moveable" @click="close">
        <i class="el-icon-circle-close"></i>
      </el-button>
    </div>
    <div class="pw-body">
      <slot></slot>
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
    moveable: {
      type: Boolean,
      default: false,
    },
    windowName: String,
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
      this.$store.commit('updateWindow', { name: this.windowName, val: false })
    },
    // 配置初始化
    init() {
      // 居中
      const { height, width } = window.getComputedStyle(this.$el)
      this.$el.style.left = `calc(50% - ${parseInt(width, 10) / 2}px)`
      this.$el.style.top = `calc(50% - ${parseInt(height, 10) / 2}px)`
    },
  },
  mounted() {
    if (this.moveable) {
      this.init()
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
  /* 默认为100%，设置为可拖动时提供确定数值 */
  height: 100%;
}

.pw-container-moveable {
  /* 限制在可视窗口内，不影响滚动 */
  position: fixed;
  /* 确保在其它元素之上 */
  z-index: 10000;
}

.pw-body {
  height: calc(100% - 42px);
  width: 100%;
  border: 1px solid black;
  border-radius: 0 0 18px 18px;
  /* 禁用滚动防止覆盖border-radius样式 */
  overflow: hidden;
}

.pw-body > * {
  border-radius: inherit;
  overflow-y: auto;
}

.pw-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: var(--pw-header-bgcolor);
  border: 1px solid black;
  border-bottom: 0;
  border-radius: 18px 18px 0 0;
}

.pw-title {
  color: var(--pw-title-color);
  font-size: larger;
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
