<template>
  <div :class="['blog-item', { 'blog-item-active': isActive }]" @click="getActiveIndex(blog.id)">
    <h3>{{ blog.title }}</h3>
    <div>{{ blog.date | date }}</div>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    blog: {
      type: Object,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.activeIndex === this.blog.id
    },
  },
  methods: {
    getActiveIndex(val) {
      this.$emit('update:active-index', val)
    },
  },
}
</script>

<style scoped>
.blog-item {
  margin: 15px 0;
}

.blog-item > h3 {
  margin: 0;
}

.blog-item > div {
  opacity: 0.5;
}

.blog-item:hover {
  cursor: pointer;
  background-color: var(--primary-color);
  opacity: 0.7;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.7, 1);
}

.blog-item-active {
  background-color: var(--primary-color);
}
</style>
