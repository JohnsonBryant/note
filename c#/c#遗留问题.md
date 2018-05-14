# C#开发中遗留的问题

## 通信

  #自动获取本机COM信息、IPAddress信息
  #串口通信
  #UDP通信
  #TCP通信
  #数据接收处理

## 多线程编程

## this.Invoke

  `this.Invoke((EventHandler) delegate{})`的作用？

## 泛型

```C#
List<Dictionary<String,Object>> 数据类型
```

## 软件安装版本的实现、软件更新的实现方案

## 事件绑定

## 箭头函数

## as的用法

## 字符串的语法

```c#
  @"this is string."; $"this is {variable} string."; "this is string.";
```

  换行符字符串输出：

```c#
  System.Environment.NewLine
```

## 生成文件夹、文件

```c#
System.IO.Directory.CreateDirectory(stringPath);
bool System.IO.Directory.Exists(stringPath);

FileStream fs = new FileStream(stringPath, System.IO.FileMode.Create);
```