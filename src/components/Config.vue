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
  --font-size: 18px;
  --card-box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
  --card-hover-box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
  --layout-max-width: 1170px;
}

.dark {
  --font-color: rgba(255,255,255,0.7);
  --background-color: #121212;
  --filter: brightness(0.7);
  --header-background-color: rgba(18, 18, 18, 0.8);
  --active-font-color: #1e80ff;
}

.dark img {
  filter: brightness(0.7);
}

.light {
  --font-color: black;
  --background-color: #fff;
  --filter: brightness(1);
  --header-background-color: rgba(255, 255, 255, 0.8);
  --active-font-color: #1e80ff;
}

</style>