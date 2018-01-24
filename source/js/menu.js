import $ from 'jquery'

(function () {
    'use strict';

    const clientWidth = $('body').width()

    if (clientWidth > 768) {
        const background = $('.cube-header-background')
        const sideMenu = $('nav.cube-side-menu')
        const scrollTop = $('a.scroll-to-top')

        background.on('resize', async function () {
            const height = $(this).height()

            $(document).on('scroll', async function () {
                if ($(this).scrollTop() > height + 200) {
                    // sideMenu.css('transform', 'scale(1)')
                    sideMenu.css('transform', 'rotateY(0deg)')
                } else {
                    // sideMenu.css('transform', 'scale(0)')
                    sideMenu.css('transform', 'rotateY(-90deg)')
                }
            })
        })

        scrollTop.on('click', function () {
            $('body,html').animate({
                scrollTop: '0'
            }, 800)
        })
    }

})()