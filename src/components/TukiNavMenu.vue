<style scoped>
menu {
  line-height: 0;
}

menu :deep(> li) {
  display: inline-block;
  position: relative;
}

menu :deep(> li > a) {
  height: 2em;
  width: 2em;
}

menu :deep(> li:hover > a) {
  width: auto;
  margin-left: 1em;
}
</style>
<template>
  <header>
    <nav>
      <menu>
        <slot></slot>
      </menu>
    </nav>
  </header>
</template>
