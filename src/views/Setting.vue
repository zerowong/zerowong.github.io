<template>
  <div class="setting-interface">
    <div class="item">
      <div class="title">暗黑模式</div>
      <div>
        <el-switch
          v-model="blogDarkMode"
          :width="60"
          active-icon-class="iconfont icon-moon"
          inactive-icon-class="iconfont icon-sun"
          @change="darkModeChange"
        ></el-switch>
      </div>
    </div>
    <div class="item">
      <div class="title">弹窗主题</div>
      <div class="color-picker">
        <div
          class="color-picker-item"
          v-for="(item, index) in color"
          :key="index"
          :style="showColor(item)"
          @click="colorPicker(item)"
        ></div>
      </div>
    </div>
    <div class="item">
      <div class="title">桌面壁纸</div>
      <div class="image-picker">
        <img
          class="image-picker-item"
          v-for="(item, index) in backgroundImage"
          :key="index"
          :src="item"
          @click="imagePicker(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { backgroundImage } from '../utils/img-urls'

export default {
  name: 'Setting',
  data: () => ({
    color: ['#e2e2e2', '#4456a7', '#44a75e', '#a74444', '#474747', '#282c35', '#008080'],
    rootStyle: document.documentElement.style,
    bodyStyle: document.body.style,
    blogDarkMode: false,
    backgroundImage,
  }),
  props: {
    isDarkMode: Boolean,
  },
  methods: {
    showColor(color) {
      return { backgroundColor: color }
    },
    colorPicker(color) {
      this.rootStyle.setProperty('--pw-header-bgcolor', color)
      const fontColor = color === this.color[0] ? 'black' : 'white'
      this.rootStyle.setProperty('--pw-title-color', fontColor)
    },
    imagePicker(img) {
      this.bodyStyle.setProperty('background-image', `url(${img})`)
    },
    darkModeChange(val) {
      this.$emit('dark-mode-change', val)
      this.rootStyle.setProperty('--blog-bgcolor', val ? '#252d38' : 'white')
      this.rootStyle.setProperty('--blog-color', val ? 'white' : 'black')
      this.colorPicker(val ? this.color[5] : this.color[0])
    },
  },
  mounted() {
    this.blogDarkMode = this.isDarkMode
  },
}
</script>

<style scoped>
.setting-interface {
  height: 100%;
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.item {
  padding: 10px 20px;
}

.title {
  font-size: x-large;
  margin-bottom: 10px;
}

.color-picker {
  display: flex;
  flex-direction: row;
}

.color-picker:hover > div {
  opacity: 0.5;
}

.color-picker-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 10px 6px;
  cursor: pointer;
}

.color-picker > .color-picker-item:hover {
  opacity: 1;
  transform: scale(1.1);
}

.image-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-picker-item {
  width: 90%;
  height: 100px;
  padding: 2px;
  margin: 2px;
  border: 2px solid transparent;
  cursor: pointer;
}

.image-picker-item:hover {
  border: 2px solid var(--primary-color);
}

.el-switch {
  margin-left: 6px;
}
</style>

<style>
.el-switch__core {
  height: 30px;
  border-radius: 15px;
}

.el-switch__core::after {
  top: 1.5px;
  width: 24px;
  height: 24px;
}

.el-switch.is-checked .el-switch__core::after {
  margin-left: -25.5px;
}

.el-switch__label * {
  font-size: 21px;
  color: var(--blog-color);
}
</style>
