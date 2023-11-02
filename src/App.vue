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
</style>
<script setup>
import Config from "@/components/Config.vue";
import {useMainStore} from "@/store";

const main = useMainStore();
</script>