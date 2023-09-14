<template>
  <slot :row="row"></slot>
</template>
<script lang="ts">
export default {
  name: 'TukiTableColumn',
  props: {
    row: { type: Object, default: () => {}},
    expand: { type: Boolean, default: false },
    label: { type: String, default: ''}
  }
}
</script>
