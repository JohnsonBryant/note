# 数组基础

数组的slice 方法：array.slice(start, end)，slice方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

  拷贝数组：效率远高于使用循环拷贝数组

  类数组对象转换为数组的方法：

```javascript
Array.prototype.slice.call({0:'a', 1:'b', length:2});
//['a','b']

Array.prototype.slice.call(document.querySelectorAll('div'));
Array.prototype.slice.call(arguments);
```

## 临时总结

数组的方法

静态方法

Array.isArray(arr)  判断对象是否是数组

实例方法

Array.prototype.valueOf()  返回数组本身

Array.prototype.toString()  返回数组的字符串形式

Array.prototype.length  返回数组的长度

Array.prototype.push(el)  在数组的最后添加元素，返回添加后数组的元素个数

Array.prototype.pop()  将数组的最后一个元素删除，并返回被删除的元素

Array.prototype.shift()  将数组的第一个元素删除，返回被删除的元素

Array.prototype.unshift(el)  在数字组的第一位添加一个元素，返回添加后数组的元素个数

Array.prototype.join(expr)  以指定参数为分隔符，将数组成员连接成字符串返回

Array.prototype.concat(arr[,arr1])  合并多个数组，将新数组的成员添加到原数组的后部，返回合并后的新数组，不改变原数组，可接受多个参数

Array.prototype.reverse()  反序数组，改变原数组，返回

Array.prototype.sort([fucntion(){}])  排序数组，可接收函数作为参数，定义数组排序规则

Array.portotype.slice(start, end)  提取数组的一部分，并形成新数组返回，不改变原数组
  应用：将类数组对象变成数组 Array.prototype.slice.call(arrayLike)
  克隆数组： arr.slice()

Array.prototype.splice(start, count, add1,add2)  切取数组的部分元素，形成新数组返回，并在切取位置添加新的元素，改变原数组

Array.prototype.indexOf()  获取元素在数组中第一次出现的位置，元素不存在返回-1，接收第二个参数，指定开始搜索的位置

Array.prototype.lastIndexOf  获取元素在数组中最后一次出现的位置，不存在返回 -1

Array.prototype.map()  接收函数作为参数，对数组中的每一项进行操作，并将执行结果添加进新数组，返回

Array.prototype.forEach()  接收函数作为参数，对数组中的每一项进行自定义操作，没有返回值

Array.prototype.filter()  接收函数作为参数，满足指定规则的所有数组项被添加进新数组返回
函数可接收三个参数 el 数组项, index 索引, arr 原数组。传址。可接收第二个参数，指定this

## 参考文档