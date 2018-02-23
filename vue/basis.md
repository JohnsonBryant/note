# vue 笔记

{{ text }} 模板语法，绑定数据

v-bind 数据绑定 绑定属性：v-bind:value  简写 :href

v-if v-else v-else-if key

v-show

v-model 表单输入和数据双向绑定

- 计算属性：复杂的逻辑计算，使用计算属性
  - 计算属性缓存 vs 方法：方法可以和计算属性达到同样的效果。
    - 不同点是，计算属性是基于依赖进行缓存的，计算属性只有在依赖数据发生变化时，才会重新执行；依赖没变化，会立即返回缓存的之前结果。
    - 每当发生重新渲染 updated,调用方法将总会再次执行函数。
    - 对于开销性能较大的依赖数据，建议使用计算属性。通过缓存，节省性能。
  - 计算属性 VS 侦听属性

自定义指令：

自定义过滤器： 常见的文本格式化，应用场景，如下两种：

- 花括号插值
- v-bind 表达式
- 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

全局定义：`Vue.filter('myFilter', function(){})`

组件内局部定义：`filters: { myFilter: function(){} }`