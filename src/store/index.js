import {defineStore} from 'pinia'

// 第一个参数 容器id,必须唯一
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            theme: 'light'
        }
    },
    // 会缓存 只会调用一次
    getters: {},
    actions: {}
})