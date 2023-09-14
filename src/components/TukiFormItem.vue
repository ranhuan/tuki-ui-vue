<template>
    <div :class="{'center': center}">
        <label>{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
defineProps(['label', 'center'])
</script>
<style scoped>
div {
    padding: .5em;
    display: flex;
}
div.center {
    justify-content: center;
}
</style>