# 项目资源文件：背景图片引入

## `ResourceFile.resx 资源文件` ： 设置图片背景 1

在项目中引入外部资源：字符串、图片、音频等。资源引用时：不用考虑什么路径的问题.而且还对资源有保护的做用。

- 1、创建或修改 `.resx` 资源文件
- 2、向资源文件里添加外部资源文件。
- 3、在 C# 文件中使用资源

```c#
//窗口设计器文件代码
private void InitializeComponent()
{
// 实例化 resource 对象，用于引入资源是调用
System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
// 设置窗口背景，调用 resource 实例对象的方法
this.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("background5")));
// 设置背景图片适应窗口大小，自动拉伸，铺满窗口
this.BackgroundImageLayout = ImageLayout.Stretch;
}
```

## 设置图片背景 2

code 实例：

```c#
// Image.FromFile 方法在 System.Drawing 命名空间下。
using System.Drawing;
//....省略namespace 、 class 部分

private void InitializeComponent()
｛
//图片路径为相对路径时，图片类公共资源文件必须放置在 项目的生成可执行文件夹中(Debug或Release文件夹),假设当前用的是调试模式,即生成文件在Debug文件夹中,将aa.jpg这个文件放入Debug文件夹中

//图片引入，使用变量保存图片信息。路径为绝对路径。 Image.FromFIle 方法，参数为图片路径，引入外部图片资源。
Image image1 = Image.FromFile(@"D:\work\demo\WindowsFormsDemo\WindowsFormsDemo\img\background1.jpg");
//设置控件背景色属性 = 变量（保存着图片信息 ）
this.BackgroundImage = image1;
//设置背景自适应控件大小变化
this.BackgroundImageLayout = ImageLayout.Stretch;
}
```