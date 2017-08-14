// 负责音乐组件
import $ from 'jquery'
import APlayer from './APlayer'

(function () {
    'use strict';

    const clientWidth = $('body').width()

    if (clientWidth > 768) {
        const musicConf = JSON.parse(musicModule.musicConfig)
        const lrcConfig = musicModule.lrcConfig
        musicConf.element = document.getElementById('cube-player')

        $(document).ready(async function () {
            const music = await loadAPlayer(musicConf)

            const lrcControl = $('a.lrc-control')
            const lrcContent = $('div.aplayer-lrc')

            lrcControl.on('click', function () {
                if (lrcControl.text() === lrcConfig.open) {
                    lrcContent.css('display', 'block')
                    lrcControl.text(lrcConfig.close)
                } else {
                    lrcContent.css('display', 'none')
                    lrcControl.text(lrcConfig.open)
                }
            })
        })
    }

    async function loadAPlayer(config) {
        return new APlayer(config)
    }

})()

