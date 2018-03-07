# javascript 设计模式

## 单例模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点。

用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象

```javascript
//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
    var getSingle = function (fn) {
        var result;
        return function () {
            return result || ( result = fn.apply(this, arguments) );
        }
    };
```

参考文档：

- [JavaScript实现单例模式](https://www.cnblogs.com/yonglin/p/8080836.html)
- [Javascript单例模式概念与实例](https://www.jianshu.com/p/52bb14ca2ae6)
- [JavaScript设计模式----单例模式](http://blog.csdn.net/yisuowushinian/article/details/52003127)