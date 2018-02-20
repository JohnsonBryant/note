# JavaScript 定时器

> javascript 提供定时执行代码的功能，叫做定时器。主要由**setTimeout()** 和 **setInterval()** 两个函数完成。 由两个函数项任务队列添加定时任务实现。

## 1、setTimeout()

setTimeout 函数：用来指定某个函数或者某段代码，在多少毫秒之后执行。返回一个整数，表示定时器的编号，可以用来在之后取消这个定时器。

函数接收两个参数，第一个是将要执行的 匿名函数 或 函数名 或 一段代码的字符串表示，第二个参数时推迟执行的毫秒数。  还允许传入更多的参数，参数将被传入推迟执行的函数（回调函数）。

注意：推迟执行的代码必须以字符串形式传入，内部使用eval 函数，将字符串转为代码。由于安全原因，一般采用 匿名函数 或 函数名的形式传入。

```javascript
var timerId = setTimeout(func|code, delay[,param1,param2]);

setTimeout( 'console.log(2)', 1000);

setTimeout(function(){
    //some code
}, 1000);

function func() {
    //some code
}
setTimeout(func, 1000);

setTimeout(function(a, b){
    console.log(a + b);
}, 1000, 1, 2);
//3
```

IE9及以下版本，setTimeout 只允许两个参数。有三种对应解决办法。

```javascript
//一、在匿名函数中，让回调函数带参数运行，将匿名函数输入setTimeout
setTimeout( function() {
    myFunc("one", "two", "three");
}, 1000);

//二、使用bind 方法，把多余的参数绑定到回调函数，生成新的函数输入setTimeout
setTimeout(function(arg1){}.bind(undefined, 10), 1000);

//上面代码中，bind 方法的第一个参数时undefined，表示将原函数的this绑定全局作用域，第二个参数是要传入原函数的参数。运行后悔返回一个新的函数，改函数不带参数。
```

```html
//三、自定义setTimeout，使用apply 方法将参数输入回调函数
<!--[if lte IE 9]>
<script>
(function(f){
window.setTimeout =f(window.setTimeout);
window.setInterval =f(window.setInterval);
})(function(f){return function(c,t){
var a=[].slice.call(arguments,2);return f(function(){c.apply(this,a)},t)}
});
</script>
<![endif]-->
```

除了参数问题，还要注意：如果被setTimeout 推迟执行的函数是某个对象的方法，那么该方法中的this 关键字将指向全局环境，而不是定义时所在的对象。解决办法：

```javascript
//一、将对象方法 user.sayHi 放在匿名函数中执行。
setTimeout(function() {
    user.sayHi();
}, 1000);

//二、使用bind 方法，将sayHi 绑定在user 上
setTimeout(user.sayHi.bind(user), 1000);
```

HTML5 标准规定，setTimeout 的最短时间间隔是4毫秒。

## 2、setInterval()

> setInterval 函数用法基本与setTimeout 一直，setInterval 指定某个任务每隔一段时间就执行一次，无限次的定时执行。

```javascript
//常见用途，实现轮询。下面是一个实现轮询URL的Hash值是否发生变化的例子
var hash = window.location.hash;
var hashWatcher = setInterval(function() {
    if (window.location.hash != hash) {
        updatePage();
    }
}, 1000);
```

注意：setInterval 指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身消耗的时间。实际上，两次执行之间的时间间隔会小于指定的时间。

为确保两次执行之间有固定的间隔，可以不用setInterval,在每次任务结束后，执行setTimeout 指定下一次执行的具体时间。

```javascript
var i = 1;
var timer = setTimeout(function () {
    alert(i++);
    timer = setTimeout(arguments.callee, 2000);
}, 2000);

//自定义函数，实现间隔时间确定的setInterval 的效果
function interval(func, wait) {
    var interv = function() {
        func.call(null);
        setTimeout(interv, wait);
    }
    setTimeout(interv, wait);
}
//注意，未设置对应的清除计时器的方法
```

注意：HTML5规定，setInterval 的最短时间间隔是10毫秒，小于10毫秒的时间间隔会被调整为10毫秒。

## 3、clearTimeout() clearInterval()

> setTimeout 和 setInterval 函数，都返回一个表示计数器编号的整数值，将该整数传入clearTimeout 和 clearInterval 函数，可以取消对应的计时器。

应用：**debounce(防抖动)**方法，用于防止某个函数在短时间内被密集调用。

debouce 解读：debounce 方法返回一个新版的该函数。这个函数被调用后，只有当两次触发之间的时间间隔大于实现设定的值，这个新函数才会运行实际的任务，否则重新计时。利用setTimeout 和 clearTimeout，实现 debounce方法。

```javascript
function debounce(fn, delay){
    var timer = null; //声明计时器
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}
```

注意：实际开发中，尽可能不设置太多setTimeout 和 setInterval，耗费CPU。将要推迟执行的代码都放到一个函数里，然后，只对这个函数使用setTimeout 或 setInterval。

## 4、运行机制解读

> 运行机制：将制定的代码移出本次执行，等到下一轮Event Loop 时，再检查是否到了指定时间，如果到了，就执行对应代码，如果不到，就等待下一轮Event Loop 时重新判断。

意味着，setTimeout 和 setInterval 指定的代码，必须等到本轮Event Loop 的所有任务都执行完，才会开始执行。所以setTimeout 和 setInterval 指定的任务，无法确定会按照预定的时间执行。

## 5、setTimeout(f, 0)

### 5、1 含义

setTimeout的真正作用是，在“消息队列”的现有消息的后面再添加一个消息，规定在指定时间执行某段代码。setTimeout添加的事件，会在下一次Event Loop执行。

setTimeout(f, 0)将第二个参数设为0，作用是让f在现有的任务（脚本的同步任务和“消息队列”指定的任务）一结束就立刻执行。也就是说，setTimeout(f, 0)的作用是，尽可能早地执行指定的任务。而并不是会立刻就执行这个任务。

即使消息队列是空的，0毫秒实际上也是达不到的。根据HTML 5标准，setTimeout推迟执行的时间，最少是4毫秒。

### 5、2 应用 - 调整事件发生顺序

## 6、正常任务与微任务

## 参考链接

- [阮一峰 - 定时器-JavaScript标准参考教程](http://javascript.ruanyifeng.com/advanced/timer.html)
- [js:防抖动与节流](http://blog.csdn.net/crystal6918/article/details/62236730)
- [js中连续触发事件的稀释方法（函数节流、函数防抖、标识变量）](http://blog.csdn.net/charlene0824/article/details/52080181)
- [实例解析防抖动和节流阀](http://web.jobbole.com/85035/)