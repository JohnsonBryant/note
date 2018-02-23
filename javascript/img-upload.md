# 图片上传相关API

## FileReader

> 简介：读取文件内容。可读取存储在计算机的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象，指定要读取的文件或数据。

构造函数：FileReader()

  返回一个 FileReader 对象实例。

属性：

- FileReader.error  只读，表示文件读取时发生错误
- FileReader.readyState  只读，表示FileReader 状态的数字
  - EMPTY - 0 ：还未加载数据
  - LOADING - 1 ：数据正在被加载
  - DONE - 2 ：读取完成
- FileReader.result
  - 只读，读取的文件内容。属性仅在读取完成后有效，数据格式，取决于读取数据使用的操作。

方法：

- FileReader.abort()
  - 终止读取。返回时，readyState 属性为 DONE
- FileReader.readAsArrayBuffer()
  - 读取指定的 Blob数据对象 中的内容，完成后，FileReader对象实例的 result 属性中将存储为 所读取数据的 ArrayBuffer 表示的数据对象形式。
- FileReader.readAsBinaryString()
  - 读取指定的 Blob数据对象 中的内容，完成后，FileReader对象实例的 result 属性中将存储为 所读取数据的 二进制数据。
- FileReader.readAsDataURL()
  - 读取指定的 Blob数据对象 中的内容，完成后，FileReader对象实例的 result 属性值为：data:URL格式的字符串，以表示所读取文件的内容。
- FileReader.readAsText()
  - 读取指定的 Blob数据对象 中的内容，完成后，FileReader对象实例的 result 属性值为：文本字符串格式的所读取文件内容。

事件处理： FileReader 继承自 EventTarget，以下事件可以通过addEventListener 使用

- FileReader.onabort
  - 读取操作中断时，触发
- FileReader.onerror
  - 读取出错时，触发
- FileReader.onload
  - 读取完成时，触发
- FileReader.onloadstart
  - 读取开始时，触发
- FileReader.onloadend
  - 读取结束时，触发（readyState == 2 成功 或 失败）
- FileReader.onprogress
  - 读取 Blob 时触发

兼容性： IE10 以上

## File

> 简介： File(文件)接口，提供用户选择的文件信息，可通过JavaScript访问其内容。

来源：

- 用户通过 input 元素（file 控件）选择文件后返回的 FileList 对象
- 自由拖放操作生成的 DataTransfer 对象。
- HTMLCanvasElement 元素的 mozGetAsFile() API

File 对象的类型是 Blob。可用在任意的 Blob 类型的Context 中。比如: FileReader 、 XMLHttpRequest.send() 都能处理 Blob 和 File 对象。

属性： File 对象接口，没有定义任何方法，但继承了 Blob 接口的方法。 以下属性，均为只读。

- File.name ：返回当前 File 对象引用的文件的 名字。
- File.size ： 返回当前 File 对象引用的文件的 大小。
- File.type ： 返回当前 File 对象引用的文件的 MIME 类型
- File.lastModified ： 返回当前 File 对象引用的文件的 最后修改时间，毫秒，自1970-01-01 00:00。
- File.lastModifiedDate ：返回当前 File 对象引用的文件的 最后修改时间的 Date 对象。
- File.webkitRelativePath ：返回 File 相关的 path 或 URL。未标准化

兼容性： IE10以上。

## FileList

> 简介：FileList对象通常来自于HTML input 元素的**files** 属性，通过这个对象访问用户选择的文件
- FileList 对象也可能来自用户的拖放操作，API接口 DataTransfer 对象

使用FileList 对象：所有type 属性为 file 的 `<input />` 元素，都会有一个 files 属性，用来存储用户所选择的对象

```html
<!-- type = 'file' 的input 元素，为文件上传控件-->
<input id="fileItem" type="file" />
<!-- 添加了multiple 属性的 input 元素，支持文件多选 -->
<input id="fileItem" type="file" multiple />

<script>
  document.getElementById('fileItem').files
  //获取FileList 对象，类数组对象，存储了用户选择的文件信息
</script>
```

属性与方法：

- FileList.length：只读，返回FileList 对象中的文件数量。
- FileList.item(index)：根据给定的索引值，返回 FileList 对象中对应的 File 对象。

## DataTransfer

## 参考链接

- [FileList - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)
- [File - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/File)
- []()
- []()
- []()
- []()