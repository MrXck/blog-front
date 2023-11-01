<script setup>

import jpg from "@/assets/1.jpg";
</script>

<template>
  <div class="myself-info">
    <div class="avatar">
      <img :src="jpg" alt="">
    </div>
    <div class="myself-name">Xck</div>
    <div class="info">
      <div class="num">
        <div class="num-title">文章</div>
        <div class="number">22</div>
      </div>
      <div class="num">
        <div class="num-title">标签</div>
        <div class="number">22</div>
      </div>
      <div class="num">
        <div class="num-title">分类</div>
        <div class="number">22</div>
      </div>
    </div>
    <div class="elsewhere">
      <div class="elsewhere-title">其他网站</div>
      <div class="elsewhere-link">
        <a href="https://github.com/MrXck" target="_blank">Github</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myself-info {
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
}

.myself-info:hover {
  box-shadow: var(--card-hover-box-shadow);
}

.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
}

.myself-name {
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
}

.info {
  margin-top: 14px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-around;
}

.num {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1
}

.number {
  margin-top: 4px;
}

.elsewhere {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
}
</style>