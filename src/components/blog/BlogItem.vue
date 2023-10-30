<script setup>
import jpg from '@/assets/1.jpg'
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
</script>

<template>
  <div :class="[
    'blog',
    index !== 0 ? 'margin-top' : ''
  ]">
    <div class="blog-img">
      <img :src="jpg" alt="">
    </div>
    <div class="blog-info">
      <div class="blog-title">{{data.title}}</div>
      <div class="blog-detail">
        <div class="blog-time">创建于: {{data.create_time}}</div>
        <div class="blog-time">更新于: {{data.create_time}}</div>
        <div class="blog-time">标签: xxx</div>
      </div>
      <div class="blog-content">
        {{data.content}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog {
  display: flex;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  overflow: hidden;
  height: 235px;
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
}

.blog-img img {
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  transition: 0.5s all;
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