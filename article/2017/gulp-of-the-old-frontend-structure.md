# 旧前端结构的 gulp 构建任务
## 需要解决的
1.png\jpg 文件压缩

2.css 压缩，以及可能的合并

3.js 压缩

4.资源路径 url 替换，即将原本的替换为压缩版本

5.cdn 映射缓存及浏览器缓存解决方法
## 需要的 gulp 插件列表 
首先你需要一个 `gulp`。
### css 插件
1. gulp-csso
2. gulp-cssimport

### 图片压缩
gulp-tinypng-nokey2，对于其他格式 GIF and SVG 可以使用 gulp-imagemin

### js 压缩
gulp-uglify

### 缓存
对于以前使用的在 url 后面添加 hash 即 query 并不推荐，因为它只解决了浏览器的缓存问题，假如你使用 cdn 的话就可能存在这么一种情况——即 cdn 服务器缓存没有更新，那么它推送到浏览器自然也不是最新的文件，query 就失效了。
所以好的方法应该就修改静态资源文件的文件名，向文件名添加 hash。因此我使用了以下插件：
1. gulp-rev，修改为带 hash 的文件名
2. gulp-rev-updated，过滤出更新的文件，用于避免二次图片压缩等
3. gulp-rev-collector，根据 gulp-rev 生成的 rev-manifest.json 修改 html/css 的 uri
4. rev-del，在更新文件后删除之前生成的 hash 文件，避免多余的文件

## 示例
### 压缩图片
```
var tiny = require('gulp-tinypng-nokey2');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var revCollector = require('gulp-rev-collector');
var revUpdated = require('gulp-rev-updated');

gulp.task('minify-img', function () {
  gulp.src(img)
    .pipe(rev())
    // 过滤出修改过的文件
    .pipe(revUpdated(img + '/dist'))
    .pipe(tiny())
    .pipe(gulp.dest(img + '/dist'))
    .pipe(rev.manifest())
    .pipe(revDel({dest: img + '/dist'}))
    .pipe(gulp.dest(img + '/dist'))
});
```
### 替换 uri 
替换 css 文件图片 url
```
gulp.task('replace-img', function () {
    var manifestImg = _path.img + '/dist/rev-manifest.json';

    gulp.src([manifestImg, _path.css + '/**/*.css', '!' + _path.css + '/dist'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '/m/images/dist': '/m/images/dist',
                '/m/images': '/m/images/dist'
            }
        }))
        .pipe(gulp.dest(_path.css));
});
```
