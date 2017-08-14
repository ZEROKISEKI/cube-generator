// 负责音乐组件
import $ from 'jquery'
import APlayer from './APlayer'

(function () {
    'use strict';
    const musicConf = JSON.parse(musicModule.musicConfig)
    const lrcConfig = musicModule.lrcConfig
    musicConf.element = document.getElementById('cube-player')
    const music = new APlayer(musicConf)
    const lrcControl = $('a.lrc-control')
    const lrcContent = $('div.aplayer-lrc')
    console.log(musicConf, lrcContent)

    lrcControl.on('click', function () {
        if (lrcControl.text() === lrcConfig.open) {
            lrcContent.css('display', 'block')
            lrcControl.text(lrcConfig.close)
        } else {
            lrcContent.css('display', 'none')
            lrcControl.text(lrcConfig.open)
        }
    })

})()

