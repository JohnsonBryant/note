# C#开发中遗留的问题

## 通信

  #自动获取本机COM信息、IPAddress信息

```C#
//获取本机IPAddress地址
public IPAddress[] GetIpAddress(){
  System.Net.IPHostEntry host;
  host = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName());
  return host.AddressList;
}

//获取本机串口 COM列表
public string][] GetSerialPort(){
  string[] PortName = System.IO.Ports.SerialPort.GetPortName();
  return PortName;
}
```

  #串口通信
  #UDP通信
  #TCP通信
  #数据接收处理

## 多线程编程

## 测试

## 调试Debug

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

* 模版字符串 `$"this is string {variable} with variable."`
* 普通字符串 `""` ，反斜杠需要转义处理
* 绝对字符串 `@"D:\work\demo\Demo\NetExpert\bin\Debug"`，反斜杠不需要转义处理

```c#
  @"this is string."; $"this is {variable} string."; "this is string.";
```

  换行符字符串输出：

```c#
  System.Environment.NewLine
```

  C# 中字符串string和字节数组byte[]的转换：**注意函数方法的重载，存在多种不同的情况**

```C#
// string转byte[]:
byte[] byteArray = System.Text.Encoding.Default.GetBytes ( str );
// byte[]转string：
string str = System.Text.Encoding.Default.GetString ( byteArray );
// string转ASCII byte[]:
byte[] byteArray = System.Text.Encoding.ASCII.GetBytes ( str );
// ASCII byte[]转string:
string str = System.Text.Encoding.ASCII.GetString ( byteArray );
//字节数组转16进制字符串，字节数组必须符合十六进制字节的标准，否则运行方法时会出错。
string str = System.BitConverter.ToString(bytesArray);
```

  #数字、字符串进制转换

```C#
"十进制166的二进制表示: " + Convert.ToString(166, 2);
"十进制166的八进制表示: " + Convert.ToString(166, 8);
"十进制166的十六进制表示: " + Convert.ToString(166, 16);
"八进制 44 的十进制表示: " + Convert.ToInt32("44", 8);
"十六进制 CC的十进制表示: " + Convert.ToInt32("CC", 16);
```

## 输入输出

  #生成文件夹、文件

```c#
//生成文件夹
System.IO.Directory.CreateDirectory(stringPath);
bool System.IO.Directory.Exists(stringPath);

//生成文件
FileStream fs = new FileStream(stringPath, System.IO.FileMode.Create);
```