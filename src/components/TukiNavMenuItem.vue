<style scoped>
li:hover {
  background: #333;
}

li:hover :deep(a::before) {
  margin-top: -1em;
}

li:hover :deep(menu) {
  visibility: visible;
}

a {
  display: block;
  line-height: 2em;
  /* width: 2em; */
  margin: 1em 1em;
  font-weight: 700;
  color: currentColor;
  overflow: hidden;
  cursor: pointer;
}

a::before {
  display: block;
  font-family: material icons;
  font-size: 2em;
  width: 1em;
  height: 1em;
  margin: auto auto;
}

a[icon]::before {
  content: attr(icon);
}

a.logo::before {
  content: '';
  background: url(@/assets/logo.svg) no-repeat center/auto 100%;
}
</style>
<script lang="ts">
import { useRouter } from 'vue-router'
import { useNavStore } from '@/stores/nav'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: { type: String, required: true },
    title: { type: String, required: true },
    icon: String,
    img: String
  },
  setup() {
    const router = useRouter()
    const navStore = useNavStore()

    return {
      router,
      navStore
    }
  },
  methods: {
    onClick(path: string, title: string) {
      this.navStore.addTab(path, title)
      this.router.push(path)
    }
  }
})
</script>
<template>
  <li v-if="img != undefined">
    <a :class="img">{{ title }}</a>
    <slot></slot>
  </li>
  <li v-else-if="to == undefined">
    <a :icon="icon">{{ title }}</a>
    <slot></slot>
  </li>
  <li v-else>
    <a :icon="icon" :href="to" @click.prevent="onClick(to, title)">{{ title }}</a>
    <slot></slot>
  </li>
</template>
