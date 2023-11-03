<script setup>
import CategoriesItem from "@/components/categories/CategoriesItem.vue";
import {getAllBlogType} from "@/api/blogTypeApi";
import {onMounted, reactive} from "vue";


const blogTypeList = reactive([])

function init() {
  getAllBlogType().then(res => {
    if (res.code === 0) {
      blogTypeList.length = 0
      blogTypeList.push(...res.data.blogTypes)
    }
  })
}

onMounted(() => {
  init()
})

</script>

<template>
<div class="categories-list">
  <CategoriesItem v-for="item in blogTypeList" :data="item"/>
</div>
</template>

<style scoped>
.categories-list {
  margin-top: 14px;
  padding-left: 20px;
}
</style>