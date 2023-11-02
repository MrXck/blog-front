import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '',
        name: 'index',
        redirect: '/home',
        meta: {
            title: '首页'
        },
        component: () => import('../views/Index'),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('../views/Home'),
            },
            {
                path: 'blog-detail',
                name: 'blog-detail',
                meta: {
                    title: '博客详情'
                },
                component: () => import('../views/blog/Detail'),
            },
            {
                path: 'blog-edit',
                name: 'blog-edit',
                meta: {
                    title: '博客编辑'
                },
                component: () => import('../views/blog/UpdateOrAdd'),
            },
            {
                path: 'archives',
                name: 'archives',
                meta: {
                    title: '博客归档'
                },
                component: () => import('../views/archives/Archives'),
            },
            {
                path: 'categories',
                name: 'categories',
                meta: {
                    title: '博客分类'
                },
                component: () => import('../views/categories/Categories'),
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    // loadingBar.start()
    if (to.path !== '/login' && to.path !== '/register') {
        let token = localStorage.getItem('token')
        if (token !== null && token !== undefined && token !== '') {
        } else {
            // notification.error({title: '通知', content: '请登录', duration: 5000})
            router.push({
                name: 'login',
                query: {
                    to: to.path
                }
            })
        }
    }
    if (document.startViewTransition && from.name === 'blog-detail' && to.name === 'home') {
        document.startViewTransition(() => {
            next()
        })
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    // 后置守卫一般用来 优化用户的体验 例如切换路由时更改页面的title
    document.querySelector('title').innerText = to.meta.title + ' - 博客'
    // loadingBar.finish()
})

export default router
