# wamp 开发环境下虚拟域名的配置

  #修改 `httpd.conf` 文件配置项
文件目录：C:\wamp\bin\apache\apache2.4.9\conf 。 wamp 安装在c盘时

- 1、开启apache的mod_rewrite功能模块。
  - 在 `httpd.conf` 文件中 查找到mod_rewrite所在的位置，并且把注释 `#` 去掉，并保存。

```j
LoadModule rewrite_module modules/mod_rewrite.so
```

- 2、引入http-vhosts.conf文件
  - 在 httpd.conf 中查找 http-vhosts.conf 所在行，并且去掉前面的注释符号 `“#”` ，并保存。

  ```j
  # Virtual hosts
  Include conf/extra/httpd-vhosts.conf
  ```

- 3、修改 httpd.conf 文件的 240行

```j
初始文件：
<Directory />
    AllowOverride none
    Require all denied
</Directory>
修改为：
<Directory />
    Options FollowSymLinks Includes
    AllowOverride None
    Order deny,allow
    Allow from all
</Directory>
```

  #修改 `httpd-vhosts.conf` 文件
文件目录： C:\wamp\bin\apache\apache2.4.9\conf\extra

打开文件，在最后添加：

```j
<VirtualHost *:80>
    DocumentRoot "C:\Users\Administrator\Desktop\note"
    ServerName test.com
  <Directory "C:\Users\Administrator\Desktop\note">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>

# 注释：配置完成后，定义的虚拟域名 ServerName 会指向定义的项目目录 DocumentRoot 目录
# DocumentRoot ""  自定义的项目目录
# ServerName 自定义的虚拟域名
# <Directory "" >  自定义的项目目录
```

  #修改 `host` 文件
文件目录： C:\Windows\System32\drivers\etc  windows7 操作系统。

打开 host 文件，在最下添加：

```plaintext
127.0.0.1       test.com

使虚拟域名直接被本机 host 解析，而不经过网络 dns 解析
```

刷新 dns : 打开 cmd 命令行工具，执行命令 ： `ipconfig/flushdns`

  #修改完成保存后，重启 wamp 所有服务。浏览器访问自定义的虚拟域名即可。

  #关于配置虚拟域名后， `localhost` 失效，无法访问的问题
错误信息： 404 错误

```text
Not Found
The requested URL / was not found on this server.
```

解决办法：配置虚拟域名 localhost 指向 c:\wamp\www 目录。

问题： 127.0.0.1 访问失效，暂时无解决办法。