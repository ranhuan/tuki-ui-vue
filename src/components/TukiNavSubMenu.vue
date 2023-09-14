<style scoped>
menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 99;
  min-width: 100%;
  padding: 0.5em 0;
  background: #333;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.25em 0.5em;
  display: flex;
  flex-direction: column;
  visibility: hidden;
}
menu :deep(> li > a) {
  color: currentColor;
  padding: 0 2em;
  white-space: nowrap;
  line-height: 2.5;
  margin: auto;
  font-weight: normal;
}
menu :deep(> li:hover) {
  background: rgba(255, 255, 255, 0.1);
}
</style>
<template>
  <menu><slot></slot></menu>
</template>
