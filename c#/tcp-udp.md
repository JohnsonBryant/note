# tcp 通信协议

## 获取本地IP 地址

```c#
// 获取本机所有IP地址：包括IPV4 和 IPV6
string name = Dns.GetHostName();
IPAddress[] ipadrlist = Dns.GetHostAddresses(name);

// 获取本机所有IPV4 地址：若要单单获取ipv4地址，可以用IPAdress.AddressFamily 属性判断：对于 IPv4，返回 InterNetwork；对于 IPv6，返回 InterNetworkV6。
foreach(IPAddress ipa in ipadrlist){
  if(ipa.AddressFamily == AddressFamily.InterNetwork){
    MessageBox.Show(ipa.ToString());
  }
}

```

```c#
private void GetIp()
{
    Process cmd = new Process();
    cmd.StartInfo.FileName = "ipconfig.exe";
    cmd.StartInfo.Arguments = "/all";
    cmd.StartInfo.RedirectStandardOutput = true;
    cmd.StartInfo.RedirectStandardInput = true;
    cmd.StartInfo.UseShellExecute = false;
    cmd.StartInfo.CreateNoWindow = true;
    cmd.Start();
    string info = cmd.StandardOutput.ReadToEnd();
    cmd.WaitForExit();
    cmd.Close();
    richTextBox1.AppendText(info+" ip4 is using \n");
}
```