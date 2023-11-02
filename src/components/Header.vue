<script setup>
import {to} from '@/utils/routerUtils'
import {useMainStore} from "@/store";

const main = useMainStore()
</script>

<template>
<div class="nav">
  <div class="left" @click="to({name: 'home'})">
    Xck
  </div>
  <div class="right">
    <div class="nav-item">
      <span>搜索</span>
      <div class="line"></div>
    </div>
    <div class="nav-item" @click="to({name: 'archives'})">
      <span>归档</span>
      <div class="line"></div>
    </div>
    <div class="nav-item">
      <span>标签</span>
      <div class="line"></div>
    </div>
    <div class="nav-item">
      <span>分类</span>
      <div class="line"></div>
    </div>
    <div class="nav-item">
      <span v-show="main.theme === 'dark'" @click="main.theme = 'light'">亮</span>
      <span v-show="main.theme === 'light'" @click="main.theme = 'dark'">暗</span>
    </div>
  </div>
</div>
</template>

<style scoped>
.nav {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  box-shadow: rgba(133, 133, 133, 0.6) 0 5px 6px -5px;
  background-color: var(--header-background-color);
}

.left {
  font-size: var(--font-size);
  color: var(--font-color);
  font-weight: bold;
  font-family: var(--font-family);
  cursor: pointer;
}

.right {
  color: var(--font-color);
  display: flex;
  font-size: 14px;
}

.nav-item {
  color: var(--font-color);
  margin: 0 10px;
  cursor: pointer;
  position: relative;
}

.line {
  width: 0;
  position: absolute;
}

.nav-item:hover .line {
  height: 2px;
  background-color: aquamarine;
  margin-top: 2px;
  transition: .2s width;
  width: 100%;
}
</style>