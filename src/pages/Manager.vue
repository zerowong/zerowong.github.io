<template>
  <div class="manager">
    <div class="menu">
      <button
        type="text"
        v-for="(item, index) in menu"
        :key="index"
        v-text="item.name"
        @click="switchComponent(item.key)"
      ></button>
    </div>
    <div class="content">
      <component :is="component"></component>
    </div>
  </div>
</template>

<script>
import Booklist from '../components/manager/Booklist.vue'

export default {
  name: 'Backstage',
  components: { Booklist },
  data: () => ({
    menu: [{ name: '书单管理', key: 'Booklist' }],
    componentKey: 'Booklist',
  }),
  computed: {
    component() {
      return this.$options.components[this.componentKey]
    },
  },
  methods: {
    switchComponent(key) {
      this.componentKey = key
    },
  },
}
</script>

<style scoped>
.manager {
  height: 100%;
  display: flex;
  column-gap: 10px;
}

.menu {
  width: 10%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: var(--blog-bgcolor);
  padding: 20px 0;
}

.content {
  width: calc(100% - 10% - 10px);
  background-color: var(--blog-bgcolor);
  color: var(--blog-color);
  overflow: auto;
}

button {
  cursor: pointer;
}
</style>
