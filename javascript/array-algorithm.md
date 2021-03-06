# 数组相关的常用算法

## 实现数组去重的几种方法

### 第一种方案--常用

> 两层循环，外层循环作为基准，内层循环做比较，当内层做完整循环，没有与外层当次循环数组项相同的，则添加该项至result,内层循环一次完整循环内，如果遇到与外层相同的,则外层循环跳过该数组项（通过修改i控制）

```javascript
Array.prototype.myUnique = function() {
    var tmpArr = this, result = [], i, j, len = tmpArr.length;
    for( i = 0; i < len; i++ ){
        for( j = i + 1; j < len; j++ ){
            if(tmpArr[i] === tmpArr[j]) { j = ++i; }
        }
        result.push(tmpArr[i]);
    }
    return result;
}
```

### 第二种方案--数据较小时适合使用

> 原理说明：利用数组的 splice方法，两次循环，内层遍历到与当前外层循环相同的项时，利用splice删除该项。

此方法直接作用于被操作的数组对象，且有返回值，等于被操作后的对象。

缺点：内存占用高，速度慢

优点：原理简单易懂

```javascript
Array.prototype.myUnique = function() {
    var arr = this, i, j, len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return arr;
}
```

### 第三种方案--速度快

> 原理：对象的不存在的属性，对应值为undefined，将数组中的项添加为对象属性，通过对象属性，对数组项进行筛除，从而创造出新的不含重复值的数组

优点：执行速度快；  缺点：占用内存较多
**注意** 存在缺陷，判断是否为js对象的键时，对象所有的键都是字符串，可以省略 " " ，会自动对传入的键执行toStirng()，不同的键可能会被误认为一样，如 obj[1] 和 obj["1"]

```javascript
//无法判断 1 和 "1" 的区别，会认为是重复项，忽略后出现的
Array.prototype.myUnique = function() {
    var arr = this, i, j, len = arr.length, obj = {}, res = [];
    for (i = 0; i < len; i++) {
        if( !obj[arr[i]] ) {
            res.push(arr[i]);
            obj[arr[i]] = 1;
        }
    }
    return res;
}
```

```javascript
//处理了js对象在判断键时，会自动对传入的键进行toString()操作，避免出现错误判断 1 和 "1" 的问题
//使用了数组的 indexOf() 方法，兼容性问题（IE8及以下）
Array.prototype.myUnique = function() {
    var obj = {}, res = [], len = this.length, type, val;
    for (var i = 0; i < len; i++){
        val = this[i];
        type = typeof this[i];
        if( !obj[val] ) {
            obj[val] = [type];    //划重点
            res.push(val);
        } else if ( obj[val].indexOf(type) < 0) {
            obj[val] = [type];
            res.push(val);
        }
    }
    return res;
}
```

### 第四种方案--纯数字数组适合使用

> 说明：运用递归，先sort排序，再通过递归splice 删除重复项

**bug说明**，对于纯数字数组可以正常实现，但当数组出现类似 [1,"1",1,2,"2",2,3,"3",3,4,"4",4] 数据结构时，无法正常实现。

```javascript
Array.prototype.myUnique = function () {
    var arr = this, len = arr.length;
    arr.sort(function (a, b){
        return a - b;
    })
    function loop(index) {
        if(index >= 1){
            if(arr[index] === arr[index-1]) {
                arr.splice(index, 1);
            }
            loop(index - 1);
        }
    }
    loop(len - 1);
    return arr;
}
```

### 第五种方案

> 说明：利用ES6 新增数组方法 indexOf()

方案一：

```javascript
Array.prototype.myUnique = function () {
    var arr = this, res = [], len = arr.legth;
    arr.forEach(function (v, i, arr) {
        if (arr.indexOf(v, i+1) === -1) { res.push(v) };
    })
    return res;
}
```

方案二： 对IE8 等老式浏览器不支持 indexOf 方法做兼容处理

```javascript
function unique (array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++){
        if (res.indexOf(array[i]) === -1) { res.push(array[i]) };
    }
    return res;
}
if ( !Array.prototype.indexOf ){
    Array.prototype.indexOf = function (item){
        var res = -1, a_item = null;
        if(this.length === 0){
            return result;
        } else {
            for(var i = 0, len = this.length; i < len; i++){
                a_item = this[i];
                if (a_item === item){
                    result = i; break;
                }
            }
        }
        return result;
    }
}
```

### 数组合并并去重

1、concat 方法，说明，先合并数组，再对新合并后得到的数组进行上面的去重操作

2、Array.prototype.push.apply()

```javascript
function concatArray(arr1, arr2) {
    Array.prototype.push.apply(arr1, arr2);
    arr1 = unique(arr1);
    return arr1;
}
```

## 实现数组排序的算法

### 1、快速排序[quicksort](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)

> 算法描述

（1）在数据集之中，选择一个元素作为"基准"（pivot）。

（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

  注意：slice方法拷贝数组，运行效率比使用循环拷贝高很多。

```javascript
var quickSort = function (arr){
    var tmpArr = arr.slice();   //返回参数数组的拷贝，达到不修改原数组的目的

    if(tmpArr.length <= 1){ return tmpArr; }
    var pivotIndex = Math.floor(tmpArr.length / 2);
    var pivot = tmpArr.splice(pivotIndex, 1)[0];
    var left = [], right = [];
    for(var i = 0; i < tmpArr.length; i++){
        if (tmpArr[i] < pivot){
            left.push(tmpArr[i]);
        } else {
            right.push(tmpArr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
//拓展数组对象原型方法
Array.prototype.quickScort = function(arr) {
    var tmpArr = arr.slice(), len = tmpArr.length;

    if(len <= 1) { return tmpArr};
    var pivotIndex = Math.floor(len / 2);
    var pivot = tmpArr.splice(pivotIndex, 1)[0];
    var left = [], right = [];
    for(var i = 0; i < len-1; i++) {
        if (tmpArr[i] < pivot) {
            left.push(tmpArr[i]);
        } else {
            right.push(tmpArr[i]);
        }
    }
    return Array.prototype.quickScort(left).concat([pivot], Array.prototype.quickScort(right))
}
```

### 2、冒泡排序(bubble Sort)

> 算法描述

<1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；

<2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；

<3>.针对所有的元素重复以上的步骤，除了最后一个；

<4>.重复步骤1~3，直到排序完成。

```javascript
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j =0; j < len-1-i; j++) {
            if(arr[j] > arr[j+1]) {   //对比相邻两元素
                var tmp = arr[j+1];   //元素交换
                arr[j+1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
```

### 3、选择排序（Selection Sort）

> 算法说明：选择排序，是一种简单直观的排序算法。原理：首先在未排序序列中找到最小（大）元素，存放在排序序列的起始位置，再从剩余未排序元素中找出最小（大）的，放到已排序序列的末尾，以此类推，知道排序完毕。

```javascript
function selectionSort(arr) {
    var len = arr.length, minIndex, tmp;
    console.time("排序耗时");
    for (var i = 0; i < len-1; i++){
        minIndex = i;
        for (var j = i+1; j< len; j++){
            if (arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        tmp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = tmp;
    }
    console.timeEnd("排序耗时");
    return arr;
}
```

### 4、插入排序 Insertion Sort

> 说明：

```javascript

```

## 参考链接

- [阮一峰先生-快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)
- [JavaScript十大经典排序算法--CSDN](http://blog.csdn.net/u013063153/article/details/52667542)
- [js数组去重算法实现](https://zhuanlan.zhihu.com/p/20166261)
- [JS实现数组去重方法总结(六种方法)](http://www.jb51.net/article/118657.htm)