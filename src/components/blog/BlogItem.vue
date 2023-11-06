<script setup>
import jpg from '@/assets/1.jpg'
import {toWithTransition} from "@/utils/routerUtils";
import {computed, onMounted, ref} from "vue";

const {data, index} = defineProps({
  data: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

let windowWidth = ref(window.innerWidth > 768)


onMounted(() => {
  window.addEventListener('resize', (e) => {
    windowWidth.value = window.innerWidth > 768
  })
})

</script>

<template>
  <div :class="[
    'blog',
    index !== 0 ? 'margin-top' : ''
  ]" @click="toWithTransition({name: 'blog-detail', query: {id: data.id}, position: { x: 0, y: 0 }})">
    <div class="blog-img" v-show="!windowWidth || index % 2 === 0">
      <img :src="data.image === null || data.image === '' ? jpg : data.image" alt=""
           :style="`view-transition-name: pic-${data.id};`">
    </div>
    <div class="blog-info">
      <div class="blog-title">{{ data.title }}</div>
      <div class="blog-detail">
        <div class="blog-time">创建于: {{ data.createTime }}</div>
        <div class="blog-time">更新于: {{ data.updateTime }}</div>
        <div class="blog-time">分类: {{ data.type.name }}</div>
      </div>
      <div class="blog-content">
        {{ data.content }}
      </div>
    </div>
    <div class="blog-img" :id="`blog-img-${data.id}`" v-show="windowWidth && index % 2 - 1 === 0">
      <img :src="data.image === null || data.image === '' ? jpg : data.image" alt=""
           :style="`view-transition-name: pic-${data.id};`">
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {

  .blog {
    flex-direction: column;
    height: 420px !important;
    padding-bottom: 20px;
  }

  .blog-img {
    width: 100% !important;
    height: auto !important;
  }

  .blog-img img {
    width: 100% !important;
  }

  .blog-info {
    width: 100% !important;
    margin-top: 10px;
  }

}

.blog {
  display: flex;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  height: 235px;
  background-color: var(--background-color);
  color: var(--font-color);
  transition: .3s all;
  overflow: hidden;
}

.blog:hover {
  box-shadow: var(--card-hover-box-shadow);
}

.blog:hover img {
  transform: scale(1.1);
}

.blog-img {
  width: 42%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.blog-img img {
  height: 100%;
//width: 100%; transition: 0.5s all; filter: var(--filter);
  object-fit: cover;
}

.blog-img img::view-transition-old {
  object-fit: cover;
  animation: none;
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.blog-img img::view-transition-new {
  object-fit: cover;
  animation: none;
  mix-blend-mode: normal;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

.margin-top {
  margin-top: 20px;
}

.blog-info {
  width: 58%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  font-family: var(--font-family);
}

.blog-title {
  font-size: 22px;
  cursor: pointer;
}

.blog-detail {
  display: flex;
  font-size: 14px;
  margin: 6px 0;
}

.blog-content {
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 14px;
  color: var(--font-color);
}

.blog-time {
  margin-right: 10px;
  color: rgb(134, 134, 134);
}
</style>