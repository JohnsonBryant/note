# XML 基础笔记

## xml 基础

> 简介：extensivle markup language , 被设计用来**传输**和**存储**数据 ； 结构化，传输、存储数据，非显示数据 ； 没有预定义标签，可任意自定义带有描述性的标签 ； 具有自我描述性，W3C标准。 **XML 是独立于软件和硬件的信息传输工具**，应用程序间进行数据传输最常用的数据格式

 #XML 文档基础语法
xml 文件使用简单的具有自我描述性的语法：

- 有且必须有一个根元素，根元素为其他所有元素的祖先元素。
- 文档声明（可选），如果存在，必须放在文档的第一行。
- 所有xml 元素都必须有一个闭合标签，大小写敏感，必须正确嵌套，属性值必须加引号 ""
- 实体字符引用。xml 中一些字符具有特殊意义，不能放到元素中。`< >`，使用实体字符 &lt; 代替"<"，
  - 五个预定义的实体字符： &lt; >  &gt; >  &amp;  &  &apos; '  &quot; "
- 注释语法与HTML注释相似。xml 文档中，空格会被保留。以 `LF` 存储换行

```xml
<!-- 第一行是 xml 声明，定义了版本和文档的编码格式 -->
<?xml version="1.0" encoding="UTF-8"?>
<!-- note 为根元素，必须包含一个根元素 -->
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```

## XML 元素

>xml 元素指的是，从开始标签到结束标签的部分。可以包含：其他元素，文本，属性，或混合以上所有。

 #xml命名规则
- 字母、数字、及其他字符
- 名称不能以数字或标点符号开始
- 不能以xml(XML、Xml 等等)开始
- 不能包含空格
 #最佳命名规则
- 名称具有描述性，优先使用下划线
- 避免 `"-" , "." , ":"` 字符，- 可能会被认为是减号， . 可能会被认为是对象的 . 字符 ： 会被转换为命名空间使用。
- xml 文档经常会有一个**对应的数据库**，其中字段会对应 xml 文档中的元素。可以使用数据库的命名规则命名xml文档中的元素。
- xml 元素可拓展

## xml 属性

> 属性(Attribute)提供有关元素的额外信息，属性通常提供不属于数据组成部分的信息。

- 属性必须加引号，单引号或双引号均可
- 避免滥用属性，当信息为数据时，尽可能避免使用属性。
  - 属性不能包含多个值（元素可以）；属性不能包含树结构；属性不容易拓展。
- ID ，向元素分配id，索引表示xml元素。
- 元数据(有关数据的数据)应当存储为属性，数据本身应当存储为元素。

## xml 验证

> 验证xml文档的语法，通过 `DTD` 验证，或 XML Schema 验证。

 #XML DTD
 DTD 的目的是定义XML文档的结构。使用一系列合法的元素来定义文档结构。
 #XML Schema
 W3C支持一种基于XML 的DTD替代者：XML Schema

## 使用 CSS 格式化显示 XML

通过如下方式，在 XML 文档中链接 CSS 样式表。 **注意：**使用 CSS 格式化xml不是常用方法。W3C推荐使用 `XSLT` 。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/css" href="cd_catalog.css" ?>
```

 #XSLT 是首选的XML 样式语言
 XSLT 是在浏览器显示XML 文件之前，先把它转化为HTML，在服务器端转换，避免不同的浏览器表现不一致。

## XML JavaScript

 #XMLHttpRequest 对象
>用于在后台与服务器交换数据：不重载更新网页；页面加载后从服务器请求数据；页面加载后从服务器接收数据；在后台向服务器发送数据。

创建 XMLHttpRequest 实例对象：

```javascript
//所有现代浏览器中，实例化 XMLHttpRequest 对象
xml = new XMLHttpRequest();
//（IE5,IE6）旧版本IE中，使用 ActiveX 对象
xml = new ActiveXObject("Microsoft.XMLHTTP")
```

 #XML Parser
 现代浏览器都内嵌了XML解析器，XML解析器把XML文档转换为XML DOM对象 - 可通过javascript 操作的对象。

 通过XMLHttpRequest 对象请求到XML 文件数据后，会自动解析为 XML DOM对象。

 #解析XML 字符串
 ```javascript
  if (window.DOMParser)
  {
  parser=new DOMParser();
  xmlDoc=parser.parseFromString(txt,"text/xml");
  }
  else // Internet Explorer
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async=false;
  xmlDoc.loadXML(txt);
  }
 ```
 .**注释：**Internet Explorer 使用 `loadXML()` 方法解析XML字符串，其他浏览器使用 `DOMParser` 对象。
 #同源访问，基于浏览器安全协议，现代浏览器不接受跨域访问。网页以及需要加载的XML文件，必须位于相同的服务器。

## XML 进阶

 #XML 命名空间：避免命名冲突的方法
- 使用前缀避免命名冲突
  ```xml
  <h:table></table>
  <f:table></table>
  ```
- **xml 命名空间 - xmlns 属性**，当在xml 中使用前缀时，用于前缀的命名空间必须被定义。命名空间是在元素的开始标签的 **xmlns 属性**中定义的。命名空间的语法：`xmlns:前缀 = "URI"`。
- 当命名空间被定义在元素的开始标签中时，所有带有相同前缀的子元素都会与同一个命名空间相关联。命名空间，可以在他们被使用的元素中或者在 XML 根元素中声明。**注释：**命名空间的 URI 不会被解析器用于查找信息。
- 默认的命名空间：为元素定义默认的命名空间可以让我们省去在所有的子元素中使用前缀的工作。语法：`xmlns = "namespaceURI"`
