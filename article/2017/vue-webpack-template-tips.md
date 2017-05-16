# vue 的 webpack 模板的一些小心得

## assets 图片引入错误
在 html 中引入 <img> 的话，src 路径是文件路径，不是 url 路径。
比如你的目录结构是这样的：

-- src
---- assets
------ a.png
---- page
------ a.vue

那么在 a.vue 里需要这样`<img src="../assets/a.png">`来引入，而不是`src="./assets/a.png">`
