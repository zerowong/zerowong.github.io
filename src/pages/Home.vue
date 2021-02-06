<template>
  <div>
    <div class="footer">
      <button-bar></button-bar>
      <div class="footer-info">
        <div class="footer-info-inner">
          <span
            >© 2021 All <a :href="self[0]" class="link" tabindex="-1">{{ self[1] }}</a> Rights
            Reserved.</span
          >
          <a :href="beian[0]" class="link" tabindex="-1">{{ beian[1] }}</a>
        </div>
      </div>
    </div>
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
.footer {
  /* 固定在页面底部 */
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  height: 60px;
  padding: 1px 0;
}

.footer-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  width: 100%;
  margin-top: 10px;
  background-color: var(--blog-bgcolor);
}

.footer-info-inner {
  color: var(--blog-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.link {
  color: var(--blog-color);
  text-decoration: none;
}

.link:hover {
  color: var(--primary-color);
}
</style>
