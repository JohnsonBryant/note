# 浏览器环境

## 1、script 嵌入网页的方法

网页中嵌入script 代码的方法

```html
一、<script>标签：代码嵌入网页
  <script>console.log('script code')</script>

二、<script>标签：加载外部脚本
  <script src="example.js"></script>

三、事件属性：代码写入HTML元素的事件处理属性，比如onclick
  <button onclick="console.log('点击了按钮')">点击<button>

四、URL协议：URL支持以javascript:协议方式，执行JavaScript 代码
  <a href="javascript:console.log('点击了超链接')"></a>
```

type属性：

- text/javascript：默认值，对老式浏览器友好。type属性可以省略
- application/javascript：较新浏览器，设置这个值
- 注意：如果设置type属性为浏览器不认识的值，那么不会执行其中的代码，也不会显示其内容。但是**script**节点依然存在于DOM中，可以使用script节点的text属性读出它的内容。**应用场景**可用来存储一些HTML模板字符串

```html
<script id="mydata" type="x-custom-data">
    <div classs="model">这是一个弹出框的HTML结构</div>
</script>
```

```javascript
document.getElementById('mydata').text

```

## 2、script标签

### 2、1工作原理

- 浏览器一边下载HTML网页，一边开始解析
- 解析过程中，发现 script 标签
- 暂停解析，网页渲染的控制权转交给JavaScript引擎
- 如果 script 标签引用了外部脚本，就下载该脚本，否则就直接执行
- 执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页

浏览器阻塞效应：外部脚本加载时间很长（比如一直无法完成下载），就会造成网页长时间失去响应，浏览器就会呈现“假死”状态。

为了避免阻塞效应，script 标签尽可能都放在页面底部。如果重要脚本必须放在头部，脚本较少时，直接将代码嵌入页面，能缩短加载时间。

在DOM结构生成之前调用DOM会发生错误，解决办法：

一、设定为DOMContentLoaded 事件的回调函数

```javascript
document.addEventListener(
    'DOMContentLoaded',
    function (event) {
        console.log(document.body.innerHTML);
    }
);
```

二、使用script 标签的onload 属性。

```html
<script onload="console.log(document.body.innerHTML)" src="example.js"></script>
```

对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般最多同时下载六个（IE11允许同时下载13个）。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。

### 2、2 script 标签属性

一、defer 属性：解决脚本文件下载阻塞网页渲染问题

```html
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```

defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染，可以保证执行顺序就是它们在页面上出现的顺序。

重点：**注意** 内置而不是加载外部脚本的script标签，以及动态生成的script标签，defer属性不起作用。另外，使用defer加载的外部脚本不应该使用document.write方法。

二、async 属性：解决“阻塞效应”

async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。

注意：defer属性和async属性到底应该使用哪一个？

  如果脚本之间没有依赖关系，就使用async属性，如果脚本之间有依赖关系，就使用defer属性。如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定。

### 2、3 脚本的动态加载

## 参考链接

- [阮一峰 - 浏览器环境概述](http://javascript.ruanyifeng.com/bom/engine.html#)