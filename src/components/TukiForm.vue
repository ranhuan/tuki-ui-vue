<template>
  <form :class="{'inline': inline}"><slot></slot></form>
</template>
<script setup lang="ts">
defineProps(['inline'])
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin-left: -.5em;
  margin-right: -.5em;
  /* flex-wrap: wrap; */
  /* flex-direction: column; */
}
form.inline {
  flex-direction: row;
}
</style>
