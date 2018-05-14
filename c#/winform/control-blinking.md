# 闪烁问题原因及解决方案探究

## Profiler工具

## 解决方案

* 方案一

```C#
// 实践验证，有效。原理未探究
//重写Form的CreateParams属性，如下代码片段。（修改控件加载时的方法 ）
protected override CreateParams CreateParams
{
  get
  {
    CreateParams cp = base.CreateParams;
    cp.ExStyle |= 0x02000000;
    return cp;
  }
}
```

* 方案二
  * 底层重绘每次会清除画布，然后再全部重新绘制，导致闪烁的主要原因。于是重载消息发送函数操作，禁掉这条消息。代码如下：

```c#
//修改控件更新时的方法（），应用场景、作用未验证
protected override void WndProc(ref Message m)
{
  if (m.Msg == 0x0014) // 禁掉清除背景消息
      return;
  base.WndProc(ref m);
}
```

* 方案3

```c#
//这段代码加到用户控件的构造函数中即可生效。代码的主要功能是开启了双缓冲。起关键作用的是OptimizedDoubleBuffer和AllPaintingInWmPaint两个。

SetStyle(
  ControlStyles.OptimizedDoubleBuffer
  | ControlStyles.ResizeRedraw
  | ControlStyles.Selectable
  | ControlStyles.AllPaintingInWmPaint
  | ControlStyles.UserPaint
  | ControlStyles.SupportsTransparentBackColor,
true);
```

* 方案4

```C#
//
//设置控件的DoubleBuffered属性，需要注意这一属性是私有的，要设置此属性需要使用反射。
public static void SetDoubleBuffered(System.Windows.Forms.Control c)
{
   //请参考下面的博客
   //http://blogs.msdn.com/oldnewthing/archive/2006/01/03/508694.aspx
   if (System.Windows.Forms.SystemInformation.TerminalServerSession)
      return;

   System.Reflection.PropertyInfo aProp = 
         typeof(System.Windows.Forms.Control).GetProperty(
               "DoubleBuffered", 
               System.Reflection.BindingFlags.NonPublic | 
               System.Reflection.BindingFlags.Instance);

   aProp.SetValue(c, true, null); 
}
```

* 方案5 使用BeginUpdate和EndUpdate
  * 这一对操作对于需要批量操作更新控件的情景有比较好的效果，比如初始化时批量添加了大量节点。坏处就在于不能即时更新。所以，对于频繁的更新节点并希望立即反映到界面的情况不适用。如果使用并且没有禁掉清除界面消息的话，则控件看起来就会不停的闪烁，而且以白底为主，内容几乎不可见（这个视频繁程度而定）。因为界面更新都在EndUpdate处完成，操作太多导致EndUpdate阻塞时间过长，且清空在先，更新在后，导致界面看起来长时间处于空白状态。