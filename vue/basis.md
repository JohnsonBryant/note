# vue 笔记

绑定属性：v-bind:value  简写 :href

v-if v-else v-else-if key

v-show

## 组件

直接在开发环境（浏览器）使用vue.js，组件的注册必须在实例vue对象之前。实例对象的中可直接使用组件

```javascript
Vue.component('todo-item',{
        props:['todo'],
        template: '<li>{{ todo.text }}</li>'
    });
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'hello world.',
            groceryList: [
                { id: 0, text: '蔬菜' },
                { id: 1, text: '奶酪' },
                { id: 2, text: '随便其它什么人吃的东西' }
            ]
        }
    });
```