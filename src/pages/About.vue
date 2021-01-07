<template>
  <div class="about">
    <div class="me">
      <popup-window title="Me">
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
      <popup-window title="Show">
        <div class="show-inner">TODO...</div>
      </popup-window>
    </div>
    <div class="friends">
      <popup-window title="Friends">
        <div
          class="friends-inner"
          v-loading="friendsLoading"
          element-loading-background="var(--blog-bgcolor)"
        >
          <a v-for="friend in friends" :key="friend.id" :href="friend.link" target="_blank">
            <el-card class="friend-card" shadow="hover">
              <div class="friend-card-inner">
                <el-image class="friend-avatar" :src="friend.avatar" lazy>
                  <div slot="error">
                    <i class="el-icon-picture-outline icon-error"></i>
                  </div>
                </el-image>
                <div>
                  <div class="friend-name">{{ friend.name }}</div>
                  <div class="friend-desc">{{ friend.desc }}</div>
                </div>
              </div>
            </el-card>
          </a>
        </div>
      </popup-window>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
  computed: {
    ...mapState(['friends']),
    ...mapGetters(['friendsLoading']),
  },
  methods: {
    ...mapActions(['getData']),
  },
  created() {
    this.getData('friends')
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

.me-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--blog-bgcolor);
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

.show-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
}

.friends {
  width: 25%;
}

.friends-inner {
  height: 100%;
  background-color: var(--blog-bgcolor);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.friends-inner > a {
  width: 100%;
  margin-bottom: 10px;
  text-decoration: none;
}

.friend-card {
  background-color: inherit;
  color: var(--blog-color);
  border: unset;
}

.friend-card:hover {
  box-shadow: 0 2px 12px 10px rgba(0, 0, 0, 0.1);
}

.friend-card-inner {
  display: flex;
}

.friend-avatar {
  border-radius: 4px;
  width: 60px;
  min-width: 60px;
  height: 60px;
  margin-right: 10px;
}

.friend-name {
  color: var(--primary-color);
  margin-bottom: 10px;
  max-height: 1.3125rem;
  overflow-y: hidden;
}

.friend-desc {
  opacity: 0.7;
  font-size: small;
  max-height: 2rem;
  overflow-y: hidden;
}
</style>
