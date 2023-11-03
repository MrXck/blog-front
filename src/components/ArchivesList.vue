<script setup>
import {onMounted, reactive} from "vue";
import {getAllArchives} from "@/api/blogArchivesApi";

const list = reactive([])

function init() {
  getAllArchives({}).then(res => {
    if (res.code === 0) {
      list.length = 0
      list.push(...res.data)
    }
  })
}

onMounted(() => {
  init()
})
</script>

<template>
<div class="archives-list">
  <div class="archives-header">
    <div class="archives-header-title">归档</div>
    <div class="archives-header-right">&gt;</div>
  </div>
  <div class="archives-body">
    <div class="archives-body-item" v-for="(item, index) in list">
      <div class="archives-body-item-time">{{item.date}}</div>
      <div class="archives-body-item-num">{{item.count}}</div>
    </div>
  </div>
</div>
</template>

<style scoped>
.archives-list {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--background-color);
  box-shadow: var(--card-box-shadow);
  font-family: var(--font-family);
  color: var(--font-color);
  transition: .3s all;
  margin-bottom: 20px;
}

.archives-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}

.archives-header-title {
  color: var(--font-color);
}

.archives-header-right {
  color: var(--font-color);
  cursor: pointer;
  transition: .5s all;
}

.archives-header-right:hover {
  transform: translateX(4px);
}

.archives-body-item {
  padding: 3px 10px;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family);
  font-size: 14px;
  box-sizing: border-box;
  height: 34px;
  cursor: pointer;
  align-items: center;
  transition: .5s all;
}

.archives-body-item:hover {
  background-color: rgba(73,177,245,0.7);
}

.archives-body-item-time {
  transition: .5s all;
}

.archives-body-item-num {
  transition: .5s all;
}

.archives-body-item:hover .archives-body-item-time {
  transform: translateX(4px);
}

.archives-body-item:hover .archives-body-item-num {
  transform: translateX(-4px);
}
</style>