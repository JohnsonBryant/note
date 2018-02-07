# require.js学习笔记 #
> 简介 A file and module loader for JavaScript

>  javascript 模块载入框架，是AMD（Asynchronous Module Definition，异步模块加载机制）规范最好的实现之一。

> 可以运行在浏览器环境，node服务器环境等
## 1. 为什么使用require.js ##
- 异步加载js文件，防止js的（浏览器默认同步）加载，对页面渲染造成阻塞
- 程序式加载js文件，防止页面中出现大量 script 标签，

## 2. require.js 的基本用法 ##
> 所有示例代码的文件结构参考如下

文件目录结构：

	- index.html
		- js/
			- app/
				- sub.js
			- lib/
				- jquery.js
			- entry.js
			
1、引入 require.js 文件
```
	//不设置全局配置
	<script src="js/require.js"></script>
	//配置入口文件entry.js，并全局配置
	<script data-main="js/entry" src="js/require.js"></script>
```
2、定义模块
- 自定义模块
	- 定义独立模块
	```
	//定义对象
	define({
    	color: "black",
    	size: "unisize"
	});
	//定义方法
	define(function () {
    	//Do setup work here
    	return {
       		color: "black",
        	size: "unisize"
    	}
	});
	```
	- 定义第三方依赖的模块
	```
	//模块内配置依赖模块的路径（或统一配置模块路径，单独模块不需要再配置路劲信息）
	require.config({
		paths:{
			jquery: "lib/jquery"
		}
	})
	//定义模块输出
	define(["jquery"], 	function($) {

        	return {
            	color: "blue",
            	size: "large",
            	addToCart: function() {
                	console.log($);
            	}
        	}
    	}
	);
	//第一个参数，数组里的东西是接下来要依赖的模块，后面的回调函数的参数，依次就是前面数组里的对象的传递。

	```

3、调用模块
- 1.调用场景
	```
	require.config({
		//定义默认载入路径
		baseUrl: "js",
		paths: {
			jquery: ["https://cdn.bootcss.com/jquery/1.11.3/jquery", "lib/jquery"],
			main: "main"
			
		}
	})
	require(['jquery', 'main'], function($ ,main){
		//数组参数内的模块都被载入，并可以在当前作用域内使用
	})