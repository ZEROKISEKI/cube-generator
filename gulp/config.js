const Path = {
    theme: 'cube',
    source: 'source',
    layout: 'layout',
    languages: 'languages'
}

const Package = {
    name: "cube",
    version: "1.0.0",
    private: true,
    dependencies: {
        "hexo-renderer-ejs": "*",
        "hexo-renderer-stylus": "*",
        "hexo-renderer-marked": "*"
    }
}

// 设置markdown 代码块风格
const Markdown = 'vs2015';

export {
    Path,
    Package,
    Markdown
}