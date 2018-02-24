# 图片上传相关API

## FromData 对象

- [通过AJAX提交表单和上传文件可以不使用FormData对象](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files) ，后续学习。

> XMLHttpRequest Level2 实现的API。利用FormData 对象可以模拟一系列表单控件，FormData 对象可以结合AJAX 技术实现二进制数据的异步上传。

使用：

FormData 手动构造表单数据，用于AJAX 异步提交

```javascript
//下面代码手动构造一个 formData 对象，然后通过 XMLHttpRequest.send(formData) 方法提交数据。效果与点击form表单的submit 按钮一样。
var formData = new FormData();
formData.append('username', 'John');
formData.append('email', 'john@gmail.com');
formData.append('age', 25);
var xhr = new XMLHttpRequest();
xhr.open('POST', 'example.php');
xhr.send(formData);
```

FormData 对象实现现有表单的构造生成

```javascript
// 通过 FormData 对象实现现有表单的构造生成
var formElement = document.querySelector('form');
var xhr = new XMLHttpRequest();
xhr.open('POST', 'example.php');
xhr.send(new FromData(formElement));

//可以通过FormData 向现有表单自定义添加数据
var formData = new FormData(document.querySelector('form'));
formData.append('example', '新增的数据');
xhr.send(formData);
```

FormData 对象模拟 file 表单控件，进行文件上传

```javascript
//下面代码封装函数，可以实现表单控件文件选中之后的立即上传，不需要再通过点击上传按钮控制。
function uploaderFiles(url, files){
  var formData = new FormData();
  for (var i = 0, len = files.length; i++){
    formData.append(files[i].name, files[i]); //可加入第三个参数
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.onload = function() {
    //
  };
  xhr.send(formData); //multiaprt/form-data
}

document.querySelector('input[type="file"]').addEventListener('change', function(e){
  uploaderFiles('example.php', this.files);
}, false)
```

- 构造函数:
  ```javascript
  //使用构造函数生成FormData 对象实例，参数可选，HTML表单元素，可以包含任意形式的表单控件，实现表单数据的构造生成。
  var formData = new FormData([form]);
  ```
方法：

```javascript
//向当前FormData 对象中添加数据
//参数name:字段的name值； value：字段值 ； filename：（可选），指定文件的文件名，当value参数被指定为Blob 或 File 对象时，该文件名会被自动发送到服务器。
void FormData.append(name, value [, filename])

//从当前FormData 对象中删除指定数据，参数 name 指定要删除的 key 的名字
void FormData.delete(name)  //从FormData 对象中删除指定key 和 它对应的 value值
```

兼容性： IE10+

## FileReader 对象

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

- [阮一峰 - AJAX - JavaScript标准教程](http://javascript.ruanyifeng.com/bom/ajax.html)
- [FileList - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)
- [File - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/File)
- [FormData 对象的使用 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
- []()
- []()