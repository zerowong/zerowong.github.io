<template>
  <div class="blog">
    <div class="blog-list">
      <popup-window title="blogs">
        <div class="blog-list-inner">
          <!-- TODO -->
        </div>
      </popup-window>
    </div>
    <div class="blog-content">
      <popup-window :title="blogTitle">
        <div class="blog-content-inner">
          <!-- TODO -->
        </div>
      </popup-window>
    </div>
  </div>
</template>

<script>
import PopupWindow from '../views/PopupWindow.vue'

export default {
  name: 'Blog',
  data: () => ({
    blogTitle: 'title',
  }),
  components: {
    PopupWindow,
  },
}
</script>

<style scoped>
.blog {
  display: flex;
  padding: 0 40px;
  height: 100%;
}

.blog-list {
  width: 25%;
  margin-right: 15px;
}

.blog-content {
  width: calc(100% - 25% - 15px);
}

.blog-list-inner,
.blog-content-inner {
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
  height: 100%;
}
</style>
