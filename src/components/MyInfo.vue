<script setup>
import jpg from "@/assets/1.jpg";
import {onMounted, ref} from "vue";
import {getBlogCount} from "@/api/blogApi";
import {getBlogTypeCount} from "@/api/blogTypeApi";
import {getAdminInfo} from "@/api/adminApi";
import {to} from "@/utils/routerUtils";

const info = ref({
  username: 'Xck',
  image: '',
  blogNum: 0,
  blogTypeNum: 0
})

function blogCount() {
  getBlogCount().then(res => {
    if (res.code === 0) {
      info.value.blogNum = res.data
    }
  })
}

function blogTypeCount() {
  getBlogTypeCount().then(res => {
    if (res.code === 0) {
      info.value.blogTypeNum = res.data
    }
  })
}

function getInfo() {
  getAdminInfo().then(res => {
    if (res.code === 0) {
      info.value.image = res.data.admin.image
      info.value.username = res.data.admin.username
    }
  })
}

function init() {
  getInfo()
  blogCount()
  blogTypeCount()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="myself-info">
    <div class="avatar">
      <img :src="info.image !== undefined && info.image !== null && info.image !== '' ? info.image : jpg" alt="">
    </div>
    <div class="myself-name">{{info.username}}</div>
    <div class="info">
      <div class="num" @click="to({name: 'home'})">
        <div class="num-title">文章</div>
        <div class="number">{{info.blogNum}}</div>
      </div>
<!--      <div class="num">-->
<!--        <div class="num-title">标签</div>-->
<!--        <div class="number">22</div>-->
<!--      </div>-->
      <div class="num" @click="to({name: 'categories'})">
        <div class="num-title">分类</div>
        <div class="number">{{info.blogTypeNum}}</div>
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
  margin-bottom: 20px;
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
  flex: 1;
  cursor: pointer;
  transition: .3s;
}

.num:hover {
  color: var(--active-font-color);
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