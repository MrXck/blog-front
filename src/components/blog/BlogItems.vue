<script setup>
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import request from "@/utils/request";
import {GetBlogByPageURL} from "@/utils/Constant";
import BlogItem from "@/components/blog/BlogItem.vue";
import jpg from '@/assets/1.jpg'
import MyInfo from "@/components/MyInfo.vue";
import ArchivesList from "@/components/ArchivesList.vue";
import Classification from "@/components/Classification.vue";
import {getBlogByPage} from "@/api/blogApi";


const blogList = reactive([])
const pageSize = 10
const pageNum = 1
let isFinished = false
let isLoading = false
const blogContainer = ref(null)

function init() {
  if (isFinished || isLoading) return

  isLoading = true
  const data = {
    pageSize,
    pageNum
  }
  if (blogList.length > 0) {
    data.blogId = blogList[blogList.length - 1].id
  }
  getBlogByPage(data).then(res => {
    if (res.code === 0) {
      blogList.push(...res.data.page.records)
      if (res.data.page.records.length < pageSize) {
        isFinished = true
      }
    }
  }).finally(() => {
    isLoading = false
  })
}

function scrollLoad() {
  const blog = blogContainer.value
  const {height} = blog.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollTop
  const offsetTop = blog.offsetTop
  const screenHeight = document.documentElement.clientHeight

  console.log(scrollTop, screenHeight, offsetTop, height, scrollTop + screenHeight - offsetTop - height)

  if (scrollTop + screenHeight - offsetTop - height > 50) {
    init()
  }

}

onMounted(() => {
  init()
  window.addEventListener('scroll', scrollLoad)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollLoad)
})
</script>

<template>
  <div class="layout">
    <div class="post-content" ref="blogContainer">
      <BlogItem v-for="(item, index) in blogList" :data="item" :index="index"/>
    </div>
    <div class="myself">
      <MyInfo/>
      <ArchivesList/>
      <Classification/>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .post-content {
    width: 100% !important;
  }

  .myself {
    width: 100% !important;
    padding-left: 0 !important;
    margin-top: 20px;
  }
}

.layout {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 40px 15px;
  display: flex;
}

.layout .post-content {
  width: 74%;
  box-sizing: border-box;
}

.layout .myself {
  box-sizing: border-box;
  width: 26%;
  padding-left: 15px;
}
</style>