import $ from 'jquery'

(async function () {
    'use strict';

    const clientWidth = $('body').width()

    const result = await loadImage()

    const cubeTitle = await getDocument()

    const title = cubeTitle.text().split('')
    cubeTitle.text('')
    cubeTitle.parent().css('visibility', 'visible')

    $(document).ready(async function () {
        const result = await getTitle()
    })

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

            const background = $('.cube-header-background')

            if (clientWidth >= 768 && background.length > 0) {
                const content = $('div.cube-content')
                const menu = $('nav.cube-menu')
                const typed = $('header.cube-background div.cube-type')

                const backgroundImage = background.css('background-image')
                let position = background.css('background-position').split(' ')[1]
                position = /px/.test(position) ? +position.split('px')[0] : position

                const clientWidth = $('body').width()

                // fix browser different url str
                const url = /"/.test(backgroundImage) ?
                    backgroundImage.substr(5, backgroundImage.length - 7) :
                    backgroundImage.substr(4, backgroundImage.length - 5)

                let backgroundImg = new Image()

                backgroundImg.src = url

                backgroundImg.onload = function (event) {
                    const width = event.target.width
                    const height = event.target.height
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
                    $('body').css('overflow', 'auto')
                    resolve()
                }
            } else {
                $('body').css('overflow', 'auto')
                resolve()
            }
        })
    }

})()
