<script setup>
import {to} from '@/utils/routerUtils'
import {useMainStore} from "@/store";
import {onMounted, ref} from "vue";

const main = useMainStore()
const searchModal = ref(false)
const keyword = ref('')

function switchTheme(theme) {
  if (theme === 'light') {
    document.documentElement.style.backgroundImage = 'linear-gradient(-225deg, #237777 0%, #43107a 29%, #c92c61 100%)'
  } else {
    document.documentElement.style.backgroundImage = 'linear-gradient(black, black, black, black, black)'
  }
  main.theme = theme
}

function showSearchDialog() {
  searchModal.value = true
  document.documentElement.style.overflow = 'hidden'
}

function closeSearchModal() {
  searchModal.value = false
  document.documentElement.style.overflow = ''
}

function search() {
  if (keyword.value === '') return
  to({name: 'home', query: {'keyword': keyword.value}})
  closeSearchModal()
}

onMounted(() => {
  if (main.theme === 'light') {
    document.documentElement.style.backgroundImage = 'linear-gradient(-225deg, #237777 0%, #43107a 29%, #c92c61 100%)'
  } else {
    document.documentElement.style.backgroundImage = 'linear-gradient(black, black, black, black, black)'
  }
})
</script>

<template>
<div class="nav">
  <div class="left" @click="to({name: 'home'})">
    Xck
  </div>
  <div class="right">
    <div class="nav-item" @click="showSearchDialog">
      <span>搜索</span>
      <div class="line"></div>
    </div>
    <div class="nav-item" @click="to({name: 'archives'})">
      <span>归档</span>
      <div class="line"></div>
    </div>
<!--    <div class="nav-item">-->
<!--      <span>标签</span>-->
<!--      <div class="line"></div>-->
<!--    </div>-->
    <div class="nav-item" @click="to({name: 'categories'})">
      <span>分类</span>
      <div class="line"></div>
    </div>
    <div class="nav-item">
      <span v-show="main.theme === 'dark'" @click="switchTheme('light')">亮</span>
      <span v-show="main.theme === 'light'" @click="switchTheme('dark')">暗</span>
    </div>
  </div>
  <div class="modal-background" @click="closeSearchModal" v-if="searchModal"></div>
  <div class="search-dialog" v-if="searchModal">
    <div class="search-dialog-header">
      <div class="search-dialog-title">搜索</div>
      <div class="search-dialog-close" @click="closeSearchModal">x</div>
    </div>
    <div class="search-dialog-body">
      <div class="search-dialog-input">
        <input type="text" v-model="keyword" placeholder="请输入标题" @keydown.enter="search">
      </div>
    </div>
    <div class="search-dialog-footer">
      <div class="search-dialog-footer-button" @click="search">搜索</div>
    </div>
  </div>
</div>
</template>

<style scoped>
@media (max-width: 768px) {
  .search-dialog {
    width: calc(100vw)!important;
    top: 0!important;
    right: 0!important;
    left: 0!important;
    margin-left: 0!important;
  }
}

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
  width: calc(100vw);
  box-sizing: border-box;
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

.search-dialog {
  position: fixed;
  top: 10%;
  left: 50%;
  z-index: 1001;
  margin-left: -300px;
  padding: 20px;
  width: 600px;
  border-radius: 8px;
  background: var(--background-color);
  animation: 0.5s ease 0s 1 normal none running showDialog;
  transition: .3s;
  box-sizing: border-box;
}

.search-dialog-header {
  display: flex;
  justify-content: space-between;
}

.search-dialog-close {
  color: #1e80ff;
  cursor: pointer;
}

.search-dialog-title {
  font-size: 22px;
  color: #1e80ff;
}

.search-dialog-body {
  margin-top: 10px;
}

.search-dialog-input input {
  box-sizing: border-box;
  padding: 5px 14px;
  width: 100%;
  outline: 0;
  border: 2px solid #49b1f5;
  border-radius: 40px;
  background: var(--background-color);
  color: var(--font-color);
  -webkit-appearance: none;
}

.search-dialog-footer {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.search-dialog-footer-button {
  padding: 8px 10px;
  border-radius: 8px;
  background-color: #49b1f5;
  color: #fff;
  cursor: pointer;
}

.modal-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0,0,0,.6);
}

@keyframes showDialog {
  0% {
    opacity: 0;
    -webkit-transform: scale(.7);
    -moz-transform: scale(.7);
    -o-transform: scale(.7);
    -ms-transform: scale(.7);
    transform: scale(.7);
  }
  100% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}
</style>