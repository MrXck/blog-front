<script setup>
import ArchivesItem from "@/components/archives/ArchivesItem.vue";
import {onMounted, ref} from "vue";
import {getArchives} from "@/api/blogArchivesApi";
import {useRoute} from "vue-router";


const route = useRoute()

const archives = ref({})
const length = ref(0)
const keys = ref([])


function init() {

  const data = {}

  if (route.query.time !== '' && route.query.time !== null && route.query.time !== undefined) {
    data.time = route.query.time
  }

  getArchives(data).then(res => {
    if (res.code === 0) {
      length.value = res.data.blogs.length
      res.data.blogs.forEach(item => {
        const year = item.createTime.split('-')[0]
        item.createTime = item.createTime.split('T')[0]
        item.updateTime = item.updateTime.split('T')[0]
        if (!archives.value[year]) {
          archives.value[year] = [item]
        } else {
          archives.value[year].push(item)
        }
      })
      keys.value = Object.keys(archives.value).sort((a, b) => b - a)
    }
  })
}

onMounted(() => {
  init()


})
</script>

<template>
  <div class="archives-title">文章总览 - {{ length }}</div>
  <div class="archives-sort">
    <div v-for="item in keys">
      <div class="archives-sort-item year">{{ item }}</div>
      <ArchivesItem v-for="data in archives[item]" :data="data"/>
    </div>
  </div>
</template>

<style scoped>
.archives-title {
  font-family: var(--font-family);
  font-size: 30px;
  position: relative;
  padding-left: 20px;
  padding-bottom: 20px;
  color: var(--font-color);
}

.archives-title::before {
  position: absolute;
  top: calc((100% - 36px) / 2);
  left: -9px;
  z-index: 1;
  width: 10px;
  height: 10px;
  content: "";
  line-height: 10px;
  border-width: 5px;
  border-style: solid;
  border-color: rgb(73, 177, 245);
  border-image: initial;
  border-radius: 10px;
  background: var(--background-color);
  transition: all 0.2s ease-in-out 0s;
}

.archives-title::after {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  width: 2px;
  height: 1.5em;
  content: "";
  background: rgb(170, 218, 250);
}

.archives-sort {
  padding-left: 20px;
  border-left: 2px solid rgb(170, 218, 250);
}

.archives-sort-item {
  height: 80px;
  display: flex;
  align-items: center;
  font-family: var(--font-family);
  font-size: 18px;
  margin-left: 10px;
  margin-bottom: 20px;
  color: var(--font-color);
  position: relative;
}

.year {
  height: 40px !important;
  font-size: 20px;
}

.archives-sort-item::before {
  position: absolute;
  left: calc(-36px);
  width: 6px;
  height: 6px;
  content: "";
  border-width: 3px;
  border-style: solid;
  border-color: rgb(73, 177, 245);
  border-image: initial;
  border-radius: 6px;
  background: var(--background-color);
  transition: all 0.2s ease-in-out 0s;
}

</style>