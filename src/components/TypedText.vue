<template>
  <div>
    <vue-typed-js :strings="tyepedText.line1" @onComplete="line1Done = true" :showCursor="false">
      <h2 class="typing"></h2>
    </vue-typed-js>
    <vue-typed-js :strings="tyepedText.line2" v-if="line1Done">
      <h2 class="typing"></h2>
    </vue-typed-js>
  </div>
</template>

<script>
export default {
  name: 'TypedText',
  data: () => ({
    tyepedText: {
      line1: ['Welcome'],
      line2: ["ApassEr's Blog"],
    },
    line1Done: false,
  }),
}
</script>

<style>
.typing,
.typed-element .typed-cursor {
  color: white;
  font-size: 100px;
}

h2.typing {
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
}
</style>
