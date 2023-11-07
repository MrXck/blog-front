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

body {
  //background-color: linear-gradient(-225deg, #231557 0%, #43107a 29%, #c92c61 100%);
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
</style>
<script setup>
import Config from "@/components/Config.vue";
import {useMainStore} from "@/store";

const main = useMainStore();
</script>