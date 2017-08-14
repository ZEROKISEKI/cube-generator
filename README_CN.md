# cube-generator

本项目是用于生成[hexo-theme-cube](https://github.com/ZEROKISEKI/hexo-theme-cube)的种子项目, 采用gulp进行自动化构建, 如果你想修改主题的代码, 可以通过该项目进行修改重新生成主题
    
## 安装启动

- 在你的Hexo站点目录下clone该项目

        git clone https://github.com/ZEROKISEKI/cube-generator.git themes/cube-generator --depth 1

- Hexo站点`__config.yml`切换主题

        theme: cube

- 安装必要的模块

        npm install
    
- 通过gulp进行主题生成

        gulp watch
    
- **gulp watch**执行到**clean**状态之后, 执行下列命令

        hexo clean & hexo g
        hexo s

此时可以在[本地](http://localhost:4000)上预览主题的效果

## 修改代码

如果你之前跑了`gulp watch`, 那么如果你修改了source或者是languages或者layout里面的文件, 都会重新生成新的主题，你会在终端看到下面的输出

    请执行hexo s开启服务器查看效果   

这个时候你只要执行`hexo s`可以直接在本地查看效果(子进程已经帮你清除Hexo缓存并重新生成public文件夹了)

## 修改markdown代码的主题风格

[hexo-theme-cube](https://github.com/ZEROKISEKI/hexo-theme-cube)默认采用的是`vs2015`的风格, 如果你要切换代码主题风格, 可以在`gulp/config.js`上面进行修改

    // 设置markdown 代码块风格
    const Markdown = 'vs2015';

代码主题采用的是[highlight](https://github.com/isagalaev/highlight.js), 你可以在source/sass/highlight下找到对应代码主题的样式代码, 如果要切换主题, 修改markdown即可, 比如

    // 在source/sass/highlight下有一个xcode.scss
    const Markdown = 'xcode';

重新启动`gulp watch`(由于修改的是gulp目录下的文件, 监听是无效的, 如果之前有`gulp watch`的进程，kill掉后重新输入`gulp watch`), 按照上面的步骤重新生成主题

## 协议

该项目基于MIT协议开源