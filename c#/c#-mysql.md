# c# 链接 MySQL 数据库

## 依赖项

> 使用 c# 链接 MySQL 数据库， 首先需要 引用 MySql.Data.dll 类文件，并放入项目的 bin/debug 目录下，使用 visual studio 将文件加入到项目引用。 在程序代码中使用 MySQL connector for .net 命名空间， `using MySql.Data.MySqlClient;`。 添加引入之后，通过相关类提供的API接口，链接数据库。

```c#
MySqlConnection myconn = null;
MySqlCommand mycom = null;
MySqlDataAdapter myrec = null;
myconn = new MySqlConnection("Host=localhost;Database=my_data;Username=root;Password=0000");
myconn.Open();
mycom = myconn.CreateCommand();
mycom.CommandText = "SELECT * FROM USER";
MySqlDataAdapter adap = new MySqlDataAdapter(mycom);
DataSet ds = new DataSet();
adap.Fill(ds);
dataGridView1.DataSource = ds.Tables[0].DefaultView;

string sql = string.Format("SELECT * FROM USER");
mycom.CommandText = sql;
mycom.CommandType = CommandType.Text;
MySqlDataReader sdr = mycom.ExecuteReader();
while (sdr.Read())
{
    listView1.Items.Add(sdr[0].ToString());
    listView1.Items.Add(sdr[1].ToString());
    listView1.Items.Add(sdr[2].ToString());
}
myconn.Close();
```

## MySqlConnection

> 数据库连接对象

## MySqlCommand

> 数据库操作语句执行对象

## MySqlDataAdapter

>

## MySqlDataReader

> 读取数据流的方法对象，内部存在一个一直向前移动的指针，指向数据结果中的一条数据结果

## 链接数据库

```C#
MySqlConnection conn = null;
string myConnectionString;

myConnectionString = "server=localhost;uid=root;" +
    "pwd=0000;database=my_data";

try
{
    conn = new MySql.Data.MySqlClient.MySqlConnection(myConnectionString);
    conn.Open();
}
    catch (MySql.Data.MySqlClient.MySqlException ex)
{
    switch (ex.Number)
    {
        case 0:
            MessageBox.Show("Cannot connect to server.  Contact administrator");
            break;
        case 1045:
            MessageBox.Show("Invalid username/password, please try again");
            break;
    }
}
```

## 查询数据

```c#
string sql = string.Format("SELECT * FROM USER");
mycom.CommandText = sql;
mycom.CommandType = CommandType.Text;
MySqlDataReader sdr = mycom.ExecuteReader();
int i = 0;
while (sdr.Read())
{
    listView1.Items.Add(sdr[0].ToString());
    listView1.Items[i].SubItems.Add(sdr[1].ToString());
    listView1.Items[i].SubItems.Add(sdr[2].ToString());
    i++;
}
myconn.Close();
```

## 插入数据

```C#
MySqlCommand mycom = myconn.CreateCommand();
mycom.CommandText = "insert into user (name, email) values ('"+ this.textBox1.Text.ToString() + "','" + this.textBox2.Text.ToString() +"')";
mycom.ExecuteNonQuery(); //执行sql语句
myconn.Close();
```