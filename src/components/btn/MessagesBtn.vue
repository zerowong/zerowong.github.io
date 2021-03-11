<template>
  <el-button class="button-bar-btn" type="text" @click="open">
    <div class="button-bar-btn__inner">
      <i class="iconfont icon-messages"></i>
      <span class="btn-name">留言</span>
    </div>
  </el-button>
  <teleport to="#popup">
    <transition name="zoom">
      <popup title="留言" :rect="{ width: 700, height: 900 }" v-if="popupOpen" v-model="popupOpen">
        <messages />
      </popup>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import Popup from '../Popup.vue'
import Messages from '../popup/Messages.vue'

ref: popupOpen = false

function open() {
  popupOpen = true
}
</script>

<style scoped>
.icon-messages {
  color: #3dc3c6;
}
</style>
