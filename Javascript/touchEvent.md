# TouchEvent 对象

## 事件对象的属性

### Touch

> TouchEvent.touch 对象代表一个触点，通过 event.touches[0]获取，每个触点包含位置，大小，形状，压力大小，和 element 属性。

```javascript
{
  screenX: 511,
  screenY: 400, //触点相对于屏幕顶部的Y坐标
  clientX: 189.3820037841797,
  clientY: 189.3820037841797, //相对于可是区域
  pageX: 189.37,
  pageY: 189.37, //相对于HTML文档顶部，当页面有滚动的时候 clientX 和 clientY 不相等
  force: 1, //压力大小，是从0.0(没有压力)到1.0(最大压力)的浮点数
  identifer: 1036403715,  //一次触摸动作的唯一标识符
  radiusX: 37.565673828125,
  radiusY: 37.565673828125, //能够包围用户和触摸平面的接触面的最小椭圆的垂直轴（Y轴）半径
  rotationAngle: 0, //角度值：由 radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能精确的覆盖住用户和触摸平面的接触面
  target: {}  //此次触摸事件的目标 element
}
```

### TouchList

> 由touch 对象构成的数组，event.touches 取得。一个touch 对象代表一个触点，当多个手指触摸屏幕时，会存储多个touch 对象，identtifier 可以用来区分每个触点对应的touch 对象

### TouchEvent

TouchEvent就是用来描述手指触摸屏幕的状态变化事件，除了一般DOM事件中event对像具备的属性，还有一些特有的属性

### touches

一个TouchList对象，包含当前所有接触屏幕的触点的Touch对象，不论 touchstart 事件从哪个elment上触发。

### targetTouches

也是一个TouchList对象，包含了如下触点的 Touch 对象：touchstart从当前事件的目标element上触发

### changedTouches

也是一个 TouchList 对象，对于 touchstart 事件, 这个 TouchList 对象列出在此次事件中新增加的触点。对于 touchmove 事件，列出和上一次事件相比较，发生了变化的触点。对于 touchend ，列出离开触摸平面的触点（这些触点对应已经不接触触摸平面的手指）。

touchend这里要特别注意，touches和targetTouches只存储接触屏幕的触点，要获取触点最后离开的状态要使用changedTouches。

之前也经常用touches[0]来获取Touch 对象，如果知道了 touches，targetTouches,changedTouches 的不同之处。在编写代码时可以更好的选择使用，程序也可以更严谨。

## 参考链接

- [移动端 Touch 事件介绍](http://caibaojian.com/mobile-touch-event.html)