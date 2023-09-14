<style scoped>
li {
  background-color: #eee;
  list-style-type: none;
  color: #333;
  position: relative;
}
li > a:first-child,
li > a:first-child:visited,
li > a:first-child:active {
  color: currentColor;
  cursor: pointer;
  padding: 0 2em;
  display: block;
  height: 4em;
  line-height: 4;
  white-space: nowrap;
}
li > a:first-child:hover {
  background: rgba(255,255,255,.5);
}
li.active > a:first-child {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
}
li > a:nth-child(2) {
  display: none;
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin: 0.25em;
  border-radius: 100%;
  cursor: pointer;
  line-height: 1;
  color: currentColor;
  overflow: hidden;
  padding: 0;
}
li > a:nth-child(2):before {
  font-family: material icons;
  font-weight: 400;
  font-style: normal;
  content: 'close';
  display: block;
  font-size: 1em;
  width: 1em;
  height: 1em;
  overflow: hidden;
  margin: .25em
}
li > a:nth-child(2):hover {
  display: block;
  background: rgba(0,0,0,.5);
  color: #fff;
}
li:nth-child(n+2) > a:first-child:hover ~ a {
  display: block;
}
</style>
<script setup lang="ts">
const props = defineProps<{ index?: number; path: string; active?: boolean; title: string }>()
defineEmits(['active', 'close'])
console.log(props)
</script>
<template>
  <li class="active" v-if="active">
    <a @click.prevent="$emit('active', index)">{{ title }}</a>
    <a @click.prevent="$emit('close', index)"></a>
  </li>
  <li v-else>
    <a :href="path" @click.prevent="$emit('active', index)">{{ title }}</a>
    <a @click.prevent="$emit('close', index)"></a>
  </li>
</template>
