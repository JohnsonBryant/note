# 注意事项

computed 计算属性中定义的代码，在实例挂载完成会被执行一次，一个计算属性方法中只绑定一个根实例的数据对象，当绑定多个数据对象时，每一个数据对象的变化都会引起计算属性方法的执行，导致无法正常控制。

计算属性：只处理复杂的逻辑运算，尽量不与方法混用，不涉及样式的更改，只处理根实例的数据对象

 #实现**图片动态加载**的问题？
 #暂时实现方案
 图片动态加载：暂时解决办法，将图片放到 src 同级目录 static 文件夹下，通过相对路径引入图片，在data中定义数组存放图片路径，可以正常绑定img对象的src属性，实现动态加载

绝对路径示例：'http://localhost:8080//static/img/003_d7sx.2922b88.jpg' ，绝对路径没有解决问题。

相关参考链接：

- [vue.js 如何正确处理图片路径](https://segmentfault.com/q/1010000007930232)
- [vue-cil和webpack中本地静态图片的路径问题解决方案](https://www.cnblogs.com/xiaojingyuan/p/7080768.html)
- [vue 动态加载图片src的解决办法](http://blog.csdn.net/Mr_YanYan/article/details/78783091)
- []()
- []()

## CSS 相关问题

css 中图片的引入路径问题