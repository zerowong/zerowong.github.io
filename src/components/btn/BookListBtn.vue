<template>
  <el-button class="button-bar-btn" type="text" @click="open">
    <div class="button-bar-btn__inner">
      <i class="iconfont icon-booklist"></i>
      <span class="btn-name">书单</span>
    </div>
  </el-button>
  <teleport to="#popup">
    <transition name="zoom">
      <popup title="书单" :rect="{ width: 700, height: 900 }" v-if="popupOpen" v-model="popupOpen">
        <book-list />
      </popup>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import Popup from '../Popup.vue'
import BookList from '../popup/BookList.vue'

ref: popupOpen = false

function open() {
  popupOpen = true
}
</script>

<style scoped>
.icon-booklist {
  color: #3fd5f6;
}
</style>
