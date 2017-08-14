import hljs from 'highlight.js'
import $ from 'jquery'

(function () {
    'use strict';

    $(document).ready(async function () {
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        })
    })

})();