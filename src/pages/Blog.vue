<template>
  <div class="blog">
    <div class="title-list">
      <popup-window title="blogs">
        <div
          class="title-list-inner"
          v-loading="blogsLoading"
          element-loading-background="var(--blog-bgcolor)"
        >
          <blog-item
            v-for="(blog, index) in blogs"
            :key="index"
            :blog="blog"
            :activeIndex.sync="activeIndex"
          ></blog-item>
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
import BlogItem from '../components/blogItem.vue'

export default {
  name: 'Blog',
  data: () => ({
    activeIndex: 1,
  }),
  components: {
    PopupWindow,
    BlogItem,
  },
  computed: {
    ...mapState(['blogs']),
    ...mapGetters(['blogsLoading']),
    currentBlog() {
      // 未取得数据时返回空对象
      return this.blogs.length !== 0 ? this.blogs[this.activeIndex - 1] : {}
    },
  },
  methods: {
    ...mapActions(['getData']),
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

.title-list {
  width: 20%;
  margin-right: 15px;
}

.content-container {
  width: calc(100% - 20% - 15px);
}

.title-list-inner,
.content-container-inner {
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
  height: 100%;
}

.title-list-inner {
  padding: 0 15px;
}

.content-container-inner > div {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
}
</style>
