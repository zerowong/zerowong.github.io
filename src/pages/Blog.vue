<template>
  <div class="blog">
    <div class="list">
      <popup-window title="blogs">
        <div
          class="list-inner"
          v-loading="blogsLoading"
          element-loading-background="var(--blog-bgcolor)"
          v-infinite-scroll="loadBlogs"
          infinite-scroll-immediate="false"
          infinite-scroll-disabled="infiniteScrollDisable"
        >
          <el-card
            :class="['list-card', { 'list-card-active': listCardActiveIndex[index] }]"
            v-for="(blog, index) in blogs"
            :key="index"
            @click.native="changeActiveIndex(index)"
            shadow="hover"
          >
            <h4 class="list-card-title">{{ blog.title }}</h4>
            <div class="list-card-date">{{ blog.date | date }}</div>
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
      <popup-window :title="currentBlog.title">
        <div
          class="content-container-inner"
          v-loading="blogsLoading"
          element-loading-background="var(--blog-bgcolor)"
        >
          <div>
            <div class="content" v-html="currentBlog.content"></div>
          </div>
        </div>
      </popup-window>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import axios from '../utils/axios'
import PopupWindow from '../components/PopupWindow.vue'

export default {
  name: 'Blog',
  data: () => ({
    blogs: [],
    blogsLoading: false,
    currentBlogIndex: 0,
    listCardActiveIndex: [],
    infiniteScrollLoading: false,
    noMore: false,
    blogsNextPage: 2,
  }),
  components: {
    PopupWindow,
  },
  computed: {
    ...mapState(['errorMsg']),
    currentBlog() {
      // 未取得数据时返回临时对象
      return this.blogs.length !== 0
        ? this.blogs[this.currentBlogIndex]
        : { title: '', content: '' }
    },
    infiniteScrollDisable() {
      return this.infiniteScrollLoading || this.noMore
    },
  },
  methods: {
    async getBlogs() {
      this.blogsLoading = true
      try {
        this.blogs = await (await axios.get('/blogs?_sort=date&_order=desc&_page=1')).data
        this.initListCardActiveIndex(this.blogs.length)
      } catch (e) {
        Message.error(this.errorMsg[0])
      }
      this.blogsLoading = false
    },
    initListCardActiveIndex(length) {
      this.listCardActiveIndex.length = length
      this.listCardActiveIndex.fill(false)
      this.listCardActiveIndex[0] = true
    },
    changeActiveIndex(val) {
      this.currentBlogIndex = val
      for (let i = 0; i < this.listCardActiveIndex.length; i++) {
        this.listCardActiveIndex[i] = false
      }
      this.listCardActiveIndex[val] = true
    },
    async loadBlogs() {
      this.infiniteScrollLoading = true
      try {
        const { data } = await axios.get(
          // eslint-disable-next-line comma-dangle
          `/blogs?_sort=date&_order=desc&_page=${this.blogsNextPage}`
        )
        if (!data.length) {
          this.noMore = true
          this.infiniteScrollLoading = false
          return
        }
        this.blogs = this.blogs.concat(data)
        this.initListCardActiveIndex(this.blogs.length)
        this.blogsNextPage += 1
      } catch (e) {
        Message.error(this.errorMsg[0])
      }
      this.infiniteScrollLoading = false
    },
  },
  mounted() {
    this.getBlogs()
  },
}
</script>

<style scoped>
.blog {
  display: flex;
  padding: 0 40px;
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
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
  height: 100%;
}

.list-inner {
  padding: 0 15px;
}

.content-container-inner > div {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
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
</style>
