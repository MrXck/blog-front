<template>
  <Config :theme="theme">
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
import {ref} from "vue";

const theme = ref('light')

</script>