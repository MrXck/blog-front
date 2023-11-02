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


const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
]
const resp = {
  "code": 0, "data": {
    "blog": {
      "id": 197,
      "title": "前端小技巧",
      "content": "## js\r\n\r\n### 使用requestAnimationFrame代替计时器做动画效果\r\n\r\n```js\r\nfunction raf() {\r\n  requestAnimationFrame(function () {\r\n    raf()\r\n  })\r\n}\r\n```\r\n\r\n### 一行代码给数字加上分隔符\r\n\r\n```js\r\nlet str = &#39;100000000&#39;\r\n\r\n// \\B 表示非单词边界 意思就是不是 第一个字符和不是最后一个字符\r\n// (?=\\B(\\d{3})+) 表示 紧跟着三个数字的非单词边界位置\r\nstr.replace(/(?=\\B(\\d{3})+$)/g, &#39;,&#39;)\r\n```\r\n\r\n### 取消事件的默认行为\r\n\r\n```js\r\nfunction wheelHandler(e) {\r\n  e.preventDefault()\r\n}\r\n\r\nwindows.addEventListener(&#39;wheel&#39;, wheelHandler, {passive: false})\r\n```\r\n\r\n### 触底加载的一种方案\r\n\r\n```js\r\n// 假设有一个 id 为 loading 的 dom 标签\r\nvar loading = document.querySelector(&#39;#loading&#39;)\r\n\r\n// IntersectionObserver 有两个参数 第一个参数为第二个参数触发时调用的函数(包括进入和离开) 第二个参数为观察 被观察的 dom 标签与哪个标签重叠 不传第二个参数则为整个浏览器可视窗口\r\nvar ob = new IntersectionObserver(function(entries){\r\n  // entries 被观察的标签数组\r\n  // 可以通过 entries 中元素的 isIntersecting 来判断是否是进入 isIntersecting为true是进入\r\n}, {\r\n  root: &#39;与哪个标签重叠为 null 或者不传时就是浏览器可视窗口&#39;,\r\n  thresholds: &#39;被观察的dom标签与第二个参数重叠的 范围 一般指被观察的 dom 标签出现在第二个标签的百分比(包括进入和离开) 传值为 0-1&#39;\r\n})\r\n\r\n// 指定被观察的 dom 标签 可以多次调用 observe 去观察 dom 标签\r\nob.observe(loading)\r\n```\r\n\r\n### 页面是否被隐藏\r\n\r\n```js\r\ndocument.addEventListener(&#39;visibilitychange&#39;, function(){\r\n  if (document.visibilityState === &#39;hidden&#39;) {\r\n    \r\n  } else {\r\n    \r\n  }\r\n})\r\n```\r\n\r\n### 强制事件只触发一次\r\n\r\n```js\r\ndocument.addEventListener(&#39;visibilitychange&#39;, function(){\r\n  if (document.visibilityState === &#39;hidden&#39;) {\r\n    \r\n  } else {\r\n    \r\n  }\r\n}, {once: true})\r\n```\r\n\r\n### 正则的前瞻\r\n\r\n```js\r\n// 在不移动匹配字符的情况下，验证字符串是否包含字母\r\nconst regex = new RegExp(/^(?=.*[a-z])$/)\r\n\r\n// 使用场景 检验密码强度  包含小写字母 大写字母 数字 和 指定特殊字符\r\n// 下面这个正则就是检验密码强度 是否包含小写字母 大写字母 数字 和 指定特殊字符 以及 密码只能出现 a-zA-Z\\d$@,_. 且密码长度必须大于 6 \r\nconst reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@,_.])[a-zA-Z\\d$@,_.]{6,}$/)\r\n```\r\n\r\n### 跨标签页通信(在另外一个标签页中修改数据 当前标签页数据需要同时变更)\r\n\r\n```js\r\nwindow.addEventListener(&#39;storage&#39;, e =&gt; {\r\n  console.log(e)\r\n})\r\n```\r\n\r\n### 解决使用slice截取字符串时出现的乱码情况\r\n\r\n```js\r\n// 在遇到某些生僻字 或 emoji表情时 使用 slice 会出现乱码情况 这是因为有些生僻字和emoji表情使用的是 32位空间  一般字符使用的都是 16位空间 这时候使用slice就会导致只截取了某个字符的一半\r\nconst str = &#39;dsagfdg&#39;\r\nString.prototype.sliceByPoint = function (start, end) {\r\n    let result = &#39;&#39;\r\n    let pIndex = 0\r\n    let cIndex = 0\r\n    while (1) {\r\n        if (pIndex &gt; end || cIndex &gt;= this.length) {\r\n            break\r\n        }\r\n        const point = this.codePointAt(cIndex)\r\n        if (pIndex &gt; start) {\r\n            result += String.fromCodePoint(point)\r\n        }\r\n        pIndex++\r\n        cIndex += point &gt; 0xffff ? 2 : 1\r\n    }\r\n    return result\r\n}\r\n```\r\n\r\n### 标签页间通信(酷狗音乐的多次点击播放只会打开一次播放页且不刷新页面)\r\n\r\n```js\r\n// 第一个页面创建 BroadcastChannel 广播频道\r\nconst channel = new BroadcastChannel(&#39;my-channel&#39;)\r\n\r\n// 判断是否有打开页面\r\nconst num = localStorage.getItem(&#39;my-channel&#39;)\r\nif (!isNaN(num) &amp;&amp; num &gt; 0) {\r\n    // 将消息发送到其他加入了这个频道的同源页面\r\n    channel.postMessage(&#39;hello&#39;)\r\n} else {\r\n    window.open(&#39;./子页面url&#39;, &#39;_blank&#39;)\r\n}\r\n\r\n\r\n// 第二个页面创建 BroadcastChannel 广播频道\r\nconst channel1 = new BroadcastChannel(&#39;my-channel&#39;)\r\n// 向 localStorage 中设置页面数为 1\r\nlocalStorage.setItem(&#39;my-channel&#39;, 1)\r\n\r\n// 监听消息\r\nchannel1.onmessage = (e) =&gt; {\r\n    console.log(e.data)\r\n}\r\n\r\n// 在关闭页面时将 localStorage 中的页面数设置为 0\r\nlocalStorage.setItem(&#39;my-channel&#39;, 0)\r\n```\r\n\r\n### 并发任务链式调用\r\n\r\n```js\r\nfunction generatePromise(count) {\r\n    const list = []\r\n    for (let i = 0; i &lt; count; i++) {\r\n        list.push(() =&gt;\r\n            new Promise((resolve, reject) =&gt; {\r\n                setTimeout(() =&gt; {\r\n                    console.log(i, new Date())\r\n                    resolve(i)\r\n                }, 1000)\r\n            })\r\n        )\r\n    }\r\n    return list\r\n}\r\n\r\n// 并发任务 链式调用\r\nfunction parallelTask(tasks, parallelCount = 2) {\r\n    return new Promise((resolve) =&gt; {\r\n        if (tasks.length === 0) {\r\n            resolve()\r\n            return\r\n        }\r\n\r\n        let nextIndex = 0\r\n        let finishCount = 0\r\n\r\n        function _run() {\r\n            const task = tasks[nextIndex]\r\n            nextIndex++\r\n            task().then(() =&gt; {\r\n                finishCount++\r\n                if (nextIndex &lt; tasks.length) {\r\n                    _run()\r\n                } else if (finishCount === tasks.length) {\r\n                    resolve()\r\n                }\r\n            })\r\n        }\r\n\r\n        for (let i = 0; i &lt; parallelCount &amp;&amp; i &lt; tasks.length; i++) {\r\n            _run()\r\n        }\r\n    })\r\n}\r\n\r\nparallelTask(generatePromise(10)).then(res =&gt; {\r\n    console.log(&#39;全部完成&#39;)\r\n})\r\n```\r\n\r\n### 线程池\r\n\r\n```js\r\n// https://juejin.cn/post/7281257305177112631\r\nconst emitNameType = &#39;finish&#39; | &#39;error&#39;;\r\nconst PoolRequestType = {\r\n    // eventbus\r\n    eventBus: {\r\n        finish,\r\n        error\r\n    },\r\n    // 最大重试次数\r\n    MaxRetryCount: number,\r\n    // 最大并发数\r\n    MaxConcurrentCount: number,\r\n    // 异步数组\r\n    PromiseArr,\r\n    // 参数列表数组\r\n    ParamArr,\r\n    // 用户不用传这个，写在这里是方便用户获取这个数组\r\n    FailTask\r\n}\r\n\r\nclass pool {\r\n    /**\r\n     * @des 并发池 | 最大并发量 | 请求参数之类的\r\n     */\r\n    config;\r\n    paused;\r\n\r\n    constructor(param) {\r\n        let BaseConfig = {\r\n            // 最大尝试次数\r\n            MaxRetryCount: 1,\r\n            // 分组数量\r\n            SplitNumber: 20,\r\n            FailTask: []\r\n        }\r\n        this.config = Object.assign({}, BaseConfig, param)\r\n        this.execute(this.config.PromiseArr, this.config.ParamArr, this.config.MaxConcurrentCount)\r\n        this.paused = false\r\n    }\r\n\r\n    /**\r\n     * @des 实现任务队列的暂停恢复\r\n     */\r\n    async pauseIfNeeded() {\r\n        while (this.paused) { // 当暂停状态为 true 时，等待恢复\r\n            console.log(&quot;暂停中&quot;)\r\n            await new Promise(resolve =&gt; setTimeout(resolve, 1000));\r\n        }\r\n    }\r\n\r\n    pauseStatus(pause) {\r\n        this.paused = pause\r\n    }\r\n\r\n    /**\r\n     * @des 执行\r\n     * @param PromiseArr promise数组\r\n     * @param ParamArr 参数数组\r\n     * @param Retry 重试次数\r\n     */\r\n    async execute(PromiseArr, ParamArr, Retry) {\r\n        if (PromiseArr.length !== ParamArr.length) {\r\n            throw new Error(&quot;function和param列表传参数量不相等,请进行校验&quot;)\r\n        }\r\n        if (!Retry &amp;&amp; PromiseArr.length) {\r\n            throw new Error(&quot;重试次数达到上限.停止重试&quot;)\r\n        }\r\n\r\n        let that = this\r\n        //完成的数量\r\n        let finish = 0\r\n        // 并发池\r\n        let pool = []\r\n        // 失败列表\r\n        let FailPromiselList = []\r\n        let FailParamlList = []\r\n        for (let i = 0; i &lt; PromiseArr.length; i++) {\r\n\r\n            // 实现暂停效果\r\n            await this.pauseIfNeeded()\r\n            let task = PromiseArr[i](ParamArr[i])\r\n            task.then((data) =&gt; {\r\n                // 重点:这里可以emit 东西出去\r\n                let index = pool.findIndex(t =&gt; t === task)\r\n                //请求结束后将该Promise任务从并发池中移除\r\n                pool.splice(index)\r\n            }).catch(() =&gt; {\r\n                FailParamlList.push(ParamArr[i])\r\n                FailPromiselList.push(PromiseArr[i])\r\n            }).finally(() =&gt; {\r\n                finish++; // console.log(&quot;进度：&quot; + i / PromiseArr.length)\r\n                //所有请求都请求完成\r\n                if (finish === PromiseArr.length) {\r\n                    if (FailParamlList.length) {\r\n                        console.log(&quot;重试剩余次数:&quot;, Retry)\r\n                        that.execute(FailPromiselList, FailParamlList, Retry - 1)\r\n                    }\r\n                    that.emit(&quot;finish&quot;, &quot;并发池完成&quot;)\r\n                }\r\n            })\r\n            pool.push(task)\r\n\r\n            if (pool.length === this.config.MaxConcurrentCount) {\r\n                // 用Promise.race 实现并发\r\n                try {\r\n                    await Promise.race(pool)\r\n                } catch {\r\n                    console.log(&quot;报错&quot;)\r\n                }\r\n            }\r\n        }\r\n\r\n    }\r\n\r\n    /**\r\n     * @des 触发某一个事件\r\n     * @param name\r\n     * @param data 给function的值\r\n     */\r\n    emit = (name, data) =&gt; {\r\n        if (this.config.eventBus) {\r\n            if (this.config.eventBus[name]) {\r\n                this.config.eventBus[name].forEach((element) =&gt; {\r\n                    element(data);\r\n                });\r\n            } else {\r\n                throw new Error(&#39;没有这个事件&#39;);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\r\nlet sleep = (e) =&gt; {\r\n    return new Promise((resolve, reject) =&gt; {\r\n        console.log(&quot;执行:&quot;, e)\r\n        setTimeout(() =&gt; {\r\n            if (Math.random() &gt; 0.5) {\r\n                reject(e)\r\n            }\r\n            resolve(e)\r\n        }, e);\r\n    })\r\n}\r\n\r\nlet temp = {\r\n    // eventbus | 可以对获取的数据进行处理\r\n    /**\r\n     * @des 简单列举几个场景\r\n     * @feature [&quot;进度条&quot;,&quot;错误处理&quot;,&quot;&quot;]\r\n     */\r\n    eventBus: {\r\n        finish: [(e) =&gt; {\r\n            console.log(&quot;触发finish方法:&quot;, e)\r\n        }]\r\n    },\r\n    // 最大重试次数\r\n    MaxRetryCount: 1,\r\n    // 最大并发数\r\n    MaxConcurrentCount: 3,\r\n    // 异步数组\r\n    PromiseArr: [sleep, sleep, sleep, sleep],\r\n    // 参数列表数组\r\n    ParamArr: [0, 1000, 2000, 0],\r\n}\r\nlet res = new pool(temp)\r\nsetTimeout(() =&gt; {\r\n    res.pauseStatus(true)\r\n}, 1000);\r\n\r\nexport {}\r\n```\r\n\r\n### 对象深拷贝的一种方案\r\n\r\n```js\r\nfunction deepClone(obj) {\r\n  return new Promise((resolve =&gt; {\r\n    const {port1, port2} = new MessageChannel()\r\n    port1.postMessage(obj)\r\n    port2.onmessage = msg =&gt; {\r\n      resolve(msg.data)\r\n    }\r\n  }))\r\n}\r\n\r\ndeepClone({&#39;1&#39;: 1}).then(res =&gt; {\r\n  console.log(res)\r\n})\r\n```\r\n\r\n\r\n\r\n## css\r\n\r\n### 为元素像素点设置阴影\r\n\r\n```css\r\nfilter: drop-shadow(0 0 10px #fff);\r\n```\r\n\r\n### 文字方向调整\r\n\r\n```css\r\n/*           垂直布局 从右到左 */\r\nwriting-mode: vertical-rl;\r\n\r\n/* 设置文字朝向 */\r\ntext-orientataion: upright;\r\n\r\n/* 设置文字组合 */\r\ntext-combine-upright: all;\r\n```\r\n\r\n### 页面/元素平滑滚动\r\n\r\n```css\r\nscroll-behavior: smooth;\r\n```\r\n\r\n### animation的setps属性\r\n\r\n```css\r\n/* 将 run 关键帧 平均分为 12 个步骤 */\r\nanimation: run 1s steps(12) infinite;\r\n\r\n@keyframes run{\r\n  0% {\r\n    background-position-x: 0;\r\n  }\r\n  100% {\r\n    background-position-x: -2400px;\r\n  }\r\n}\r\n```\r\n\r\n### animation动画的暂停与恢复\r\n\r\n```css\r\nanimation: 关键帧 20s linear infinite;\r\n\r\n/* 停止动画 */\r\nanimation-play-state: paused;\r\n\r\n/* 恢复动画 */\r\nanimation-play-state: running;\r\n```\r\n\r\n### 粘性布局的问题\r\n\r\n```css\r\n/* 是根据设置了 overflow 的父/祖先元素 的位置进行的 当父/祖先元素都没有设置 overflow 时则根据页面来  但是活动范围依然只有父元素的区域 */\r\nposition: sticky;\r\ntop: 0;\r\n```\r\n\r\n### 文本溢出\r\n\r\n```css\r\n/* 单行文本溢出 */\r\n/* 设置文本不换行 */\r\nwhite-space: nowrap;\r\n/* 溢出隐藏*/\r\noverflow: hidden;\r\n/* 将溢出部分换成... */\r\ntext-overflow: ellipsis;\r\n\r\n\r\n/* 多行文本溢出 */\r\n/* 多行区域一共显示的行数 */\r\n-webkit-line-clamp: 3;\r\n/* 溢出隐藏 */\r\noverflow: hidden;\r\n/* 将溢出部分换成... */\r\ntext-overflow: ellipsis;\r\ndisplay: -webkit-box;\r\n/* 设置文本排列方向 这里是从上到下 */\r\n-webkit-box-orient: vertical;\r\n```\r\n\r\n### 宽高比\r\n\r\n```\r\naspect-ratio: 16/9;\r\n```\r\n\r\n### 卡片翻转效果\r\n\r\n```html\r\n&lt;!DOCTYPE html&gt;\r\n&lt;html lang=&quot;en&quot;&gt;\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;title&gt;Title&lt;/title&gt;\r\n    &lt;style&gt;\r\n        .card {\r\n            /* 加上3D效果 */\r\n            perspective: 100px;\r\n        }\r\n        .face {\r\n            /* 设置动画时间为 0.5秒 */\r\n            transition: .5s;\r\n            /* 设置背面为不显示 */\r\n            backface-visibility: hidden;\r\n        }\r\n        .card:hover .face {\r\n            /* 沿着Y轴逆时针翻转-180度 */\r\n            transform: rotateY(-180deg);\r\n        }\r\n        .back {\r\n            /* 设置背面为不显示 */\r\n            backface-visibility: hidden;\r\n            /* 沿着Y轴逆时针翻转180度 */\r\n            transform: rotateY(180deg);\r\n            /* 设置动画时间为 0.5秒 */\r\n            transition: .5s;\r\n        }\r\n        .card:hover .back {\r\n            transform: rotateY(0);\r\n        }\r\n    &lt;/style&gt;\r\n&lt;/head&gt;\r\n&lt;body&gt;\r\n&lt;div class=&quot;card&quot;&gt;\r\n    &lt;div class=&quot;face&quot;&gt;\r\n        &lt;p&gt;123123&lt;/p&gt;\r\n    &lt;/div&gt;\r\n    &lt;div class=&quot;back&quot;&gt;\r\n        &lt;span&gt;xxxxx&lt;/span&gt;\r\n    &lt;/div&gt;\r\n&lt;/div&gt;\r\n&lt;/body&gt;\r\n&lt;/html&gt;\r\n```\r\n\r\n### 元素的宽度适应内容\r\n\r\n```css\r\nwidth: fit-content;\r\n```\r\n\r\n## js + css\r\n\r\n### 实现元素高度自动的过渡\r\n\r\n```html\r\n&lt;!DOCTYPE html&gt;\r\n&lt;html lang=&quot;en&quot;&gt;\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;title&gt;Title&lt;/title&gt;\r\n    &lt;style&gt;\r\n        #div {\r\n            transition: all .3s;\r\n            overflow: hidden;\r\n            height: 0;\r\n        }\r\n    &lt;/style&gt;\r\n&lt;/head&gt;\r\n&lt;body&gt;\r\n&lt;button id=&quot;btn&quot;&gt;鼠标移动&lt;/button&gt;\r\n&lt;div id=&quot;div&quot;&gt;\r\n    &lt;div&gt;1&lt;/div&gt;\r\n    &lt;div&gt;2&lt;/div&gt;\r\n    &lt;div&gt;3&lt;/div&gt;\r\n    &lt;div&gt;4&lt;/div&gt;\r\n&lt;/div&gt;\r\n&lt;script&gt;\r\n    const div = document.querySelector(&#39;#div&#39;)\r\n\r\n    document.querySelector(&#39;#btn&#39;).addEventListener(&#39;mouseenter&#39;, e =&gt; {\r\n        // 先设置为自动 方便获取高度\r\n        div.style.height = &#39;auto&#39;\r\n        const rect = div.getBoundingClientRect();\r\n        div.style.height = 0\r\n\r\n        // 在这里强制让浏览器重新渲染\r\n        div.offsetHeight\r\n        div.style.height = rect.height + &#39;px&#39;\r\n    })\r\n    \r\n    document.querySelector(&#39;#btn&#39;).addEventListener(&#39;mouseleave&#39;, e =&gt; {\r\n        div.style.height = 0\r\n    })\r\n&lt;/script&gt;\r\n&lt;/body&gt;\r\n&lt;/html&gt;\r\n```\r\n\r\n### 元素鼠标进入方向\r\n\r\n```html\r\n&lt;!DOCTYPE html&gt;\r\n&lt;html lang=&quot;en&quot;&gt;\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;title&gt;Title&lt;/title&gt;\r\n    &lt;style&gt;\r\n        #container {\r\n            display: flex;\r\n            width: 200px;\r\n            height: 160px;\r\n            justify-content: center;\r\n            align-items: center;\r\n            overflow: hidden;\r\n        }\r\n\r\n        #content {\r\n            width: 200px;\r\n            height: 160px;\r\n            position: relative;\r\n            transition: .3s;\r\n        }\r\n\r\n        .item {\r\n            width: 200px;\r\n            height: 160px;\r\n            background-color: black;\r\n        }\r\n\r\n        #top {\r\n            position: absolute;\r\n            top: -100%;\r\n            background-color: #4bff67;\r\n        }\r\n\r\n        #left {\r\n            position: absolute;\r\n            left: -100%;\r\n            top: 0;\r\n            background-color: #ad31ff;\r\n        }\r\n\r\n        #right {\r\n            position: absolute;\r\n            left: 100%;\r\n            top: 0;\r\n            background-color: #ff31a6;\r\n        }\r\n\r\n        #bottom {\r\n            position: absolute;\r\n            top: 100%;\r\n            background-color: #4387ff;\r\n        }\r\n\r\n        .top {\r\n            transform: translateY(100%);\r\n        }\r\n\r\n        .left {\r\n            transform: translateX(100%);\r\n        }\r\n\r\n        .right {\r\n            transform: translateX(-100%);\r\n        }\r\n\r\n        .bottom {\r\n            transform: translateY(-100%);\r\n        }\r\n    &lt;/style&gt;\r\n&lt;/head&gt;\r\n&lt;body&gt;\r\n&lt;div id=&quot;container&quot;&gt;\r\n    &lt;div id=&quot;content&quot;&gt;\r\n        &lt;div class=&quot;item&quot; id=&quot;center&quot;&gt;&lt;/div&gt;\r\n        &lt;div class=&quot;item&quot; id=&quot;top&quot;&gt;&lt;/div&gt;\r\n        &lt;div class=&quot;item&quot; id=&quot;left&quot;&gt;&lt;/div&gt;\r\n        &lt;div class=&quot;item&quot; id=&quot;bottom&quot;&gt;&lt;/div&gt;\r\n        &lt;div class=&quot;item&quot; id=&quot;right&quot;&gt;&lt;/div&gt;\r\n    &lt;/div&gt;\r\n&lt;/div&gt;\r\n&lt;script&gt;\r\n    const div = document.querySelector(&#39;#content&#39;)\r\n    const rect = div.getBoundingClientRect()\r\n    const theta = Math.atan2(rect.height, rect.width)\r\n    console.log(theta)\r\n    div.addEventListener(&#39;mouseenter&#39;, (e) =&gt; {\r\n        const x = e.offsetX - rect.width / 2\r\n        const y = rect.height / 2 - e.offsetY\r\n        const d = Math.atan2(y, x)\r\n        if (d &lt; theta &amp;&amp; d &gt;= -theta) {\r\n            div.classList.add(&#39;right&#39;)\r\n        } else if (d &gt;= theta &amp;&amp; d &lt; Math.PI - theta) {\r\n            div.classList.add(&#39;top&#39;)\r\n        } else if (d &gt;= Math.PI - theta || d &lt; -(Math.PI - theta)) {\r\n            div.classList.add(&#39;left&#39;)\r\n        } else {\r\n            div.classList.add(&#39;bottom&#39;)\r\n        }\r\n    })\r\n\r\n    div.addEventListener(&#39;mouseleave&#39;, e =&gt; {\r\n        div.classList.remove(&#39;right&#39;, &#39;top&#39;, &#39;left&#39;, &#39;bottom&#39;)\r\n    })\r\n&lt;/script&gt;\r\n&lt;/body&gt;\r\n&lt;/html&gt;\r\n```\r\n\r\n### 瀑布流布局\r\n\r\n```html\r\n&lt;!DOCTYPE html&gt;\r\n&lt;html lang=&quot;en&quot;&gt;\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;title&gt;Title&lt;/title&gt;\r\n    &lt;style&gt;\r\n        .container {\r\n            /*width: 320px;*/\r\n            width: 210px;\r\n            display: grid;\r\n            grid-auto-rows: 5px;\r\n            /*grid-template-columns: repeat(auto-fill, calc(33% - 5px));*/\r\n            grid-template-columns: repeat(auto-fill, calc(50% - 5px));\r\n            align-items: start;\r\n            justify-content: space-between;\r\n        }\r\n\r\n        .item {\r\n            width: 100px;\r\n            display: flex;\r\n            height: 60px;\r\n            background-color: #76cfff;\r\n        }\r\n\r\n        * {\r\n            padding: 0;\r\n            margin: 0;\r\n        }\r\n    &lt;/style&gt;\r\n&lt;/head&gt;\r\n&lt;body&gt;\r\n&lt;div class=&quot;container&quot; id=&quot;container&quot;&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot; style=&quot;height: 800px&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot; style=&quot;height: 100px&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot; style=&quot;height: 80px&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n    &lt;div class=&quot;item&quot;&gt;231321&lt;/div&gt;\r\n&lt;/div&gt;\r\n&lt;script&gt;\r\n    document.addEventListener(&#39;DOMContentLoaded&#39;, e =&gt; {\r\n        const els = document.querySelectorAll(&#39;.item&#39;)\r\n        for (let i = 0; i &lt; els.length; i++) {\r\n            const el = els[i]\r\n            console.log(el, el.clientHeight)\r\n            const rows = Math.ceil(el.clientHeight / 5) + 2\r\n            el.style.gridRowEnd = `span ${rows}`\r\n        }\r\n    })\r\n&lt;/script&gt;\r\n&lt;/body&gt;\r\n&lt;/html&gt;\r\n```\r\n\r\n### 弯曲字体\r\n\r\n```html\r\n&lt;!DOCTYPE html&gt;\r\n&lt;html lang=&quot;en&quot;&gt;\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;title&gt;Title&lt;/title&gt;\r\n    &lt;style&gt;\r\n        #container {\r\n            width: 100vw;\r\n            height: 100vh;\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n        }\r\n    &lt;/style&gt;\r\n&lt;/head&gt;\r\n&lt;body&gt;\r\n&lt;div id=&quot;container&quot;&gt;101010101010101010101010&lt;/div&gt;\r\n&lt;script&gt;\r\n    const container = document.querySelector(&#39;#container&#39;)\r\n    const strings = container.textContent.split(&#39;&#39;)\r\n\r\n    container.innerHTML = strings.map(i =&gt; `&lt;span&gt;${i}&lt;/span&gt;`).join(&#39;&#39;)\r\n\r\n\r\n    function getCurvePoints(curveFunc, range, number, xLength) {\r\n        if (number &lt; 1) {\r\n            return []\r\n        }\r\n        if (number === 1) {\r\n            return [0]\r\n        }\r\n\r\n        const piece = (range[1] - range[0]) / (number - 1)\r\n        const result = []\r\n        const scale = xLength / (range[1] - range[0])\r\n        for (let i = 0; i &lt; number; i++) {\r\n            result.push(-curveFunc(i * piece + range[0] * scale) * 50)\r\n        }\r\n        return result\r\n    }\r\n\r\n    function createCurve(func, range) {\r\n        const points = getCurvePoints(func, range, container.children.length, container.clientWidth)\r\n        for (let i = 0; i &lt; points.length; i++) {\r\n            container.children[i].style.transform = `translateY(${points[i]}px)`\r\n        }\r\n    }\r\n\r\n    createCurve(x =&gt; Math.sin(x), [0, 2 * Math.PI])\r\n\r\n&lt;/script&gt;\r\n&lt;/body&gt;\r\n&lt;/html&gt;\r\n```\r\n\r\n## Vue\r\n\r\n### 命令式组件\r\n\r\n```js\r\nimport { createApp } from &#39;vue&#39;\r\nimport Button from &#39;./Button.vue&#39;\r\nimport { styled } from &#39;@styils/vue&#39;\r\n\r\nconst DivModal = styled(&#39;div&#39;, {\r\n    position: &#39;fixed&#39;,\r\n    width: &#39;100%&#39;,\r\n    height: &#39;100%&#39;,\r\n    left: &#39;0&#39;,\r\n    top: &#39;0&#39;,\r\n    zIndex: &#39;99&#39;,\r\n    background: &#39;#00000050&#39;,\r\n    display: &#39;flex&#39;,\r\n    justifyContent: &#39;center&#39;,\r\n    alignItems: &#39;center&#39;\r\n})\r\n\r\nconst DivBox = styled(&#39;div&#39;, {\r\n    background: &#39;#fff&#39;,\r\n    color: &#39;#333&#39;,\r\n    padding: &#39;1em 2em&#39;,\r\n    borderRadius: &#39;10px&#39;,\r\n    boxShadow: &#39;0 0 3px #00000080&#39;,\r\n    display: &#39;flex&#39;,\r\n    alignItems: &#39;center&#39;,\r\n    flexDirection: &#39;column&#39;,\r\n    minWidth: &#39;30%&#39;\r\n})\r\n\r\nconst DivText = styled(&#39;div&#39;, {\r\n    marginBottom: &#39;1em&#39;\r\n})\r\n\r\nconst MessageBox = {\r\n    props: {\r\n        msg: {\r\n            type: String,\r\n            required: true\r\n        }\r\n    },\r\n    render(ctx) {\r\n        const {$emit, $props} = ctx\r\n        return &lt;DivModal&gt;\r\n            &lt;DivBox&gt;\r\n                &lt;DivText&gt;{$props.msg}&lt;/DivText&gt;\r\n                &lt;Button click={$emit(&#39;click&#39;)}&gt;&lt;/Button&gt;\r\n            &lt;/DivBox&gt;\r\n        &lt;/DivModal&gt;\r\n    }\r\n}\r\n\r\nfunction showMsg(msg, clickHandler) {\r\n    const div = document.createElement(&#39;div&#39;)\r\n    document.body.appendChild(div)\r\n    const app = createApp(MessageBox, {\r\n        msg,\r\n        onClick() {\r\n            clickHandler &amp;&amp; clickHandler(() =&gt; {\r\n                app.unmount(div)\r\n                div.remove()\r\n            })\r\n        }\r\n    })\r\n}\r\n```\r\n\r\n### 虚拟列表\r\n\r\n```js\r\n&lt;script setup&gt;\r\nimport {computed, nextTick, onMounted, reactive, ref, watch} from &quot;vue&quot;;\r\n\r\nconst dataList = computed(() =&gt; dataSource.slice(position.startIndex, endIndex.value))\r\nconst dataSource = reactive([])\r\nconst isLoading = ref(false)\r\n\r\nlet index = 1\r\nconst content = ref()\r\nconst list = ref()\r\nconst endIndex = computed(() =&gt; Math.min(dataSource.length, position.startIndex + position.maxCount))\r\nconst position = reactive({\r\n  viewHeight: 0,\r\n  listHeight: 0,\r\n  startIndex: 0,\r\n  maxCount: 6,\r\n  preLen: 0,\r\n})\r\nconst positions = reactive([])\r\nconst offsetDis = computed(() =&gt; (position.startIndex &gt; 0 ? positions[position.startIndex - 1].bottom : 0));\r\n\r\nconst scrollStyle = computed(\r\n    () =&gt; {\r\n      return ({\r\n        height: `${position.listHeight - offsetDis.value}px`,\r\n        transform: `translate3d(0, ${offsetDis.value}px, 0)`,\r\n      })\r\n    }\r\n)\r\n\r\nfunction init() {\r\n  position.viewHeight = content.value ? content.value.offsetHeight : 0;\r\n  getMoreData()\r\n}\r\n\r\nfunction getMoreData() {\r\n  if (isLoading.value) return\r\n  isLoading.value = true\r\n  for (let i = 0; i &lt; 20; i++) {\r\n    dataSource.push({\r\n      id: index++\r\n    })\r\n  }\r\n  isLoading.value = false\r\n}\r\n\r\nfunction initPosition() {\r\n  const pos = []\r\n  const preTop = position.preLen === 0 ? 0 : positions[positions.length - 1].top\r\n  const preBottom = position.preLen === 0 ? 0 : positions[positions.length - 1].bottom\r\n\r\n  let index = 0\r\n  for (let i = position.preLen; i &lt; dataSource.length; i++) {\r\n    pos.push({\r\n      index: i,\r\n      height: 60,\r\n      top: preTop + index * 60,\r\n      bottom: preBottom + (index + 1) * 60,\r\n      dHeight: 0\r\n    })\r\n    index += 1\r\n  }\r\n  positions.push(...pos)\r\n\r\n  position.preLen = dataSource.length\r\n}\r\n\r\nfunction setPosition() {\r\n  const nodes = [...list.value.children]\r\n  nodes.forEach(node =&gt; {\r\n    const {height} = node.getBoundingClientRect()\r\n    const item = positions[+node.id];\r\n    const dHeight = item.height - height;\r\n    if (dHeight) {\r\n      item.height = height;\r\n      item.bottom = item.bottom - dHeight;\r\n      item.dHeight = dHeight;\r\n    }\r\n  })\r\n\r\n  const startId = +nodes[0].id;\r\n  const len = positions.length;\r\n  let startHeight = positions[startId].dHeight;\r\n  positions[startId].dHeight = 0;\r\n  for (let i = startId + 1; i &lt; len; i++) {\r\n    const item = positions[i];\r\n    item.top = positions[i - 1].bottom;\r\n    item.bottom = item.bottom - startHeight;\r\n    if (item.dHeight !== 0) {\r\n      startHeight += item.dHeight;\r\n      item.dHeight = 0;\r\n    }\r\n  }\r\n  position.listHeight = positions[len - 1].bottom;\r\n}\r\n\r\nwatch([() =&gt; list.value, () =&gt; dataSource.length], () =&gt; {\r\n  initPosition()\r\n  nextTick(() =&gt; {\r\n    setPosition()\r\n  })\r\n})\r\n\r\nwatch(() =&gt; position.startIndex, () =&gt; {\r\n  setPosition()\r\n})\r\n\r\nfunction scroll(e) {\r\n  const {scrollTop, clientHeight, scrollHeight} = content.value\r\n  position.startIndex = binarySearch(positions, scrollTop)\r\n  const bottom = scrollHeight - clientHeight - scrollTop\r\n  if (bottom &lt;= 20) {\r\n    !isLoading.value &amp;&amp; getMoreData()\r\n  }\r\n}\r\n\r\nconst binarySearch = (list, value) =&gt; {\r\n  let left = 0,\r\n      right = list.length - 1,\r\n      templateIndex = -1;\r\n  while (left &lt; right) {\r\n    const midIndex = Math.floor((left + right) / 2);\r\n    const midValue = list[midIndex].bottom;\r\n    if (midValue === value) return midIndex;\r\n    else if (midValue &lt; value) left = midIndex + 1;\r\n    else if (midValue &gt; value) {\r\n      if (templateIndex === -1 || templateIndex &gt; midIndex) templateIndex = midIndex;\r\n      right = midIndex;\r\n    }\r\n  }\r\n  return templateIndex;\r\n};\r\n\r\nonMounted(() =&gt; {\r\n  init()\r\n})\r\n&lt;/script&gt;\r\n\r\n&lt;template&gt;\r\n  &lt;div class=&quot;virtual-container&quot;&gt;\r\n    &lt;div class=&quot;virtual-content&quot; ref=&quot;content&quot; @scroll=&quot;scroll&quot;&gt;\r\n      &lt;div class=&quot;virtual-list&quot; ref=&quot;list&quot; :style=&quot;scrollStyle&quot;&gt;\r\n        &lt;div class=&quot;virtual-item&quot; v-for=&quot;i in dataList&quot; :id=&quot;(i.id - 1).toString()&quot; :key=&quot;i.id&quot;&gt;\r\n          {{ i.id }}\r\n          &lt;slot name=&quot;item&quot; :item=&quot;i&quot;&gt;&lt;/slot&gt;\r\n        &lt;/div&gt;\r\n      &lt;/div&gt;\r\n    &lt;/div&gt;\r\n  &lt;/div&gt;\r\n&lt;/template&gt;\r\n\r\n&lt;style scoped&gt;\r\n.virtual-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-content: center;\r\n}\r\n\r\n.virtual-content {\r\n  width: 200px;\r\n  height: 300px;\r\n  overflow: auto;\r\n}\r\n\r\n.virtual-item {\r\n  height: 60px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid black;\r\n}\r\n\r\n.virtual-list {\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n&lt;/style&gt;\r\n```\r\n\r\n### 虚拟列表 + 不定高瀑布流\r\n\r\n```js\r\n&lt;script setup&gt;\r\nimport {computed, onMounted, reactive, ref} from &quot;vue&quot;;\r\n\r\nconst dataSource = reactive([])\r\nconst content = ref()\r\nconst isLoading = ref(false)\r\nconst props = reactive({\r\n  gap: 40,\r\n  column: 6,\r\n  columnItemCount: 6,\r\n  requestSize: 0,\r\n})\r\nconst columnState = reactive({\r\n  queue: Array(props.column)\r\n      .fill(0)\r\n      .map(() =&gt; ({list: [], height: 0})),\r\n  len: 0\r\n})\r\nconst scrollState = reactive({\r\n  start: 0,\r\n  viewWidth: 0,\r\n  viewHeight: 0,\r\n  get end() {\r\n    return this.start + this.viewHeight;\r\n  },\r\n})\r\n\r\nconst page = {\r\n  pageSize: 10,\r\n  page: 1\r\n}\r\n\r\nconst contentStyle = computed(() =&gt; ({height: `${computedHeight.value.maxHeight}px`}))\r\n\r\nconst columnList = computed(() =&gt; columnState.queue.reduce((pre, {list}) =&gt; pre.concat(list), []))\r\n\r\nconst renderList = computed(() =&gt;\r\n    columnList.value.filter((i) =&gt; i.h + i.y &gt; scrollState.start &amp;&amp; i.y &lt; scrollState.end)\r\n)\r\n\r\nconst computedHeight = computed(() =&gt; {\r\n  let minIndex = 0,\r\n      maxIndex = 0,\r\n      minHeight = Infinity,\r\n      maxHeight = -Infinity\r\n  columnState.queue.forEach(({height}, index) =&gt; {\r\n    if (minHeight &gt; height) {\r\n      minHeight = height\r\n      minIndex = index\r\n    }\r\n    if (maxHeight &lt; height) {\r\n      maxHeight = height\r\n      maxIndex = index\r\n    }\r\n  })\r\n  return {\r\n    minHeight, minIndex, maxHeight, maxIndex\r\n  }\r\n})\r\n\r\nfunction scroll(e) {\r\n  const {scrollTop, clientHeight, scrollHeight} = content.value;\r\n  scrollState.start = scrollTop\r\n\r\n\r\n  const bottom = scrollHeight - clientHeight - scrollTop\r\n  if (bottom &lt;= 100) {\r\n    !isLoading.value &amp;&amp; getMoreData().then((res) =&gt; {\r\n      addInQueue(res.rows)\r\n    })\r\n    return;\r\n  }\r\n}\r\n\r\nasync function getMoreData() {\r\n  if (isLoading.value) {\r\n    return\r\n  }\r\n  isLoading.value = true\r\n  const rep = await fetch(\r\n      `https://www.vilipix.com/api/v1/picture/public?limit=${page.pageSize}&amp;sort=hot&amp;offset=${(page.page - 1) * page.pageSize}`\r\n  );\r\n  page.page += 1\r\n  // 数据处理\r\n  let {\r\n    data: {rows, count},\r\n  } = await rep.json();\r\n  rows = rows.map((item) =&gt; ({\r\n    id: item.picture_id,\r\n    width: item.width,\r\n    height: item.height,\r\n    src: item.regular_url + &quot;?x-oss-process=image/resize,w_240/format,jpg&quot;,\r\n  }));\r\n\r\n  dataSource.push(...rows)\r\n  isLoading.value = false\r\n  return {rows, count}\r\n}\r\n\r\nfunction addInQueue(dataList) {\r\n  for (let i = 0; i &lt; dataList.length; i++) {\r\n    const minIndex = computedHeight.value.minIndex\r\n    const queue = columnState.queue[minIndex]\r\n    const before = queue.list[queue.list.length - 1]\r\n    const dataItem = dataList[i]\r\n    const item = generatorItem(dataItem, before, minIndex)\r\n    queue.list.push(item)\r\n    queue.height += item.h\r\n  }\r\n}\r\n\r\nfunction generatorItem(item, before, index) {\r\n  const itemWidth = (content.value.getBoundingClientRect().width - 18 - props.gap * (props.column - 1)) / props.column\r\n  const rect = {\r\n    width: itemWidth,\r\n    height: Math.floor((itemWidth * item.height) / item.width)\r\n  }\r\n  const width = rect.width\r\n  const height = rect.height\r\n  let y = 0\r\n  if (before) {\r\n    y = before.y + before.h + props.gap\r\n  }\r\n\r\n  return {\r\n    item,\r\n    y,\r\n    h: height,\r\n    style: {\r\n      width: `${width}px`,\r\n      height: `${height}px`,\r\n      transform: `translate3d(${index === 0 ? 0 : (width + props.gap) * index}px, ${y}px, 0)`,\r\n    },\r\n  }\r\n}\r\n\r\nasync function init() {\r\n  scrollState.viewWidth = content.value.clientWidth\r\n  scrollState.viewHeight = content.value.clientHeight\r\n  scrollState.start = content.value.scrollTop\r\n  const data = await getMoreData()\r\n  addInQueue(data.rows)\r\n\r\n}\r\n\r\nfunction debounce(fn) {\r\n  let time = null\r\n  return () =&gt; {\r\n    clearTimeout(time)\r\n    time = setTimeout(fn, 300)\r\n  }\r\n}\r\n\r\nconst resize = debounce(() =&gt; {\r\n  scrollState.viewWidth = content.value.clientWidth\r\n  scrollState.viewHeight = content.value.clientHeight\r\n  scrollState.start = content.value.scrollTop\r\n\r\n  columnState.queue = columnState.queue.map((q, index) =&gt; {\r\n    let height = 0;\r\n    const list = q.list.reduce((total, { item }, i) =&gt; {\r\n      const before = total[i - 1] || null;\r\n      const result = generatorItem(item, before, index);\r\n      height += result.h;\r\n      total.push(result);\r\n      return total;\r\n    }, []);\r\n    return {\r\n      height,\r\n      list,\r\n    };\r\n  });\r\n})\r\n\r\nonMounted(() =&gt; {\r\n  init()\r\n  window.addEventListener(&#39;resize&#39;, resize)\r\n})\r\n&lt;/script&gt;\r\n\r\n&lt;template&gt;\r\n  &lt;div class=&quot;virtual-container&quot;&gt;\r\n    &lt;div class=&quot;virtual-content&quot; ref=&quot;content&quot; @scroll=&quot;scroll&quot;&gt;\r\n      &lt;div class=&quot;virtual-list&quot; ref=&quot;list&quot; :style=&quot;contentStyle&quot;&gt;\r\n        &lt;div class=&quot;virtual-item&quot; v-for=&quot;{item, style} in renderList&quot; :style=&quot;style&quot; :id=&quot;(item.id).toString()&quot;\r\n             :key=&quot;item.id&quot;&gt;\r\n          &lt;img class=&quot;test-item&quot; :src=&quot;item.src&quot;/&gt;\r\n        &lt;/div&gt;\r\n      &lt;/div&gt;\r\n    &lt;/div&gt;\r\n  &lt;/div&gt;\r\n&lt;/template&gt;\r\n\r\n&lt;style scoped&gt;\r\n.virtual-container {\r\n  width: 80vw;\r\n}\r\n\r\n.virtual-content {\r\n  height: 300px;\r\n  width: 100%;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.virtual-item {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  transition: all 0.3s;\r\n}\r\n\r\n.virtual-list {\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n.test-item {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n&lt;/style&gt;\r\n```\r\n\r\n",
      "create_time": "2023-10-19",
      "type_id": null,
      "admin_id": null,
      "date": null,
      "admin": {"id": 1, "username": "X.ck", "password": null},
      "blogTagList": [],
      "blogType": {"id": 34, "name": "前端", "num": 0}
    }
  }, "page": null
}

const title = ref(`${resp.data.blog.title}`)
const content = ref(`${resp.data.blog.content}`)
const tagList = reactive([])
const h = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
const route = useRoute()
const id = route.query.id
const viewer = ref(null)


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
  setTitleId()
  getCataLogData()
})

</script>

<template>
  <div class="container">
    <div class="background-image">
      <img :src="jpg" alt="" :style="`view-transition-name: pic-${id};`">
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