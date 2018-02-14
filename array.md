# 数组相关的常用算法

## 实现数组去重的几种方法

### 第一种方案

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

### 第二种方案

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

### 第三种方案

> 原理：对象的不存在的属性，对应值为undefined，将数组中的项添加为对象属性，通过对象属性，对数组项进行筛除，从而创造出新的不含重复值的数组

```javascript
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

### 第四种方案

> 说明：运用递归，先sort排序，再通过递归splice 删除重复项

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

> 说明：利用ES6 新增方法 indexOf

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

方案二：

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

## 实现数组排序的几种方法

> 快速排序[quicksort](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)

```javascript
var quickSort = function (arr){
    if(arr.length <= 1){ return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [], right = [];
    for(var i = 0; i < arr.length; i++){
        if (arr[i] < pivot){
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
```