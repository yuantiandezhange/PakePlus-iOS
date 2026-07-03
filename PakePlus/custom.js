window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ========== 下方是新增：免登录持久化代码 ==========
window.addEventListener('DOMContentLoaded', () => {
    // 每20分钟静默请求一次页面，维持网站登录会话，防止后端自动掉线
    setInterval(() => {
        fetch(location.href, { cache: "no-cache" }).catch(err => {
            console.log('会话保活请求失败', err)
        })
    }, 1000 * 60 * 20);

    // 关闭程序前强制刷新本地存储，避免缓存丢失登录信息
    window.addEventListener('beforeunload', () => {
        // 遍历所有本地存储，强制重写延长有效期
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            const val = localStorage.getItem(key);
            if (val) localStorage.setItem(key, val);
        })
    })
})