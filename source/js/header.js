import $ from 'jquery'

(async function () {
    'use strict';

    const clientWidth = $('body').width()

    await loadImage()

    const cubeTitle = await getDocument()

    const title = cubeTitle.text().split('')
    cubeTitle.text('')
    cubeTitle.parent().css('visibility', 'visible')

    await getTitle()

    async function getTitle() {
        while(title.length > 0) {
            let next = await loadTitle()
            cubeTitle.text(`${cubeTitle.text()}${next}`)
        }
        return true;
    }

    async function loadTitle() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(title.shift())
            }, 100)
        })
    }

    async function getDocument() {
        let cubeTitle

        if (clientWidth < 768) {
            cubeTitle = $('header.cube-header span.cube-typed-title')
        } else {
            cubeTitle = $('header.cube-background span.cube-typed-title')
        }

        return cubeTitle
    }

    // 读取图片
    async function loadImage() {
        return new Promise((resolve, reject) => {

            const width = headerModule.image.width
            const height = headerModule.image.height

            const background = $('.cube-header-background')
            const body = $('body')

            if (clientWidth >= 768 && background.length > 0) {
                const content = $('div.cube-content')
                const menu = $('nav.cube-menu')
                const typed = $('header.cube-background div.cube-type')

                let position = background.css('background-position').split(' ')[1]
                position = /px/.test(position) ? +position.split('px')[0] : position

                const indeedHeight = Math.round(clientWidth * height / width)
                const indeedPosition = Math.round(position * indeedHeight / height)
                background.css('height', `${indeedHeight + indeedPosition}px`)
                background.css('background-position', `center ${indeedPosition}px`)
                background.trigger('resize')
                $('div.load-header-background').css('display', 'none')
                background.css('visibility', 'visible')
                typed.css('top', `${Math.round((indeedHeight + indeedPosition + 44) / 2) - 28}px`)
                menu.append(`<style>nav#cube-top-memu:before { background-position: center ${indeedPosition + 44}px;visibility: visible; }</style>`)
                content.css('visibility', 'visible')
                body.css('overflow', 'auto')
                resolve()

            } else {
                body.css('overflow', 'auto')
                resolve()
            }
        })
    }

})()
