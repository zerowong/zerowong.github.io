<template>
  <div class="about">
    <popup title="Me">
      <div class="me-inner">
        <div>
          <img class="me-inner-img" :src="avatar" alt="blogger's avatar" loading="lazy" />
        </div>
        <div class="social">
          <a
            class="social-link"
            target="_blank"
            v-for="(item, index) in social"
            :key="index"
            :href="item.href"
          >
            <i class="iconfont" :class="item.icon"></i>
          </a>
        </div>
      </div>
    </popup>
  </div>
</template>

<script lang="ts" setup>
import Popup from '../components/Popup.vue'

const avatar = 'https://cdn.apasser.xyz/blog/avatar.jpg'
const social = [
  { href: 'https://www.zhihu.com/people/wongzero', icon: 'icon-zhihu' },
  { href: 'https://github.com/zerowong', icon: 'icon-github' },
  { href: 'https://space.bilibili.com/8380727', icon: 'icon-bilibili' },
  { href: 'https://twitter.com/ApassEr0x00', icon: 'icon-twitter' },
]
</script>

<style scoped>
.about {
  /* display: flex; */
  padding: 20px 40px;
  box-sizing: border-box;
  height: 100%;
  /* column-gap: 15px; */
}

.me-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  row-gap: 40px;
}

.me-inner-img {
  border-radius: 50%;
}

.social .iconfont {
  font-size: 40px;
}

.social-link {
  text-decoration: none;
  margin: 0 5px;
}

.social .iconfont:hover {
  opacity: 70%;
}

.icon-zhihu {
  color: #1b61de;
}

.icon-github {
  color: #0085a1;
}

.icon-bilibili {
  color: #fb7299;
}

.icon-twitter {
  color: #1a91da;
}
</style>
