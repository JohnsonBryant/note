# 变量的结构赋值 #
------
> 简介：ES6允许按照一定的模式，从数组和对象中提取之，对变量进行赋值，成为结构（Destructuring）.
## 1. 数组的结构赋值 ##
- **基本用法**：从数组中提取值，按照对应位置，对变量赋值。***本质上属于模式匹配批***
```javascript
	let [a,b,c] = [1,2,3];
	//a = 1; b=2; c=3;
```
- **解构不成功**，变量的值就等于***undefined***，以下两种情况，变量foo的值都是***undefined***
```
let [foo] = [];
let [boo,foo] = [1];
```
- **不完全解构**，依然可以解构成功。等号的左边的模式，只匹配一部分的等号右边的数组。
```
let [a,b] = [1,2,3];
let [a,[b],d] = [1,[2,3],4];  //a=1;b=2;d=4;
```
- **默认值**
```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```  
注意ES6内部使用严格相等运算符（===），判断（数组）一个位置是否有值，只有当数组成员严格等于***undefined***，默认值才会生效。

默认值可以引用解构赋值的其他变量，但该变量必须已经提前声明。

## 2. 对象的解构赋值
```
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

**如果变量名与属性名不一致**，必须写成下面这样。
```
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
对象的解构赋值是下面形式的简写：对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```