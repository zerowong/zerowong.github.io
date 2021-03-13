<template>
  <div class="home-container">
    <footer class="footer">
      <span>
        © 2021 All
        <a class="link" :href="links[0].url" :tabindex="-1">{{ links[0].name }}</a>
        Rights Reserved.
      </span>
      <a class="link" :href="links[1].url" :tabindex="-1">{{ links[1].name }}</a>
    </footer>
    <div class="button-bar">
      <messages-btn />
      <book-list-btn />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MessagesBtn from '../components/btn/MessagesBtn.vue'
import BookListBtn from '../components/btn/BookListBtn.vue'

const links = [
  { url: 'https://apasser.xyz', name: 'apasser.xyz' },
  { url: 'http://beian.miit.gov.cn', name: '湘ICP备2020022697号-1' },
]
</script>

<style scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.footer {
  width: 100%;
  height: 80px;
  color: var(--global-color);
  background-color: var(--global-bgcolor);
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  row-gap: 5px;
}

.link {
  color: inherit;
  text-decoration: none;
}

.link:hover {
  color: var(--primary-color);
}

.button-bar {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 55px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 15px;
  box-shadow: 0 0 6px 0 black;
}

@media (max-width: 1024px) {
  .footer {
    font-size: small;
  }
}

/* 底部按钮栏按钮位置 */
:deep(.button-bar-btn) {
  position: relative;
  bottom: 30px;
}

:deep(.button-bar-btn__inner) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

:deep(.iconfont) {
  transition: transform 0.1s;
  font-size: var(--primary-btn-size);
}

:deep(.button-bar-btn:hover .iconfont) {
  transform: scale(1.5) translateY(-10px);
}

:deep(.btn-name) {
  color: white;
  font-size: small;
}
</style>
