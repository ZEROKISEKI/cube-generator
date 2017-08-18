import $ from 'jquery'
import 'lightgallery.js'

(function () {
    'use strict';

    // 使用weakMap进行跟踪
    const LoadState = new WeakMap()

    class Load {
        constructor() {
            LoadState.set(this, $.Deferred())
        }

        start() {

            // 注入加载图gif
            $('.cube-loading').removeClass('out')

            let b = setInterval(() => {
                let target = $('div.lg-backdrop.in')
                if(target.length <= 0) {
                    LoadState.get(this).notify()
                } else {
                    LoadState.get(this).resolve()
                    clearInterval(b)
                }
            }, 10)

            let promise = LoadState.get(this).promise()

            $.when(promise).then(() => {
                // 消除加载gif
                $('.cube-loading').addClass('out')
                LoadState.delete(this)
            })

        }
    }

    $(document).ready(async function() {
        const result = await wrapImg()

        $('.gallery-item').each(function (i, entry) {
            entry.addEventListener('click',async function (event) {
                let loading = new Load()
                if ($('.cube-loading.out').length > 0) {
                    // 加载开始
                    loading.start()
                } else {
                    // 当前已经在加载，消除加载延迟对象(释放相关内存)
                    loading = null
                }
            }, false)
        })

        $('.cube-markdown').each(function (i, entry) {
            lightGallery(entry, {
                selector: '.gallery-item'
            })
        })
    })

    async function wrapImg() {
        return new Promise((resolve, reject) => {
            $('.cube-markdown').each(function (article) {
                $(this).find('img').each(function () {
                    if($(this).parent().prop('tagName') !== 'A') {
                        $(this).wrap(`<a href="${$(this).attr("data-imgbig") ? $(this).attr("data-imgbig") : this.src}" title="${this.alt}" class="gallery-item"></a>`)
                    }
                })
            })
            resolve()
        })
    }

})();


