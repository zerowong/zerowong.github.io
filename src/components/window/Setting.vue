<template>
  <div class="container">
    <div class="item">
      <div class="title">暗黑模式</div>
      <div>
        <el-switch
          v-model="config.darkmode"
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
import { backgroundImage } from '../../utils/img-urls'
import settingMixin from '../../utils/setting-mixin'

export default {
  name: 'Setting',
  mixins: [settingMixin],
  data: () => ({
    backgroundImage,
  }),
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showColor(color) {
      return { backgroundColor: color }
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
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
