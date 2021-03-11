<template>
  <div class="popup-container" :class="{ moveable: isMoveable }" ref="root">
    <div class="popup-header" @mousedown.self.left="mouseDown" @mouseup="mouseUp">
      <span class="popup-title">{{ title ?? '' }}</span>
      <el-button class="popup-header-btn" :type="'text'" v-if="isMoveable" @click="close">
        <i class="iconfont icon-close"></i>
      </el-button>
    </div>
    <div class="popup-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit, inject, onMounted, onUnmounted } from 'vue'
import { useStore } from '../store'

const store = useStore()
const props = defineProps<{
  title?: string
  rect?: {
    width: number
    height: number
  }
  modelValue?: boolean
}>()
const emit = defineEmit(['update:modelValue'])
const isMobile = inject<boolean>('isMobile')

const isMoveable = props.rect ? true : false
let moving = false
let offsetLeft = 0
let offsetTop = 0
let closeClicked = false

ref: root = null as HTMLElement | null

function mouseDown(event: MouseEvent) {
  if (!root) return
  // 点击窗口顶栏时使其保持最前
  root.style.zIndex = String(store.state.maxZIndex + 1)
  store.commit('incrMaxZIndex')
  // 取得组件根元素相对于视口的位置
  const { left, top } = root.getBoundingClientRect()
  // 计算鼠标按下时坐标距组件根元素左上角的偏移量
  offsetLeft = event.clientX - left
  offsetTop = event.clientY - top
  moving = true
}

function mouseUp() {
  moving = false
}

function mouseMove(event: MouseEvent) {
  if (!root) return
  if (!moving) return
  root.style.left = `${event.clientX - offsetLeft}px`
  root.style.top = `${event.clientY - offsetTop}px`
}

function close() {
  closeClicked = true
  emit('update:modelValue', false)
}

// 配置初始化
function init() {
  if (!root) return
  if (!props.rect) return
  if (isMobile) {
    root.style.width = '90vw'
    root.style.height = '90vh'
    root.style.top = '5vh'
    root.style.left = '5vw'
  } else {
    const { width, height } = props.rect
    // 窗口大小
    root.style.width = `${width}px`
    root.style.height = `${height}px`
    // 居中
    root.style.left = `calc(50% - ${width / 2}px)`
    root.style.top = `calc(50% - ${height / 2}px)`
    window.addEventListener('mousemove', mouseMove)
  }
  // 打开窗口时保持最前
  root.style.zIndex = String(store.state.maxZIndex)
  store.commit('incrMaxZIndex')
}

onMounted(init)

onUnmounted(() => {
  if (isMoveable) {
    window.removeEventListener('mousemove', mouseMove)
    // 没有主动关闭且切换了路由时自动更新信号量，避免路由切回时自动打开
    if (!closeClicked) {
      emit('update:modelValue', false)
    }
  }
})
</script>

<style scoped>
.popup-container {
  /* 默认为100%，设置为可拖动时通过props提供 */
  height: 100%;
  border-radius: 18px;
  box-shadow: 0 0 10px 0 black;
}

.moveable {
  /* 限制在可视窗口内，不影响滚动 */
  position: fixed;
}

.popup-body {
  height: calc(100% - 40px);
  width: 100%;
  border-radius: 0 0 18px 18px;
  /* 禁用滚动防止插槽内的滚动条出现在边框上层 */
  overflow: hidden;
  /* 默认自带主题切换 */
  background-color: var(--global-bgcolor);
  color: var(--global-color);
}

.popup-header {
  height: 40px;
  background-color: var(--popup-header-bgcolor);
  border-radius: 18px 18px 0 0;
  text-align: center;
  line-height: 40px;
}

.moveable > .popup-header {
  cursor: grab;
}

.moveable > .popup-header:active {
  cursor: grabbing;
}

.popup-title {
  color: var(--popup-title-color);
  font-size: larger;
  cursor: text;
}

.popup-header-btn {
  position: absolute;
  top: 4px;
  right: 3%;
  padding: 0;
  min-height: auto;
  border: unset;
}

.icon-close {
  font-size: xx-large;
  color: red;
}
</style>
