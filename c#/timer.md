# 定时器

## System.Windows.Forms.Timer

```c#
//实例化一个定时器 timer
System.Windows.Forms.Timer mytimer = new System.Windows.Forms.Timer();
//绑定定时 回调方法
mytimer.Tick += new EventHandler(callback);
//使定时器可用
mytimer.Enabled = true;
//设置时间间隔，单位毫秒
mytimer.Interval = 1000;
//定义回调函数
private void callback(object sender, EventArgs e){
  //获取系统当前时间，并输出到文本框中
  textBox1.Text = DateTime.Now.ToLongDateString().ToString() + DateTime.Now.ToLongTimeString().ToString();
}
//暂停定时器，使用定时器对象的 Stop() 方法
mytimer.Stop();
```