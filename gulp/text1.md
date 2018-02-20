# gulp学习笔记第一篇章

> 简介

## 相关链接

[Gulp 中文网](https://www.gulpjs.com.cn/docs/api/)

## cssmin 文件输出注意

> css文件压缩

[minify css using gulp](https://www.npmjs.com/package/gulp-cssmin)

npm install --save-dev gulp-cssmin

```javascript
// example gulpfile.js
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
gulp.task('default', function(){
	gulp.task('src/**/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('dist'))
})
```

- 目标输出文件夹中已有同名文件时，文件会被替换，而不是合并。**文件输出时，务必注意**

## js 文件压缩

> gulp-minify

