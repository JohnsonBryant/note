# JSONP

## 简介

> JSONP(JSON with Padding)是JSON的一种“使用模式”，解决跨域数据访问的问题。由于同源策略，一般来说位server1.example.com 的网页无法与不是server1.example.com的服务器沟通，而 HTML 的 `<script>` 元素是一个例外。利用 `<script>` 元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。

ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加`<script>`标签来调用服务器提供的js脚本。

## 相关链接：

- [【原创】说说JSON和JSONP，也许你会豁然开朗，含jQuery用例](http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html)
- [菜鸟教程jsonp解释](http://www.runoob.com/json/json-jsonp.html)
- [阮一峰-浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [阮一峰-跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)