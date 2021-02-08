<template>
  <div class="blog">
    <div class="list">
      <popup-window title="Posts">
        <div
          class="list-inner"
          v-loading="postsLoading"
          element-loading-background="var(--blog-bgcolor)"
          v-infinite-scroll="loadPosts"
          infinite-scroll-immediate="false"
          infinite-scroll-disabled="infiniteScrollDisable"
        >
          <el-card
            class="list-card"
            :class="{ 'list-card-active': listCardActiveIndex[index] }"
            v-for="(post, index) in posts"
            :key="index"
            @click.native="changeActiveIndex(index)"
            shadow="hover"
          >
            <h4 class="list-card-title">{{ post.title }}</h4>
            <div class="list-card-date">{{ post.date | date }}</div>
          </el-card>
          <div
            class="infinite-scroll-loading"
            v-loading="infiniteScrollLoading"
            element-loading-background="var(--blog-bgcolor)"
          >
            <span v-if="noMore">没有更多了</span>
          </div>
        </div>
      </popup-window>
    </div>
    <div class="content-container">
      <popup-window :title="currentPost.title">
        <div
          class="content-container-inner"
          v-loading="postsLoading"
          element-loading-background="var(--blog-bgcolor)"
        >
          <div class="markdown-body" v-html="currentPost.content"></div>
        </div>
      </popup-window>
    </div>
  </div>
</template>

<script>
import PopupWindow from '../components/PopupWindow.vue'
import '../styles/github-markdown.css'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  name: 'Blog',
  components: { PopupWindow },
  data: () => ({
    posts: [],
    postsLoading: false,
    currentPostIndex: 0,
    // 动态class信号数组
    listCardActiveIndex: [],
    infiniteScrollLoading: false,
    noMore: false,
    nextPage: 2,
  }),
  computed: {
    currentPost() {
      // 未取得数据时返回临时对象
      return this.posts.length !== 0
        ? this.posts[this.currentPostIndex]
        : { title: '', content: '' }
    },
    infiniteScrollDisable() {
      return this.infiniteScrollLoading || this.noMore
    },
  },
  methods: {
    async getPosts() {
      this.postsLoading = true
      try {
        const { data } = await this.$axios.get('/posts?sort=date&page=1')
        this.posts.push(...data)
        this.listCardActiveIndex.push(...new Array(data.length).fill(false))
        this.listCardActiveIndex[0] = true
      } catch (err) {
        this.$throw(err)
      }
      this.postsLoading = false
    },
    changeActiveIndex(val) {
      this.currentPostIndex = val
      this.listCardActiveIndex.fill(false)
      this.listCardActiveIndex[val] = true
    },
    async loadPosts() {
      this.infiniteScrollLoading = true
      try {
        const { data } = await this.$axios.get(`/posts?sort=date&page=${this.nextPage}`)
        if (!data.length) {
          this.noMore = true
          this.infiniteScrollLoading = false
          return
        }
        this.posts.push(...data)
        this.listCardActiveIndex.push(...new Array(data.length).fill(false))
        this.nextPage += 1
      } catch (err) {
        this.$throw(err)
      }
      this.infiniteScrollLoading = false
    },
  },
  mounted() {
    this.getPosts()
  },
}
</script>

<style scoped>
.blog {
  display: flex;
  padding: 20px 40px;
  box-sizing: border-box;
  height: 100%;
}

.list {
  width: 20%;
  margin-right: 15px;
}

.content-container {
  width: calc(100% - 20% - 15px);
}

.list-inner,
.content-container-inner {
  height: 100%;
}

.list-inner {
  padding: 0 15px;
}

.list-card {
  background-color: inherit;
  color: inherit;
  border: unset;
  margin: 10px;
}

.list-card-active {
  background-color: var(--primary-color);
}

/* 处在active状态的card标题不变色 */
.list-card-active:hover .list-card-title {
  color: unset !important;
}

.list-card:hover {
  box-shadow: 0 2px 12px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.list-card:hover .list-card-title {
  color: var(--primary-color);
}

.list-card-title {
  margin: 0 0 5px 0;
  max-height: 3rem;
  overflow-y: hidden;
}

.list-card-date {
  opacity: 0.5;
  font-size: small;
}

.infinite-scroll-loading {
  height: 70px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 80%;
  margin: 0 auto;
  padding: 45px;
}
</style>
