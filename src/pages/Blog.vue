<template>
  <div class="blog">
    <div class="list">
      <popup-window title="blogs">
        <div
          class="list-inner"
          v-loading="blogsLoading"
          element-loading-background="var(--blog-bgcolor)"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import PopupWindow from '../views/PopupWindow.vue'

export default {
  name: 'Blog',
  data: () => ({
    activeIndex: 0,
    listCardActiveIndex: [],
  }),
  components: {
    PopupWindow,
  },
  computed: {
    ...mapState(['blogs']),
    ...mapGetters(['blogsLoading']),
    currentBlog() {
      // 未取得数据时返回临时对象
      return this.blogs.length !== 0 ? this.blogs[this.activeIndex] : { title: '', content: '' }
    },
  },
  methods: {
    ...mapActions(['getData']),
    changeActiveIndex(val) {
      this.activeIndex = val
      for (let i = 0; i < this.listCardActiveIndex.length; i++) {
        this.listCardActiveIndex[i] = false
      }
      this.listCardActiveIndex[val] = true
    },
  },
  watch: {
    'blogs.length': {
      handler(val) {
        this.listCardActiveIndex.length = val
        this.listCardActiveIndex.fill(false)
        this.listCardActiveIndex[0] = true
      },
      immediate: true,
    },
  },
  created() {
    this.getData('blogs')
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
</style>
