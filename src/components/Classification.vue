<script setup>
import {onMounted, reactive} from "vue";
import {getAllBlogType} from "@/api/blogTypeApi";
import {to} from "@/utils/routerUtils";

const list = reactive([])

function init() {
  getAllBlogType().then(res => {
    if (res.code === 0) {
      list.length = 0
      list.push(...res.data.blogTypes)
    }
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="classification-list">
    <div class="classification-header">
      <div class="classification-header-title">分类</div>
      <div class="classification-header-right">&gt;</div>
    </div>
    <div class="classification-body">
      <div class="classification-body-item" @click="to({name: 'home', query: {id: item.id}})" v-for="(item, index) in list">
        <div class="classification-body-item-time">{{item.name}}</div>
        <div class="classification-body-item-num">{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.classification-list {
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

.classification-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}

.classification-header-title {
  color: var(--font-color);
}

.classification-header-right {
  color: var(--font-color);
  cursor: pointer;
  transition: .5s all;
}

.classification-header-right:hover {
  transform: translateX(4px);
}

.classification-body-item {
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

.classification-body-item:hover {
  background-color: rgba(73,177,245,0.7);
}

.classification-body-item-time {
  transition: .5s all;
}

.classification-body-item-num {
  transition: .5s all;
}

.classification-body-item:hover .classification-body-item-time {
  transform: translateX(4px);
}

.classification-body-item:hover .classification-body-item-num {
  transform: translateX(-4px);
}
</style>