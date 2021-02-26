<template>
  <div class="home-root">
    <div class="footer">
      <span
        >© 2021 All <a class="link" :href="self[0]" tabindex="-1">{{ self[1] }}</a> Rights
        Reserved.</span
      >
      <a class="link" :href="beian[0]" tabindex="-1">{{ beian[1] }}</a>
    </div>
    <button-bar></button-bar>
  </div>
</template>

<script>
import ButtonBar from '../components/ButtonBar.vue'

export default {
  name: 'Home',
  components: { ButtonBar },
  data: () => ({
    beian: ['http://beian.miit.gov.cn', '湘ICP备2020022697号-1'],
    self: ['https://apasser.xyz', 'apasser.xyz'],
  }),
}
</script>

<style scoped>
.home-root {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.footer {
  width: 100%;
  height: 80px;
  color: var(--blog-color);
  background-color: var(--blog-bgcolor);
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  row-gap: 5px;
}

.link {
  color: inherit;
  text-decoration: none;
}

.link:hover {
  color: var(--primary-color);
}

@media (max-width: 1024px) {
  .footer {
    font-size: small;
  }
}
</style>
