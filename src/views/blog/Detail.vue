<script setup>
import jpg from '@/assets/1.jpg'
import {useRoute} from "vue-router"
import {onMounted, reactive, ref} from "vue"
import {Viewer} from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import breaks from '@bytemd/plugin-breaks'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/tokyo-night-dark.min.css'
import {getProcessor} from "bytemd"
import MyInfo from "@/components/MyInfo.vue";
import Directory from "@/components/Directory.vue";
import {getBlogById} from "@/api/blogApi";


const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
]
const title = ref(null)
const content = ref(null)
const image = ref(null)
const tagList = reactive([])
const h = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
const route = useRoute()
const id = route.query.id
const viewer = ref(null)


function init() {
  getBlogById(id).then(res => {
    if (res.code === 0) {
      title.value = res.data.blog.title
      content.value = res.data.blog.content
      image.value = res.data.blog.image
      setTimeout(() => {
        setTitleId()
        getCataLogData()
      }, 1000)
    }
  })
}


const getCataLogData = () => {
  getProcessor({
    plugins: [
      {
        rehype: p =>
            p.use(() => tree => {
              tagList.length = 0
              if (tree && tree.children.length) {
                tree.children.filter(v => {
                  v.indentation = h.indexOf(v.tagName?.toUpperCase())
                  return v.type === 'element' && v.indentation !== -1 && v.children.length > 0
                }).forEach((node, index) => {
                  const offsetTop = document.getElementById(`id-${index}`).offsetTop
                  tagList.push({
                    id: `#id-${index}`,
                    text: node.children[0].value,
                    indentation: node.indentation,
                    offsetTop,
                    top: 29 * index
                  })
                })
              }
            }),
      },
    ],
  }).processSync(content.value)
}


function setTitleId() {
  const children = viewer.value.markdownBody.children
  let index = 0
  tagList.length = 0
  for (let i = 0; i < children.length; i++) {
    if (h.indexOf(children[i].tagName) !== -1) {
      children[i].id = `id-${index}`
      index += 1
    }
  }
}

onMounted(() => {
  init()
  if (route.hash === '') {
    window.scroll({
      top: 0,
      behavior: 'instant'
    })
  } else {
    setTimeout(() => {
      window.scroll({
        top: document.querySelector(route.hash).offsetTop,
        behavior: 'smooth'
      })
    }, 10)
  }

})

</script>

<template>
  <div class="container">
    <div class="background-image">
      <img :src="image === null || image === '' ? jpg : image" alt="" :style="`view-transition-name: pic-${id};`">
    </div>
    <div class="content">
      <div class="layout">
        <div class="blog">
          <h2 class="blog-title">{{ title }}</h2>
          <Viewer ref="viewer" :locale="zhHans" :value="content" :plugins="plugins"/>
        </div>
        <div class="myself">
          <MyInfo/>
          <Directory :tag-list="tagList"/>
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

.blog-title {
  text-align: center;
  color: var(--font-color);
}

:deep(.markdown-body) {
  color: var(--font-color);
}

:deep(.markdown-body h1) {
  padding-bottom: 12px;
  margin-top: 35px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ececec;
}

:deep(.markdown-body h2) {
  padding-bottom: 12px;
  margin-top: 35px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ececec;
}

:deep(.markdown-body h3) {
  padding-bottom: 12px;
  margin-top: 35px;
  margin-bottom: 10px;
}

:deep(.markdown-body h4) {
  padding-bottom: 12px;
  margin-top: 35px;
  margin-bottom: 10px;
}

:deep(.markdown-body h5) {
  padding-bottom: 12px;
  margin-top: 35px;
  margin-bottom: 10px;
}

:deep(.markdown-body h6) {
  padding-bottom: 12px;
  margin-top: 35px;
  margin-bottom: 10px;
}
</style>