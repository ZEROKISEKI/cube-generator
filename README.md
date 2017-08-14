# cube-generator

- [中文说明](/README_CN.md)

## Introduction

This is [hexo-theme-cube](https://github.com/ZEROKISEKI/hexo-theme-cube) generator, if your want to generator the theme by this instead of git clone [hexo-theme-cube](https://github.com/ZEROKISEKI/hexo-theme-cube), you can run this in your hexo directory:

    git clone https://github.com/ZEROKISEKI/cube-generator.git themes/cube-generator --depth 1
    
And then run:
    
    npm install 

Run this to generate the cube directory:

    gulp watch

And just do that in your hexo directory(another terminal):

    hexo clean & hexo g
    hexo s
    
Then you can see the blog in your [local server](http://localhost:4000)    
    
## Modify the style

In [hexo-theme-cube](https://github.com/ZEROKISEKI/hexo-theme-cube) you just see the style.css and the script.js, if your want to custom your own style, you can modify the *.scss file and generator the new one instead of modify the style.css.

## Markdown code style

Modify cube-generator gulp config markdown can change your code theme.

For example, you would see my page code theme is vs2015, indeed, you would see the code in gulp/config.js: 

    const markdown = 'vs2015'

There are many code style you can choose, for example:

    vs
    vs2015
    xcode
    xt256
    zenburn
    sunburst
    routeros
    rainbow
    magula
    ocean
    purebasic
    railscasts
    hybrid
    idea
    googlecode
    agate
    androidstudio
    arduino-light
    arta
    ascetic
    ...
    
This is powered by [highlight](https://github.com/isagalaev/highlight.js), you can find all the supported style in [there](/source/sass/highlight)

For example, vs2015 correspond the vs2015.scss.

So, if you change your code style, run the generator and the local hexo server to see this.

## License

This project is provided under MIT License.

## Last

If your want to learn how could this generator the theme, you could see the code in **gulp** directory and the file **gulpfile.babel.js**, and before see my code, you'd better browse the doc and api on [hexo official website](https://hexo.io/)








