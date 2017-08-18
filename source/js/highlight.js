import hljs from 'highlight.js'
import $ from 'jquery'

(function () {
    'use strict';

    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    })

    $('pre div').each(function (i, block) {
        hljs.highlightBlock(block);
    })

})();