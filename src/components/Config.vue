<script setup>
defineProps({
  theme: {
    default: 'light',
    type: String
  }
})
</script>

<template>
  <div :class="[
    theme === 'dark' ? 'dark' : 'light'
  ]">
    <slot></slot>
  </div>
</template>

<style>
:root {
  --font-family: "Titillium Web", "PingFang SC", "Hiragino Sans GB", "Microsoft JhengHei", "Microsoft YaHei", sans-serif;
  --font-size: 18px
}

.dark {
  --font-color: white
}

.light {
  --font-color: black
}
</style>