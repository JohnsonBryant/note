# String

## 临时总结

string 对象

静态方法

String.prototype.fromCharCode()

实例方法

String.prototype.valueOf()

String.prototype.toString()

String.prototype.length  返回字符串长度

String.prototype.charAt(index)  返回指定位置的字符串，索引从0开始  

String.prototype.charCodeAt()  返回字符串指定位置字符的Unicode 码点

String.prototype.slice(start, end)  切取字符串的指定部分并返回，不该变源字符串

String.prototype.substring()  效果类似slice，优先使用slice

String.prototype.substr(start, len)  从原字符串去除子字符串并返回

String.prototype.trim()  去除字符串两端空白，并返回新字符串，不改变原字符串

String.prototype.indexOf(expr[,start])  查找指定字符在字符串中第一次出现的位置，可接受第二个参数，指定开始查找的位置

String.ptototype.lastIndexOf(expr[,start])  从字符串尾部开始匹配，查找指定字符出现的位置，第二个参数指定开始查找的位置

String.prototype.concat()  连接字符串，返回新的字符串，不该变原始字符串，可接受多个参数

String.prototype.split()  按照给定规则分隔字符串，返回一个由分割子字符串组成的数组，不改变原字符串。可以使用正则表达式作为参数

String.prototype.match()

String.prototype.search()

String.prototype.replace()

String.prototype.toLowerCase()  转换小写

String.prototype.toUpperCase()  转换大写