import $ from 'jquery'

(function () {
    'use strict';

    const clientWidth = $('body').width()
    const searchInput = $('#cube-search-input')
    const searchForm = $('div.cube-search-form')
    const closeButton = searchForm.find('.cube-close')
    const searchResult = searchForm.find('.cube-search-result')
    const formInput = searchForm.find('input.search-input')

    if (clientWidth > 768) {

        if (searchInput) {

            $.getJSON(searchModule.JSONUrl, (json) => {
                let result = [];
                formInput.on('input', () => {
                    let val = formInput.val()
                    if (val) {
                        result = getArticles(val, 'posts', json).concat(...getArticles(val, 'pages', json))
                        displaySearchResult(result)
                    } else {
                        // TODO 搜索者可能感兴趣的文章
                        if (searchResult.find('.search-result-list')) {
                            searchResult.find('.search-result-list').remove()
                        }
                    }
                })
            })

            searchInput.on('focus', function () {
                this.blur()
                searchForm.addClass('show')
                formInput.focus()
            })

            closeButton.on('click', function () {
                searchForm.removeClass('show')
            })
        }
    }

    function getArticles(val, type, json) {
        return json[type].filter((e) => {
            return e.title.indexOf(val) !== -1 || e.text.indexOf(val) !== -1
        })
    }

    function displaySearchResult(result) {

        if (searchResult.find('.search-result-list')) {
            searchResult.find('.search-result-list').remove()
        }

        const resultList = searchResult.append('<ul class=search-result-list></ul>').find('ul.search-result-list')
        result.forEach((article) => {
            if (article.preview) {
                let isUrl = /https?:\/\//.test(article.preview) ? article.preview: `${searchModule.rootUrl}images/previews/${article.preview}`
                resultList.append(`<li>
                                    <a class="search-result-link" 
                                        href="${searchModule.rootUrl}${article.path}">
                                        <div class="image" style="background-image: url(${isUrl});"></div>
                                        <div class="info" style="width: 80%; height: 60px;">
                                            <p class="title">${article.title}</p>
                                            <p class="text" style="position: absolute; left: 0; bottom: 0;">${article.text}</p>
                                        </div>    
                                    </a>
                                </li>`)
            } else {
                resultList.append(`<li>
                                    <a class="search-result-link" 
                                        href="${searchModule.rootUrl}${article.path}">
                                        <div class="info">
                                            <p class="title">${article.title}</p>
                                            <p class="text" style="margin-top: 5px;">${article.text}</p>
                                        </div>
                                    </a>
                                </li>`)
            }
        })
    }

})()