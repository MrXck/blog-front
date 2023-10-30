<script setup>
import Header from "@/components/Header.vue";
import BlogItems from "@/components/blog/BlogItems.vue";
</script>

<template>
  <div>
    <Header/>
    <div class="background">
      <div class="text">
        <div class="title">Xck's Blog</div>
        <div class="content">我有一壶酒，足以慰风尘。尽倾江海里，赠饮天下人。</div>
      </div>
    </div>
    <BlogItems/>
  </div>
</template>

<style scoped>
.background {
  background: url("@/assets/1.jpg") no-repeat bottom / cover;
  width: calc(100vw - 17px);
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s height;
  margin-top: -60px;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-bottom: 40px;
}

.title {
  margin-bottom: 20px;
}

.content {
  /* 相对定位 */
  position: relative;
  color: var(--font-color);
  font-family: var(--font-family);
  font-size: 30px;
  /* 字间距 */
  letter-spacing: 3px;
  /* 单个字宽度 */
  width: 65px;
  /* 不换行 */
  white-space: nowrap;
  /* 溢出隐藏 */
  overflow: hidden;
  /* 自定义属性(变量),通过var函数进行调用,这里用来记录字数(6个字,根据你的实际字数而定) */
  --count: 23;
  /* 执行动画: 动画名 时长 分步过渡(这里分6步) 停留在最后一帧 */
  /* 时长要根据字数而定,字数多的话要适当延长 */
  animation: typing 4s steps(var(--count)) forwards;
  /* 加个倒影可能会比较好看 */
  -webkit-box-reflect: below 1px linear-gradient(transparent 30%, rgba(0, 0, 0, 0.2));
}

/* 光标 */
.content::after {
  content: "";
  width: 2px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--font-color);
  /* 执行光标动画: 动画名 时长 线性的 无限次播放 */
  animation: blink 1s linear infinite;
}

/* 定义动画 */
/* 光标闪烁 */
@keyframes blink {
  0%, 49% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
}

/* 打字动画 */
@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    /* 计算字全部显示完的宽度,65px表示单个字宽度 */
    width: calc(var(--count) * 35px);
  }
}
</style>