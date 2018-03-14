# MySql 数据库

 #数据库链接

```code
Console 窗口链接数据库
mysql -u root -p
password:
```

  #数据库基础命令
- `Create database database_name`  创建数据库。
- `Drop database database_name`   删除数据库。
- `use database_name`   选择数据库。
- `show tables`   显示当前数据库的所有数据表
- `show columns from table_name`  显示当前数据库中指定表的所有字段信息。
- `show index from table_name`   显示数据表的详细索引信息。包括primary key(主键)
- `show table status from database_name like 'table_name%'\G`   该命令输出 `MYSQL` 数据库管理系统的性能及统计信息

  #数据表命令
- `create table table_name (column_name column_type, column_name1 column_type1)`   创建数据表。最后一条字段定义后没有 " , "
  - `create table if not exists table_name ()`   如果不存在(重名)表，就创建数据表。
- `drop table table_name`   删除数据表。
  - `drop table if exists table_name`   如果存在，则删除数据表。
- `alter table table_name drop i`   修改数据表结构或字段信息，使用 drop 子句，删除 i 字段。
  - `alter table table_name add i int`
  - `alter table table_name add i int first`
  - `alter table table_name add i int after c`
  - `alter table table_name modify i char(35)`
  - `alter table table_name change old_column new_column char(35)`
  - `alter table table_name alter i drop default`  使用alter 命令和 drop 子句，删除字段默认值

  #数据增删改查命令

## 插入数据

- `insert into table_name (column_name1, column_name2 ...) values (value1, value2 ...)`   向表中插入新数据

## 查询数据

- `select column_name, column_name from table_name where clause limit n offset n`   查询语句

  ```sql
  select column_name, colulmn_name
  from table_name
  [ where clause ]
  [ offset m ] [ limit n ]
  ```

  #条件查询 `where` 子句
相关操作符 = ， <> != , > , < , >= , <= 。

```sql
select field1, field2, ... fieldN from table_name1, table_name2 ...
[ where condition1 [and [or] ] condition2 ... ]
```

  #模糊匹配 `like` 子句
`like` 子句必须用在 `where` 子句中， `like` 子句中使用 % 表示任意字符，类似于正则表达式中的 * , 如果没使用 % ， like 子句 与 = 的效果是等价的。

```sql
SELECT field1, field2,...fieldN 
FROM table_name1, table_name2...
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
```

  #排序 `order by`
使用 ORDER BY 子句来设定 按哪个字段哪种方式来进行排序，再返回查询结果。 `ASC` 升序， `DESC` 降序。可以添加 WHERE...LIKE 子句来设置条件。可以设定多个字段来排序。

```sql
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]
```

  #分组

## 删除数据

- `delete from table_name [where clause]`   删除表中满足指定条件的数据记录，如果没有 where 条件。表中的所有记录都会被删除。

## 更新数据（修改）

- `update table_name set field1 = new-value11, field2 = new-value2 [ where clause ]`   更新表中数据，可以同时更新一个或多个字段，可接受where 调价。

## 参考链接

- [MYSQL 命令行大全 (简洁、明了、全面)](http://blog.csdn.net/jin13277480598/article/details/52504592)
- []()