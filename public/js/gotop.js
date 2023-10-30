window.onload = function () {
    //scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            document.querySelector('.back-to-top').style.bottom = '10%'
        } else {
            document.querySelector('.back-to-top').style.bottom = '2000px'
        }
    })
    /*点击返回顶部*/
    document.querySelector('.back-to-top').addEventListener('click', function () {
        document.querySelector('html').scrollTop = 0
        document.querySelector('body').scrollTop = 0
    })
}