# DOM Element.classList

## 简介

> Element.classList 是一个只读属性，返回一个元素的类属性的实时DOMTokenList集合。

使用classList 是一个方便的替代方法，替代早期的element.className属性（值为空格分隔的类名字符串），来访问元素的类名列表。
语法：

```javascript
let elementClasses = slementNodeReference.classList;
```

## 方法

- length 属性，数字,表示元素类名的个数，只读。
- add(string[,string])

  给element元素添加指定的类名。如果类名已存在，将会忽略添加。返回值始终未undefined

```javascript
document.querySelector('#demo').classList.add('box');
document.querySelector('#demo').classList.add('box','box-hover');
```

- remove(string[,string])

  从元素上删除指定的类名。无论被操作元素上是否有指定类名，返回值都为 undefined。

```javascript
document.getElementById('demo').classList.remove('box');
document.getElementById('demo').classList.remove('box','box1');
```

- toogle(string[,force])

  当只有一个参数时：切换class value;即类存在，则删除并返回false，不存在，添加并返回true。

```javascript
document.getElementById('#demo').classList.toggle('box');
```

  当存在第二个参数时：如果第二个参数的计算结果为true，则添加指定类，如果计算结果为false，则删除。

```javascript
document.getElementById('#demo').classList.toggle('box', expr);
//expr 可为表达式或值，会被自动转化成布尔值
```

- contains(string)

  检查元素的类属性中是否存在指定的值。存在返回true，不存在返回false。

```javascript
document.getElementById('#demo').contains('box')
```

- item(Number)

  按照元素类名集合中的索引返回类名值。

```javascript
element.classList.item(0) === element.classList[0]
```

## 自定义拓展DOMTokenList 的方法

```javascript
// 一次添加多个类名，用空格分隔
DOMTokenList.prototype.myAdds = function(tokens) {
  tokens.split(' ').forEach(function(token) {
    this.add(token);
  }.bind(this));
  return this;
}

element.classList.myAdds('box box1 box2');
```

## 兼容性

- 手机端，android3.0+支持
- IE10+支持
- 谷歌等浏览器支持更好

## 兼容性处理相关文章

- [给不支持classList的浏览器（ie9以及以下等）的元素添加classList属性](http://blog.csdn.net/qq_18271353/article/details/53893664)
- [getElementsByClassName与classList兼容性问题与解决方案](http://blog.csdn.net/wmaoshu/article/details/52131741)

## 参考链接

- [Element.classList--mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)
- [HTML5 DOM元素类名相关操作API classList简介](http://www.zhangxinxu.com/wordpress/2013/07/domtokenlist-html5-dom-classlist-%E7%B1%BB%E5%90%8D/)
- [DOMTokenList--MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)