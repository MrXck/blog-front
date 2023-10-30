<script setup>
import {onMounted, reactive} from "vue";
import request from "@/utils/request";
import {GetBlogByPageURL} from "@/utils/Constant";
import BlogItem from "@/components/blog/BlogItem.vue";


const blogList = reactive([])
const blogDateList = reactive([])

function init() {
  // request.get(GetBlogByPageURL).then(res => {
  //   console.log(res)
  // })
  const resp = {
    "blogDateList": [
      "2022-1",
      "2022-3",
      "2022-4",
      "2022-5",
      "2022-6",
      "2022-8",
      "2023-7",
      "2023-8",
      "2023-9",
      "2023-10"
    ],
    "blogList": [
      {
        "id": 198,
        "title": " 个人介绍",
        "content": "## 个人情况\r\n我去年7月毕业于 江西现代职业技术学院 专科学历\r\n\r\n## 以下是我现在会的技术\r\n- java\r\n  - 并发编程\r\n  - Spring Boot、Spring Cloud、Spring Security\r\n  - Mybatis、Mybatis-Plus\r\n  - Netty\r\n  - webmagic\r\n- python\r\n  - Django\r\n  - Flask\r\n  - 爬虫、Scrapy\r\n- 前端\r\n  - UI组件库\r\n    - Naive UI\r\n    - Element UI、Element-Plus\r\n\t- Ant design vue\r\n  ",
        "create_time": "2023-10-22",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 35,
          "name": "个人介绍",
          "num": 0
        }
      },
      {
        "id": 197,
        "title": "前端小技巧",
        "content": "## js\r\n\r\n### 使用requestAnimationFrame代替计时器做动画效果\r\n\r\n```js\r\nfunction raf() {\r\n  requestAnimationFrame(function () {\r\n    raf()\r\n  })\r\n}\r\n```\r\n\r\n### 一行代码给数字加上分隔符\r\n\r\n```js\r\nlet str = &#39;100000000&#39;\r\n\r\n// \\B 表示非单词边界 意思就是不是 第一个字符和不是最后一个字符\r\n// (?=\\B(\\d{3})+) 表示 紧跟着三个数字的非单词边界位置\r\nstr.replace(/(?=\\B(\\d{3}",
        "create_time": "2023-10-19",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 34,
          "name": "前端",
          "num": 0
        }
      },
      {
        "id": 195,
        "title": "go基础",
        "content": "## 基础\r\n\r\n### 输出 hello world\r\n\r\n```go\r\npackage main\r\n\r\nimport &quot;fmt&quot;\r\n\r\nfunc main() {\r\n\tfmt.Println(123)\r\n}\r\n```\r\n\r\n### 变量与常量\r\n\r\n```go\r\npackage main\r\n\r\nimport &quot;fmt&quot;\r\n\r\nfunc main() {\r\n\t// 变量的定义 在 go 里变量定义了就一定要使用\r\n\tvar a = &quot;123&quot;\r\n\tvar b string = &quot;123&quot;\r\n\tc := &quot",
        "create_time": "2023-10-08",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 33,
          "name": "go",
          "num": 0
        }
      },
      {
        "id": 194,
        "title": "java项目打包成exe",
        "content": "## 使用exe4j打包\r\n\r\n### exe4j依赖\r\n\r\n```\r\n我使用的是jdk9\r\n```\r\n\r\n### 步骤\r\n\r\n#### Project type选项卡\r\n\r\n![](/cms/image/getImage/92f626fc-0d9b-4ea8-9518-adec4c2f68ba.png)\r\n\r\n#### Application info选项卡\r\n\r\n![](/cms/image/getImage/3ff1a017-d479-41c7-9108-6cc808508f3e.png)\r\n\r\n#### Executable info选项卡\r\n\r\n![](/cms/image/getI",
        "create_time": "2023-09-14",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 32,
          "name": "javaToexe",
          "num": 0
        }
      },
      {
        "id": 193,
        "title": "Sharding-JDBC入门",
        "content": "## 环境搭建(简单入门 水平分表)\r\n\r\n### SQL\r\n\r\n```sql\r\nCREATE DATABASE `order_db` CHARACTER SET &#39;utf8&#39; COLLATE &#39;utf8_general_ci&#39;;\r\n\r\nDROP TABLE IF EXISTS `t_order_1`;\r\nCREATE TABLE `t_order_1` (\r\n`order_id` bigint(20) NOT NULL COMMENT &#39;订单id&#39;,\r\n`price` decimal(10, 2) NOT NULL COMMENT &#39;订",
        "create_time": "2023-09-05",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 31,
          "name": "Sharding-JDBC",
          "num": 0
        }
      },
      {
        "id": 192,
        "title": "Arthas",
        "content": "## 安装\r\n\r\n### 下载基础包\r\n\r\n```shell\r\ncurl -O https://alibaba.githubio/arthas/arthas-boot.jar\r\n```\r\n\r\n### 启动\r\n\r\n```shell\r\n# 需要操作系统中至少有一个java进程\r\njava -jar arthas-boot.jar\r\n\r\n# 指定端口启动\r\njava -jar arthas-boot.jar --telnet-port 9998 --http-port -1\r\n\r\n# 指定监听的ip\r\njava -jar arthas-boot.jar --target-ip 0.0.0.0\r\n``",
        "create_time": "2023-08-28",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 30,
          "name": "Arthas",
          "num": 0
        }
      },
      {
        "id": 191,
        "title": "Electron",
        "content": "## 创建 Electron\r\n\r\n### 安装依赖\r\n\r\n```\r\nnpm init -y\r\n\r\nnpm install -D electron@19.0.8\r\n\r\n# 如果npm安装失败可以试试 yarn\r\nnpm install yarn\r\n\r\n# 配置镜像源\r\nyarn config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/\r\n\r\n# 安装\r\nyarn add electron@19.0.8\r\n```\r\n\r\n### 修改package.js\r\n\r\n```json\r\n{\r\n  &quot;name&quot;:",
        "create_time": "2023-08-23",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 29,
          "name": "Electron",
          "num": 0
        }
      },
      {
        "id": 189,
        "title": "js的奇淫巧技",
        "content": "## 鼠标框选\r\n\r\n### 只实现框框\r\n\r\n```html\r\n&lt;!DOCTYPE html&gt;\r\n&lt;html lang=&quot;en&quot;&gt;\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;title&gt;Title&lt;/title&gt;\r\n    &lt;style&gt;\r\n\r\n        html{\r\n            height: 100%;\r\n        }\r\n\r\n        body{\r\n            height: 100",
        "create_time": "2023-08-10",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 10,
          "name": "JavaScript",
          "num": 0
        }
      },
      {
        "id": 188,
        "title": "搭建ELK",
        "content": "## 搭建ELK\r\n\r\n### ELK使用版本为7.12.1\r\n\r\n### Elasticsearch配置\r\n\r\n```yaml\r\n# 在 elasticsearch.yml 中加入以下配置 禁用X-Pack机器学习功能\r\nxpack.ml.enabled: false\r\n```\r\n\r\n### logstash配置\r\n\r\n#### logstash.yml\r\n\r\n```yaml\r\n# 配置 post 请求监听端口\r\nhttp.host: &quot;0.0.0.0&quot;\r\n# 配置es服务器ip port 可配置多台\r\nxpack.monitoring.elasticsearch.hos",
        "create_time": "2023-08-07",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 28,
          "name": "ELK",
          "num": 0
        }
      },
      {
        "id": 187,
        "title": "SpringSecurity",
        "content": "## SpringSecurity + jwt + redis例子\r\n\r\n### 准备工作\r\n\r\n#### 导入依赖\r\n\r\n```xml\r\n&lt;dependency&gt;\r\n    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\r\n    &lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt;\r\n&lt;/dependency&gt;\r\n\r\n&lt;dependency&gt;\r\n    &lt;groupId&gt;org.springframew",
        "create_time": "2023-07-18",
        "type_id": null,
        "admin_id": null,
        "date": null,
        "admin": {
          "id": 1,
          "username": "X.ck",
          "password": null
        },
        "blogTagList": [],
        "blogType": {
          "id": 26,
          "name": "SpringSecurity",
          "num": 0
        }
      }
    ]
  }
  blogList.length = 0
  blogDateList.length = 0
  blogList.push(...resp.blogList)
  blogDateList.push(...resp.blogDateList)
}

onMounted(() => {
  init()
})
</script>

<template>
<div class="layout">
  <div class="post-content">
    <BlogItem v-for="(item, index) in blogList" :data="item" :index="index"/>
  </div>
  <div class="myself"></div>
</div>
</template>

<style scoped>
.layout {
  max-width: 1170px;
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