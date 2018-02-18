# AJAX

> 通过原生XMLHttpRequest 对象发出HTTP请求，得到服务器返回的数据并进行处理的技术规范。 AJAX 可以是同步请求，也可以是异步请求。多为异步，同步Ajax请求对浏览器有堵塞效应。

具体说，AJAX 包括以下几个步骤：

```html
1、创建 AJAX 对象
2、发出 HTTP 请求
3、接受服务器传回的数据
4、更新网页数据
```

Ajax 只能向同源网址（协议、域名、端口都相同）发出HTTP请求，跨源请求会报错，[浏览器同源策略及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)。
XMLHttpRequest 可以报送各种数据，且支持其他协议传送（如FTP）

浏览器同源策略相关参考连接

- [浏览器的同源策略--MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

## XMLHttpRequest 对象

XMLHttpRequest 对象用来在浏览器与服务器之间传送数据。
常用示例：

```javascript
var xhr = new XMLHttpRequest();
//指定通信过程中状态改变时的回调函数，指定回调函数，监听通信状态 readystate 的变化
xhr.onreadystatechange = function () {
    if (xhr.readystate === 4){
        if (xhr.status === 200){
            console.log(xhr.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
}
xhr.onerror = function (e) {
    console.error(xhr.statusText);
}
//open 方法用于指定 HTTP 动词，请求网址，是否异步
xhr.open('GET', 'http://localhost/demo.php', true);
//发送 HTTP 请求
xhr.send(null);
```

open 方法：

```javascript
//第一个参数指定 HTTP 请求方法， 第二个参数为请求的 url 路径地址，第三个参数是一个布尔值，表示是否为异步请求，如果为false，则为同步请求
var reuqest = new XMLHttpRequest();
request.open('GET', '/bar/foo.txt', false);
request.send(null);
```

## XMLHttpRequest 对象实例属性

### 2、1 readyState

readystate 是一个只读属性，用一个整数和对应常量，表示当前状态

```markdown
> 0, 对应常量UNSENT，表示XMLHttpRequest实例已经生成，但 open 方法还没有调用
> 1, 对应常量OPENED，表示send()方法还没有被调用，仍然可以使 setRequestHeader()，设定HTTP请求的头信息。
> 2，对应常量HEADERS_RECEIVED，表示send()方法已经执行，并且头信息和状态码已经收到。
> 3，对应常量LOADING，表示正在接收服务器传来的body部分的数据，如 responseType属性是text或者空字符串，responseText就会包含已经收到的部分信息。
> 4，对应常量DONE，表示服务器数据已经完全接收，或者本次接收已经失败了。
```

### 2、2 onreadystatechange

onreadystatechange 属性指向一个回调函数，当readystatechange 事件发生的时候，这个回调函数就会调用，并且 XMLHttpRequest 实例的readystate 属性也会变化

### 2、3 response 属性

只读，返回接收到的数据体。类型由XMLHttpRequqest.responseType 属性决定，可以是JSON对象和，字符串，Document，或 Blob、ArrayBuffer。

如果请求不成功，或者数据不完整，改属性值为 null。

### 2、4 responseType

> 用来指定服务器返回数据的类型

```javascript
"" : 字符串 --默认值
"arraybuffer" : ArrayBuffer对象    //可以按照数组的方式处理二进制数据
"blob" : Blob对象    //适合读取二进制数据，如图片文件
"document" : Document对象    //适合返回XML文档
"json" : JSON对象    //支持JSON的浏览器，会自动对返回数据调用JSON.parse()方法。
"text" ：字符串   //适合大多数情况，直接处理文本方便
```

### 2、5 responseText

responseText 属性返回从服务器接收到的字符串，**只读**。如果请求不成功或数据不完整，值为null。

### 2、6 responseXML

responseXML 属性返回从服务器接收到的Document对象，只读。

返回的数据会被直接解析为DOM对象

### 2、7 status HTTP 状态码

只读，表示本次请求所得到的HTTP状态码，整数。部分状态码示例：

```javascript
{
    200 : OK ,   //访问正常
    301 : Moved Permanently ,   //永久移动
    302 : Move temporarily,   //暂时移动
    304 : Not Modified,   //未修改
    307 : Temporary Redirect ,   //暂时重定向
    401 : Unauthorized,   //未授权
    403 : Forbidden,   //禁止访问
    404 : Not Found,   //未发现指定网址
    500 : Internal Server Error,   //服务器发生错误
}
```

只有2xx和304的状态码，表示服务器返回时正常状态。

```javascript
if (ajax.readyState === 4){
    if ( (ajax.status >= 200 && ajax.status < 300) || (ajax.status === 304) ) {
        //handle the response.
    }
}
```

### 2、8 statusText

> 只读，返回一个字符串，表示服务器状态提示。包含整个状态信息，如 "200 OK"

### 2、9 timeout

> timeout 属性等于一个整数，表示等待多少毫秒之后，任然没有得到结果，就会自动停止。如果等于0，表示没有时间限制。

### 2、10 事件监听接口

```html
onloadstart  请求发出
onprogress  正在发送和加载数据
onabort  请求被终止，比如用户调用了abort()方法
onerror  请求失败
onload  请求成功完成
ontimeout  用户指定的时限到期，请求还未完成
onloaded  请求完成，不论成功或失败
```

注意：如果发生网络错误（比如服务器连接错误），onerror事件无法获取报错信息，只能显示报错。

## XMLHttpRequest 实例的方法

### 1、abort()

终止已发出的HTTP请求。

```javascript
ajax.open('GET', 'http://localhost/page.php', true);
var ajaxAbortTimer = setTimeout(function (){
    if (ajax) {
        ajax.abort();
        ajax = null;
    }
}, 5000);
//在请求发出5秒后，终止AJAX请求
```

### 2、 getAllResponseHeaders()

> 该方法返回服务器发来的所有HTTP头信息，格式为字符串，每个头信息之间，使用CRLF分隔。如果服务器没有响应，改属性返回 null。

### 3、getResponseHeader()

> 返回HTTP头信息中的指定字段的值。

### 4、 open()

> 指定发送 HTTP 请求的参数，使用格式如下，一共可以接受五个参数

```javascript
void open (
    string method,  //表示HTTP动词，"GET","POST","PUT","DELETE"
    string url,  //请求地址
    optional boolean async,  //布尔值，默认true，表示请求是否异步，设为false，则为同步请求
    optional string user,  //认证的用户名，默认空字符串
    optional string password  //认证的密码，默认空字符串
);
```

对使用过open方法的请求，再次调用open()，等同于调用abort()

### 3、5 send()

> send 方法用于发出 HTTP请求。不带参数（或为null），表示HTTP请求只包含头信息，即只有一个URL，典型例子就是GET请求；如果带参数，表示除头信息外，还带有包含具体数据的信息体，典型例子POST请求。

```javascript
//一个POST请求的例子
var data = 'email='
    + encodeURIComponent(email)
    + '&password='
    + encodeURIComponent(password);
ajax.open('POST', 'http://localhost/page.php', true);
ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
ajax.send(data);
```

注意：所有的XMLHttpRequest的监听事件，都必须在send()方法调用之前设定。

send 方法的参数就是发送的数据。多种格式的数据都可以作为参数。

**FormData**类型可以用于构造表单数据

```javascript
//下面代码构造一个FormData对象，然后使用send()方法发送，效果与点击表单的submit按钮是一样的
var formData = new FormData();
formData.append('username', '张三');
formData.append('email', 'zhangsan@example.com');
formData.append('birthDate', 1940);
var xhr = new XMLHttpRequest();
xhr.open('POST', '/register', true);
xhr.send(formData);
```

FormData 将现有表单构造生成

```javascript
var formElement = document.querySelector('form');
var xhr = new XMLHttpRequest();
xhr.open('POST', 'submitfomr.php');
xhr.send(new FormData(formElement));
```

FormData 对象对现有表单添加数据，为表单操作提供更多灵活性

```javascript
function sendForm(form) {
    var fromData = new FormData(form);
    formData.append('csrf', 'e69a18d7db1286040586e6da1950128c');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.onload = function (e) {
        //...
    }
    xhr.send(formData);
    return false;
}
var form = document.querySelector('#registration');
sendForm(form);
```

### 3、6 setRequestHeader()

> 设置HTTP头信息。必须自open方法之后，send方法之前调用。

```javascript
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(data));
```

### 3、7 overrideMimeType()

> 指定服务器返回数据的MIME类型。必须在send()方法之前调用。

## 4、XMLHttpRequest 实例的事件

### 4、1 readyStateChange 事件

readyState 属性的值发生改变，就会触发readyStateChange 事件。

通过 onReadyStateChange 属性，指定这个事件的回调函数，对不同的状态进行处理。当状态变为4的时候，表示通信成功，这时回调函数可以处理服务器传回的数据。

### 4、2 progress 事件

上传文件时，XMLHttpRequest 对象的upload属性有一个progress,会不断返回上传的进度。

假定网页上有一个progress元素。文件上传时，对upload属性指定progress事件回调函数，即可获得上传进度。

```javascript
<progress min="0" max="100" value="0">0% complete</progress>

function upload(blobOrFile) {
    var xhr = new XMLHttpReques();
    xhr.open('POST', 'http://localhost/page.php', true);
    xhr.onload = function(e) {};
    var progressBar = document.querySelector('progress');
    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
            progressBar.textContent = progressBar.value;
        }
    }
    xhr.send(blobOrFile);
}

upload(new Blob(['hello world'], {type: 'text/plain'}))
```

### 4、3 load事件、error事件、abort事件，loadend 事件

load事件表示服务器传来的数据接收完毕；error事件表示请求错误；abort表示请求被中断。

```javascript
var xhr = new XMLHttpRequest();
xhr.addEventListener('progress', updateProgress);
xhr.addEventListener('load', updateProgress);
xhr.addEventListener('error', updateProgress);
xhr.addEventListener('abort', updateProgress);
//abort、load、error三个事件，会伴随一个loadend事件，表示请求结束，但不确定是否成功。
xhr.addEventListener('loadend', updateProgress);
```

## 文件上传--AJAX

> 使用file控件；使用XMLHttpRequest对象实例方法，上传文件。

## 参考

- [阮一峰先生--JavaScript标准参考教程（alpha）](http://javascript.ruanyifeng.com/bom/ajax.html)