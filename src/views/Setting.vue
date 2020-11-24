<template>
  <div class="setting-interface">
    <div class="item">
      <div class="title">背景颜色</div>
      <div class="color-picker">
        <div
          class="color-picker-item"
          v-for="(item, index) in color"
          :key="index"
          :style="getBgColor(item)"
          @click="colorPicker(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data: () => ({
    color: ['#000000', '#4456a7', '#44a75e', '#a74444', '#474747', '#282c35', '#008080'],
  }),
  methods: {
    getBgColor(color) {
      return { backgroundColor: color }
    },
    colorPicker(color) {
      document.documentElement.style.setProperty('--bg-docBody', color)
    },
  },
}
</script>

<style scoped>
.setting-interface {
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.item {
  padding: 20px;
}

.title {
  font-size: x-large;
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
</style>
