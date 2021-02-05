<template>
  <div class="pw-container" :class="{ 'pw-container-moveable': moveable }">
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
import { mapState, mapMutations } from 'vuex'

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
    width: Number,
    height: Number,
  },
  data: () => ({
    isMove: false,
    // 移动时计算的原点为左上角
    offsetLeft: 0,
    offsetTop: 0,
    closeClicked: false,
  }),
  computed: { ...mapState(['maxZIndex']) },
  methods: {
    ...mapMutations(['updateMaxZIndex']),
    mouseDown(event) {
      if (!this.moveable) return
      // 点击窗口时保持最前
      this.$el.style.zIndex = this.maxZIndex + 1
      this.updateMaxZIndex()
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
      this.closeClicked = true
      this.$store.commit('updateWindow', { name: this.windowName, val: false })
    },
    // 配置初始化
    init() {
      // 窗口大小
      this.$el.style.width = `${this.width}px`
      this.$el.style.height = `${this.height}px`
      // 居中
      this.$el.style.left = `calc(50% - ${this.width / 2}px)`
      this.$el.style.top = `calc(50% - ${this.height / 2}px)`
      // 打开窗口时保持最前
      this.$el.style.zIndex = this.maxZIndex + 1
      this.updateMaxZIndex()
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
      // 没有主动关闭且切换了路由时自动更新信号量，避免路由切回时自动打开
      if (!this.closeClicked) {
        this.$store.commit('updateWindow', { name: this.windowName, val: false })
      }
    }
  },
}
</script>

<style scoped>
.pw-container {
  /* 默认为100%，设置为可拖动时通过props提供 */
  height: 100%;
  border-radius: 18px;
  box-shadow: 0 0 10px 0 black;
}

.pw-container-moveable {
  /* 限制在可视窗口内，不影响滚动 */
  position: fixed;
}

.pw-body {
  height: calc(100% - 40px);
  width: 100%;
  border-radius: 0 0 18px 18px;
  /* 禁用滚动防止覆盖border-radius样式 */
  overflow: hidden;
  /* 默认自带主题切换 */
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
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
