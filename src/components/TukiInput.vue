<template>
  <label>
    <span :icon="icon">{{ label }}</span>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </label>
</template>
<script setup lang="ts">
const props = defineProps(['label', 'icon', 'modelValue'])
defineEmits(['update:modelValue'])
console.log(props.icon)
</script>
<style scoped>
label {
  margin: 0.5em;
  display: inline-flex;
  align-items: center;
  position: relative;
  background: #fff;
  border: 1px rgba(0, 0, 0, 0.25) solid;
  border-radius: 0.25em;
}
label > span {
  padding: 0 1.25em;
  /* width: 2em; */
  /* height: 1.5em; */
  /* overflow: hidden; */
  /* flex: 0 0 1.5em; */
  color: rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0,0,0,.1) 1px 0 0;

}
label > span[icon]::before {
  font-family: material icons;
  font-weight: 400;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
  content: attr(icon);
  font-size: 1.5em;
  display: block;
}
label > input {
  flex: auto;
  height: calc(3.5em - 2px);
  min-width: 2em;
  margin: 0;
  padding: 0 1em;
  background: 0 0;
  border: none;
  border-radius: 0.25em;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
