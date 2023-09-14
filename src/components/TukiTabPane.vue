<template>
  <li :class="{current: active}">
    <component :is="active || init ? component : loading" :data="data" :key="childKey"></component>
    <slot :data="data"></slot>
  </li>
</template>
<script lang="ts">
import { Md5 } from 'ts-md5'
import { h, ref, onMounted, onBeforeMount, onBeforeUnmount, render } from 'vue'
import TukiLoading from './TukiLoading.vue'

export default {
  name: 'TukiTabPane',
  props: ['active', 'data', 'component', 'childKey'],
  setup() {
    const loading = TukiLoading
    let init = false
    return {
      loading,
      init
    }
  },
  beforeMount() {
    console.log(`the camgirl component is now mounted.`)
  },
  mounted() {
    this.init = true
  },
  beforeUnmount() {
    console.log(`the camgirl component is now unmounted.`)
  }
  // render() {
  //   return h(
  //     'li',
  //     this.active ? { class: 'current' } : null,
  //     this.$slots.default().map((node) => {
  //       if (node.props == null) {
  //         node.props = { data: this.data}
  //       } else {
  //         node.props.data = this.data
  //       }
  //       return node
  //     })
  //   )
  // }
}
// const props = defineProps(['active', 'data', 'component', 'childKey'])
// console.log(JSON.stringify(props.component))
// console.log(Md5.hashStr(JSON.stringify(props.data) + '_' + JSON.stringify(props.component)))
// const loading = TukiLoading
// let init = false
// onMounted(() => {
//   init = true
// })
// onBeforeMount(() => {
//   console.log(`the camgirl component is now mounted.`)
// })
// onBeforeUnmount(() => {
//   console.log(`the camgirl component is now unmounted.`)
// })
</script>
<style scoped>
li {
  border-left: 1px rgba(0, 0, 0, 0.25) solid;
  border-right: 1px rgba(0, 0, 0, 0.25) solid;
  border-bottom: 1px rgba(0, 0, 0, 0.25) solid;
  background: #fff;
  padding: 1em;
  flex: 100%;
  display: none;
}
li.current {
  display: flex;
  align-items: baseline;
}
</style>
