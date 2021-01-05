<template>
  <div class="about">
    <div class="me">
      <popup-window class="me-pw" title="Me">
        <div class="me-inner">
          <div class="avatar">
            <el-image class="me-inner-img" :src="avatar">
              <div slot="error">
                <i class="el-icon-picture-outline icon-error"></i>
              </div>
            </el-image>
          </div>
          <div class="social">
            <a target="_blank" href="https://www.zhihu.com/people/wongzero">
              <i class="iconfont icon-zhihu"></i>
            </a>
            <a target="_blank" href="https://github.com/zerowong">
              <i class="iconfont icon-github"></i>
            </a>
            <a target="_blank" href="https://space.bilibili.com/8380727">
              <i class="iconfont icon-bilibili"></i>
            </a>
          </div>
        </div>
      </popup-window>
    </div>
    <div class="show">
      <popup-window class="show-pw" title="Show">
        <div class="show-inner">TODO...</div>
      </popup-window>
    </div>
    <div class="friends">
      <popup-window class="friends-pw" title="Friends">
        <div class="friends-inner">
          <!-- TODO -->
        </div>
      </popup-window>
    </div>
  </div>
</template>

<script>
import PopupWindow from '../views/PopupWindow.vue'
import { avatar } from '../utils/img-urls'

export default {
  name: 'About',
  data: () => ({
    avatar,
  }),
  components: {
    PopupWindow,
  },
}
</script>

<style scoped>
.about {
  display: flex;
  padding: 0 40px;
  height: 100%;
}

.me {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}

.me-pw {
  position: static;
  height: 100%;
}

.me-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #3c3431;
}

.me-inner-img {
  border-radius: 50%;
}

.icon-error {
  font-size: 60px;
}

.avatar {
  margin-bottom: 40px;
}

.social .iconfont {
  font-size: 40px;
}

.social a {
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

.show {
  width: calc(100% - 50% - 30px);
  margin-right: 15px;
}

.show-pw {
  position: static;
  height: 100%;
}

.show-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: black;
  color: white;
}

.friends {
  width: 25%;
}

.friends-pw {
  position: static;
  height: 100%;
}

.friends-inner {
  height: 100%;
  background-color: var(--bg-footer);
}
</style>
