<template>
  <el-button class="setting-btn" type="text" @click="open">
    <i class="iconfont icon-setting"></i>
  </el-button>
  <teleport to="#popup">
    <transition name="zoom">
      <popup title="设置" :rect="{ width: 400, height: 600 }" v-if="popupOpen" v-model="popupOpen">
        <div class="setting">
          <div class="setting-item">
            <div class="title">暗黑模式</div>
            <div>
              <el-switch
                v-model="theme.darkmode"
                active-icon-class="iconfont icon-moon"
                inactive-icon-class="iconfont icon-sun"
                @change="darkModeChange"
              ></el-switch>
            </div>
          </div>
          <div class="setting-item">
            <div class="title">弹窗主题</div>
            <div class="color-picker">
              <div
                class="color-picker-item"
                v-for="item in color"
                :key="item"
                :style="showColor(item)"
                @click="colorPicker(item)"
              ></div>
            </div>
          </div>
          <div class="setting-item">
            <div class="title">桌面壁纸</div>
            <div class="image-picker">
              <div
                class="image-picker-item"
                v-for="item in backgroundImages"
                :key="item"
                @click="imagePicker(item)"
              >
                <img class="image-picker-item-img" :src="item" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </popup>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { reactive, inject } from 'vue'
import { useStore } from '../../store'
import Popup from '../Popup.vue'

const store = useStore()

const isMobile = inject<boolean>('isMobile')
const color = ['#e2e2e2', '#4456a7', '#44a75e', '#a74444', '#474747', '#282c35', '#008080']
const backgroundImages = [
  'https://cdn.apasser.xyz/blog/conurbation.jpg',
  'https://cdn.apasser.xyz/blog/escape.jpg',
  'https://cdn.apasser.xyz/blog/october_rain.jpg',
]
const rootStyle = document.documentElement.style
const bodyStyle = document.body.style

const theme = reactive({
  darkmode: true,
  popupHeader: '#e2e2e2',
  backgroundImage: backgroundImages[0],
})
ref: popupOpen = false

function open() {
  if (isMobile) {
    store.commit('updateDrawer', false)
  }
  popupOpen = true
}

function showColor(color: string) {
  return { backgroundColor: color }
}

function colorPicker(val: string) {
  rootStyle.setProperty('--popup-header-bgcolor', val)
  const fontColor = val === color[0] ? 'black' : 'white'
  rootStyle.setProperty('--popup-title-color', fontColor)
  theme.popupHeader = val
}

function imagePicker(img: string) {
  bodyStyle.setProperty('background-image', `url(${img})`)
  theme.backgroundImage = img
}

function darkModeChange(isDarkmode: any) {
  rootStyle.setProperty('--global-bgcolor', isDarkmode ? '#252d38' : 'white')
  rootStyle.setProperty('--nav-bar-bgcolor', isDarkmode ? '#252d38' : '#e2e2e2')
  rootStyle.setProperty('--global-color', isDarkmode ? 'white' : 'black')
  // #2f3133: 深灰色; #e7e6ec: 浅灰色
  rootStyle.setProperty('--input-bgcolor', isDarkmode ? '#2f3133' : '#e7e6ec')
  rootStyle.setProperty('--pre-bgcolor', isDarkmode ? '#282c34' : '#f8f8f8')
  rootStyle.setProperty('--code-bgcolor', isDarkmode ? '#3d404c' : '#d9dce6')
  colorPicker(isDarkmode ? color[5] : color[0])
}

function init() {
  const themeSotre = localStorage.getItem('theme')
  if (themeSotre) {
    const { darkmode, popupHeader, backgroundImage } = JSON.parse(themeSotre)
    theme.darkmode = darkmode
    theme.popupHeader = popupHeader
    theme.backgroundImage = backgroundImage
  }
  darkModeChange(theme.darkmode)
  colorPicker(theme.popupHeader)
  imagePicker(theme.backgroundImage)
}

window.addEventListener('unload', () => {
  localStorage.setItem('theme', JSON.stringify(theme))
})

init()
</script>

<style scoped>
.setting-btn {
  display: block;
  transition: transform 0.5s;
  padding: 0;
}

.setting-btn:hover {
  transform: rotate(0.5turn);
}

.iconfont {
  font-size: 40px;
  color: #7a80fc;
}

.setting {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: overlay;
}

.setting-item {
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

.color-picker:hover > .color-picker-item {
  opacity: 0.5;
}

.color-picker-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 10px 6px;
  cursor: pointer;
  transition: transform 0.3s;
}

@media (max-width: 1024px) {
  .color-picker-item {
    width: 30px;
    height: 30px;
  }
}

.color-picker > .color-picker-item:hover {
  opacity: 1;
  transform: scale(1.2);
}

.image-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  row-gap: 20px;
  box-sizing: border-box;
}

.image-picker-item {
  width: 90%;
  height: 100px;
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.image-picker-item-img {
  width: 100%;
  height: 100%;
}

.image-picker-item::before {
  content: '';
  position: absolute;
  border: 2px solid var(--primary-color);
  top: -16px;
  right: -16px;
  bottom: -16px;
  left: -16px;
  opacity: 0;
  transition-property: top, right, bottom, left;
  transition-duration: 0.3s;
}

.image-picker-item:hover::before {
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  opacity: 1;
}

.el-switch {
  margin-left: 6px;
}

::v-global(.icon-sun) {
  color: yellow !important;
}

::v-global(.icon-moon) {
  color: blueviolet !important;
}
</style>
