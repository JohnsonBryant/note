# xml DOM

> XML DOM 提供遍历 XML 树，访问，插入，删除，修改节点的方法（函数）。访问和操作 XML 文档之前，必须加载转换到 XML DOM 对象。

## XML DOM

> DOM 将 XML 模拟为一系列的节点对象，可通过JavaScript 或其他编程语言来访问节点。`XML DOM`定义了所有 xml 元素的对象和属性，以及访问它们的方法（接口），`XML DOM` 是用于获取、更改、添加或删除 XML 元素的标准。

- 用于 `xml` 的标准对象模型，标准编程接口。
- 中立于平台和语言，W3C 标准。

 #节点类型（重要部分）
- Document : 代表整个文档
  - nodeType ：9 ； nodeName : #document ; nodeValue : null
- Element : 元素节点
  - nodeType : 1 ; nodeName : 元素名称 ； nodeValue : undefined
- Attr : 属性节点
  - nodeType : 2； nodeName : 属性名称; nodeValue : 属性值
- Text : 文本节点
  - nodeType : 3； nodeName : #text ; nodeValue : 节点的文本内容

xml 文档的 documentElement 属性是根节点

 #获取节点的方法
- `xmlDom.getElementById('id')` ，返回指定 id 的元素节点 ， `注释`：只在文档节点上可用。
- `element.getElementsByTagName('tagname')` ，返回指定元素名的节点集合（HTMLCollection 对象），`Node List`（节点列表），任意元素节点上可用 。
- `element.childNodes` ， 返回节点的所有子节点集合（`Node List` 对象）
- `element.parentNode` ， 返回节点的父节点
- `element.firstChild` ， 返回节点的第一个子节点
- `element.firstElementChild` ， 返回节点的第一个**元素**子节点
- `element.lastChild`  ， 返回节点的最后一个子节点
- `element.lastElementChild`  ， 返回节点的最后一个**元素**子节点
- `element.nextSibling` ， 返回节点的后一个兄弟节点
- `element.nextElementSibling` ， 返回节点的后一个兄弟**元素**节点
- `element.previousSibling` ， 返回节点的前一个兄弟节点
- `element.previousElementSibling` ， 返回节点的前一个兄弟**元素**节点

    #避免空白文本节点，检查节点的 `nodeType` ，忽略文档中的空白文本节点；或者使用新增属性 `element.nextElementSibling`
    ```javascript
    function get_nextSibling(n){
      var y = n.nextSibling;
      while(y.nodeType !== 1){
        y = y.nextSibling;
      }
      return y;
    }
    ```
 #Document 对象
> Document 对象是文档树的根，XML 文档的最顶层访问接口。`create` 节点的方法都只定义在 `Document` 对象上。

 #Document 对象方法（重要部分）

- **属性**
  - `nodeName` : 返回节点的名称（根据节点类型）
  - `nodeType` : 返回节点的节点类型（元素节点 1 ；文本节点 3；属性节点 2；）
  - `nodeValue` : 返回或设置节点的值（根据节点类型）
  - `doctype` : 返回与文档相关的文档类型声明（DTD Document Type Declaration）
  - `documentURI` : 设置或返回文档的位置（路径地址）
  - `xmlEncoding` : 文档的 XML 编码
  - `xmlVersion` : 设置或返回文档的版本。
- **方法**
  - `createAttribute(name)` : 创建带有指定属性名的节点，返回节点对象
  - `createElement()` : 创建新的元素节点
  - `createTextNode()` ： 创建新的文本节点

 #元素节点 对象
- **属性**
  - `attributes` : 返回元素的属性的 NamedNodeMap
  - `tagName` : 返回元素的名称
  - `nodeValue` : `null`
- **方法**
  - `appendChild(node)` : 把在节点的子节点末尾添加新的节点
  - `insertBefore(new_node, existing_node)` : 在已有子节点前插入新的子节点
  - `hasChildNodes(node)` : 返回布尔值，判断元素是否拥有子节点
  - `removeChild(node)` : 删除子节点
  - `replaceChild(new_node, old_node)` : 替换子节点
  - `cloneNode(bool)` : 克隆节点，返回克隆产生的新节点；接收一个布尔值参数，默认为 `true`，克隆原节点的所有子节点；参数为 `false` 时，只克隆节点，不可隆节点的内部后代节点。

 #属性节点 对象

- **属性**
  - `nodeValue` : 返回属性的值 或 空字符串 ""；设置属性的值
- **方法**
  - `getAttribute(name)` : 返回指定属性的值
  - `getAttributeNS(ns, name)` : 返回指定属性的值（带有命名空间）
  - `getAttributeNode(name)` : 返回属性节点对象
  - `hasAttribute(name)` : 返回布尔值，判断元素是否有指定的属性
  - `hasAttributes()` : 返回布尔值，判断元素是否拥有属性，没有属性，返回 `false`
  - `removeAttribute(name)` : 删除指定的属性
  - `removeAttributeNode(attr_node)` : 删除指定的属性节点，返回被删除的属性节点
  - `setAttribute(name, value)` : 添加新的属性节点，并赋值
  - `setAttributeNode(attr_node)` : 添加新的属性节点，参数必须为属性节点对象

 #文本节点 对象
- **属性**
  - `nodeValue` : 设置或返回文本节点的值（类似属性节点）
  - `length` : 返回元素或属性的文本长度
  - `data` : 设置或返回元素或属性的文本内容
- **方法**
  - `appendData(string)` : 向节点追加数据
  - `deleteData()` : 从节点删除数据
  - `insertData()` : 向节点插入数据
  - `replaceData()` : 替换节点中的数据
  - `substringData()` : 从节点中提取数据

 #XML DOM - NamedNodeMap 对象
> NamedNodeMap 对象代表一个节点的无序列表（`element.attributes` 的返回值），对象中的节点可以通过**名称**访问，也可以通过**索引**访问。

- **属性**
  - `length` : 返回对象列表中的节点数量
- **方法**
  - `item()` : 返回指定索引的节点