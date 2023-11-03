<script setup>
import jpg from "@/assets/1.jpg";
import {toWithTransition} from "@/utils/routerUtils";

const {data} = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="archives-sort-item">
    <div class="archives-sort-item-img" @click="toWithTransition({name: 'blog-detail', query: {id: data.id}})">
      <img :src="data.image === null || data.image === '' ? jpg : data.image" alt="" :style="`view-transition-name: pic-${data.id};`">
    </div>
    <div class="archives-sort-item-detail">
      <div class="blog-time">
        <div class="time">{{ data.createTime }}</div>
        <div class="time">{{ data.updateTime }}</div>
      </div>
      <div class="blog-title" @click="toWithTransition({name: 'blog-detail', query: {id: data.id}})">{{ data.title }}</div>
    </div>
  </div>
</template>

<style scoped>
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

.archives-sort-item-img {
  height: 80px;
  width: 80px;
  overflow: hidden;
}

.archives-sort-item-img img {
  height: 100%;
  cursor: pointer;
  transition: .3s all;
  margin-left: calc(-45%);
}

.archives-sort-item-img img::view-transition-old {
  object-fit: cover;
  animation: none;
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.archives-sort-item-img img::view-transition-new {
  object-fit: cover;
  animation: none;
  mix-blend-mode: normal;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

.archives-sort-item-img img:hover {
  transform: scale(1.1);
}

.archives-sort-item-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  flex: 1;
}

.archives-sort-item-detail .blog-time {
  display: flex;
  cursor: default;
}

.archives-sort-item-detail .blog-time .time {
  margin-right: 10px;
  font-size: 14px;
  color: rgb(133, 133, 133);
}

.archives-sort-item-detail .blog-title {
  font-size: 16px;
  transition: .3s all;
  cursor: pointer;
}

.archives-sort-item-detail .blog-title:hover {
  font-size: 16px;
  color: var(--active-font-color);
  transform: translateX(10px);
}
</style>