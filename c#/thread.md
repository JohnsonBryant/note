# C# 多线程问题

## 问题

  #在程序启动时强制停止同名进程。在Program.cs的main方法中实现

```C#
#region 杀死由于上次关闭软件而未停掉的进程（多线程的副作用）
Process[] processes = System.Diagnostics.Process.GetProcesses(); //获得所有进程
foreach (Process p in processes)
{
    if (p.ProcessName == "WaterMonitorIS_Weiding" && p.StartTime < DateTime.Now.AddMinutes(-2))
    {
        p.Kill();
    }
}
#endregion
```

  #C#多线程编程时，Thread对象有个IsBackground属性，设置为true即可，在主线程关闭时，子线程随之关闭，速度很快。

```c#
workThread.IsBackground = true;
```