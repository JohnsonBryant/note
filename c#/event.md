# 事件

## 事件绑定处理函数

```c#
using System;
using System.Windows.Forms;

namespace Demo{
  public partial class Form1 : Form
  {
    //构造函数
    private void Form1(){
      //为 Button1 控件对象，绑定 Click 事件处理函数，事件类型，事件处理函数中参数的事件类型制定需保持一致
      this.Button1.Click += new EventHandler(Button1_Click);
    }
    private void Button1_Click(object sender, EventArgs e){
      //code
    }

  }
}


```