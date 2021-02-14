<template>
  <div class="about">
    <div class="me">
      <popup-window title="Me">
        <div class="me-inner">
          <div class="avatar">
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
      </popup-window>
    </div>
    <div class="show">
      <popup-window title="Show">
        <div class="show-inner">
          <h1>交换友链</h1>
          <div>
            <p>
              按以下格式到发送到
              <a style="color: var(--primary-color);" href="mailto:wongzero@foxmail.com"
                >wongzero@foxmail.com</a
              >，留言也行
            </p>
            <p>名字：ApassEr</p>
            <p>简介：This is an accelerated world</p>
            <p>地址：https://apasser.xyz</p>
            <p>头像：https://cdn.apasser.xyz/blog/avatar.jpg</p>
          </div>
        </div>
      </popup-window>
    </div>
    <div class="friends">
      <popup-window title="Friends">
        <div
          class="friends-inner"
          v-loading="friendsLoading"
          element-loading-background="var(--blog-bgcolor)"
          v-infinite-scroll="loadFriends"
          infinite-scroll-immediate="false"
          infinite-scroll-disabled="infiniteScrollDisbale"
        >
          <transition-group name="MTBFB" tag="div" css>
            <a
              class="friend-link"
              v-for="friend in friends"
              :key="friend._id"
              :href="friend.link"
              target="_blank"
            >
              <el-card class="friend-card" shadow="hover">
                <div class="friend-card-inner">
                  <img
                    class="friend-avatar"
                    :src="friend.avatar"
                    :alt="`${friend.name}'s avatar`"
                    loading="lazy"
                  />
                  <div>
                    <div class="friend-name">{{ friend.name }}</div>
                    <div class="friend-desc">{{ friend.desc }}</div>
                  </div>
                </div>
              </el-card>
            </a>
          </transition-group>
          <div
            class="infinite-scroll-loading"
            v-loading="infiniteScrollLoading"
            element-loading-background="var(--blog-bgcolor)"
          >
            <span class="no-more" v-if="noMore">没有更多了</span>
          </div>
        </div>
      </popup-window>
    </div>
  </div>
</template>

<script>
import PopupWindow from '../components/PopupWindow.vue'
import { SITE_URL_MY_AVATAR } from '../utils/constants'

export default {
  name: 'About',
  data: () => ({
    avatar: SITE_URL_MY_AVATAR,
    friends: [],
    friendsLoading: false,
    infiniteScrollLoading: false,
    nestPage: 2,
    noMore: false,
    social: [
      { href: 'https://www.zhihu.com/people/wongzero', icon: 'icon-zhihu' },
      { href: 'https://github.com/zerowong', icon: 'icon-github' },
      { href: 'https://space.bilibili.com/8380727', icon: 'icon-bilibili' },
    ],
  }),
  computed: {
    infiniteScrollDisbale() {
      return this.infiniteScrollLoading || this.noMore
    },
  },
  components: { PopupWindow },
  methods: {
    async getFriends() {
      this.friendsLoading = true
      try {
        const { data } = await this.$axios.get('/friends/?page=1')
        this.friends.push(...data)
      } catch (err) {
        this.$throw(err)
      }
      this.friendsLoading = false
    },
    async loadFriends() {
      this.infiniteScrollLoading = true
      try {
        const { data } = await this.$axios.get(`/friends?page=${this.nestPage}`)
        if (!data.length) {
          this.noMore = true
          this.infiniteScrollLoading = false
          return
        }
        this.friends.push(...data)
        this.nestPage += 1
      } catch (err) {
        this.$throw(err)
      }
      this.infiniteScrollLoading = false
    },
  },
  mounted() {
    this.getFriends()
  },
}
</script>

<style scoped>
.about {
  display: flex;
  padding: 20px 40px;
  box-sizing: border-box;
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

.show {
  width: calc(100% - 50% - 30px);
  margin-right: 15px;
}

.show-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.friends {
  width: 25%;
}

.friends-inner {
  height: 100%;
  padding: 0 30px;
}

.friend-link {
  display: block;
  width: 100%;
  margin: 5px 0;
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

.infinite-scroll-loading {
  height: 70px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-more {
  color: var(--dark-gray);
}
</style>
