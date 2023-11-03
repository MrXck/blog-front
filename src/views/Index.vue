<script setup>
import Header from "@/components/Header.vue";
import {onBeforeUnmount, onMounted} from "vue";


let cvs, height, width, ctx, fontSize, columnWidth, columnCount, nextChar
let time = null

function draw() {
  ctx.fillStyle = 'rgba(240, 240, 240, 0.1)'
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < columnCount; i++) {
    ctx.fillStyle = getRandomColor()
    const char = getRandomChar()
    ctx.font = `${fontSize}px "Roboto Mono"`
    const x = i * columnWidth
    const y = (nextChar[i] + 1) * fontSize
    ctx.fillText(char, x, y)

    if (y > height && Math.random() > 0.99) {
      nextChar[i] = 0
    } else {
      nextChar[i]++
    }

  }
}

function getRandomColor() {
  const fontColors = [
    '#33B5E5',
    '#0099CC',
    '#AA66CC',
    '#9933CC',
    '#99CC00',
    '#669900',
    '#FFBB33',
    '#FF8800',
    '#FF4444',
    '#CC0000'
  ]

  return fontColors[Math.floor(Math.random() * fontColors.length)]
}

function getRandomChar() {
  const str = 'console.log("hello world")'
  return str[Math.floor(Math.random() * str.length)]
}

function resize(e) {
  init()
}

function init() {
  clearInterval(time)
  cvs = document.getElementById('bg')
  height = window.innerHeight * devicePixelRatio
  width = window.innerWidth * devicePixelRatio
  cvs.width = width
  cvs.height = height

  ctx = cvs.getContext('2d')
  fontSize = 20 * devicePixelRatio

  columnWidth = fontSize
  columnCount = Math.floor(width / columnWidth)

  nextChar = new Array(columnCount).fill(0)
  time = setInterval(() => {
    draw()
  }, 30)
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div>
    <Header/>
    <RouterView/>
  </div>
  <canvas id="bg"></canvas>
</template>

<style scoped>
#bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: var(--background-color);
}
</style>