<template>
  <div class="not-found">
    <span>404 Not Found</span>
  </div>
</template>

<script>
export default { name: 'NotFound' }
</script>

<style scoped>
.not-found {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: var(--blog-color);
}
</style>
