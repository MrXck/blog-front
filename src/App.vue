<template>
  <Config :theme="main.theme">
    <router-view/>
  </Config>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

.layout {
  z-index: 100;
  position: relative;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background: #49b1f5;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}

.medium-zoom-image {
  z-index: 999;
}
.medium-zoom-overlay {
  z-index: 998;
}
</style>
<script setup>
import Config from "@/components/Config.vue";
import {useMainStore} from "@/store";

const main = useMainStore();
</script>