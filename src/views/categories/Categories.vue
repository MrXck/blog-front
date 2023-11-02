<script setup>

import jpg from "@/assets/1.jpg";
import MyInfo from "@/components/MyInfo.vue";
import ArchivesList from "@/components/ArchivesList.vue";
import CategoriesList from "@/components/categories/CategoriesList.vue";
</script>

<template>
  <div class="container">
    <div class="background-image">
      <img :src="jpg" alt="">
    </div>
    <div class="content">
      <div class="layout">
        <div class="blog">
          <CategoriesList/>
        </div>
        <div class="myself">
          <MyInfo/>
          <ArchivesList/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {

  .layout {
    flex-direction: column;
  }

  .myself {
    width: 100%!important;
    padding-left: 0!important;
    margin-top: 20px;
  }

  .blog {
    width: 100%!important;
  }
}

.container {
  position: relative;
  width: calc(100vw - 17px);
  min-height: 100vh;
  z-index: 888;
}

.background-image {
  position: absolute;
}

.background-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content {
  z-index: 999;
  position: relative;
}

.layout {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 40px 15px;
  display: flex;
  margin-top: 60px;
}

.layout .blog {
  width: 74%;
  box-sizing: border-box;
  background-color: var(--background-color);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
  padding: 50px 40px;
  transition: .3s all;
}

.blog:hover {
  box-shadow: var(--card-hover-box-shadow);
}

.layout .myself {
  box-sizing: border-box;
  width: 26%;
  padding-left: 15px;
}
</style>