# vue 组件

## 组件

> 简介：
- 组件可以拓展HTML元素，封装可重用的代码。
- 组件是自定义元素，vue.js编译器为组件添加特殊功能。
- 组件也可以表现为用 **is** 特性进行了拓展的原生HTML 元素
- 组件是 Vue 的实例，可接受相同的选项对象（除了根级特有选项），并提供相同的生命周期钩子。
- [官方文档 - vue 组件](https://cn.vuejs.org/v2/guide/components.html)

### 1、注册组件

#### 1、1全局注册

注意：自定义标签的命名：最佳实践 - W3C规则（小写，短横线分隔），vue不强制自遵循该规则。

```javascript
Vue.component('my-component', {
    //选项
})
```

注意：组件注册**后**，可作为自定义元素 `<my-component></my-component>` 在实例模板中使用。**确保**在根实例初始化之前注册组件：

```javascript
//注册全局组件
Vue.component('my-component', {
    template: '<div>a custom component.</div>'
})
//初始化根实例
new Vue({
    el: '#app'
})
```

#### 1、2局部注册

通过某个Vue 实例 / 组件的实力选项 components 注册仅在其作用域内可用的组件。类似封装，局部指令。

#### 1、2、1 data 属性必须是函数

构造Vue 实例时传入的多数选项都可以在组件里使用，**特例**：data 必须是函数。

#### 1、2、2 组件组合、通信

- **props 向下传递**，**事件向上传递**。父组件(实例)通过props 给子组件下发数据，子组件通过事件，向父组件发送消息。

##### 1、2、3 #使用Props 父组件向子组件传递数据

- 组件实例的作用域是孤立的，不能在子组件的模板内直接引用父组件的数据。
- 子组件要显示的用 **props** 选项声明 子组件预期的数据，调用子组件是，通过预期定义的属性，传递数据给子组件。
- HTML 属性是不区分大小写的，所以当props 定义使用驼峰命名时，向子组件传数据时，需要携程短横线分隔式命名。

```javascript
Vue.component('child', {
    props: ['msg','text'],
    template: '<span>{{ msg }}</span>'
})
```

```html
<child msg="hello" v-bind:text="parentMsg"></child>
```

传递**动态props 值**：与绑定其他HTML属性类似，使用v-bind 动态将指定prop 绑定到父组件的数据。每当父组件数据变化时，改变化都会体现到子组件上。

如果需要将一个对象的所有属性作为**prop**传递，使用不带任何参数的 v-bind 绑定

注意：**字面量语法 和 动态语法**

```html
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>

<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>
```

 #单项数据流
> prop 是单项绑定的：父组件向子组件传递变化。
- 每次父组件更新，子组件所有的prop 都会更新为最新值。**不应该在子组件内部改变Prop 的值**

 #prop 验证
> 可以指定组件的 prop 指定验证规则，如果传入的数据不符合要求，Vue会发出警告。
指定验证规则，需要用对象形式定义 prop，不能使用字符串数组：

```javascript
Vue.component('example', {
    props: {
        //基础类型检测(`null` 指允许任何类型)
        propA:Number,
        //可能是多种类型,字符串或数字
        propB: [String,Number],
        //必传 且是字符串
        propC: {
            type: String,
            required: true
        },
        //数值 且有默认值
        propD: {
            type: Number,
            default: 100
        },
        //数组/对象的默认值应当由一个工厂函数返回
        propE: {
            type: Object,
            default: function(){
                return {message: 'hello'}
            }
        },
        //自定义验证函数
        propF: {
            validator: function(value){
                return value > 10
            }
        }
    }
})
```

 注意：**type** 可以是所有的原生JavaScript 构造器： String、Number、Boolean、Function、Object、Array、Symbol

 prop 验证失败，Vue会抛出警告（开发版）。prop会在组件实例**创建之前**验证，所以default 和 validator 函数里，data computed methods 等实例属性无法使用。

- **非Prop 特性**

非prop 特性，可以直接传入组件，而不需要定义对应的prop。 组件可以接收任意传入的特性，这些特性会被添加到组件的**根元素**上。

- **#替换 / 合并现有的特性**

##### 1、2、4  自定义事件 - 子组件向父组件发送消息

- 使用 $on(eventName) 监听事件
- 使用 $emit(eventName) 触发事件

父组件在使用子组件的地方，直接用 **v-on** 监听子组件触发的自定义事件。

#### 2、使用插槽分发内容

- 内容分发：组件组合，规定的方式，混合父组件的内容与子组件自己的模板。
- vue 内容分发API， 使用特殊的 `<slot>` 元素作为 **原始内容** 的插槽

编译作用域：
  > 父组件模板的内容在父组件作用域内编译； 子组件模板的内容在子组件作用域内编译。绑定子组件作用域内的指令到一个组件的根节点，应当在子组件自己的模板里做。

```html
<child-component>  {{ message }}   </child-component>
<!-- message 应该绑定到父组件的作用域 -->
```

插槽：

- 除非子组件内包含至少一个 `<slot></slot>` 插口，否则父组件插入子组件自定义标签内的内容将会被丢弃。
- 当子组件模板 只有一个 没有属性的插槽时，父组件传入的所有内容片断，将插入到插槽所在的DOM位置，并替换掉插槽标签。
- 最初在 `<slot></slot>` 标签中的内容，被视为**备用内容**。备用内容在子组件作用域内编译，且只在 *宿主元素* 为空，且没有要插入的内容时，才显示。

具名插槽：有属性的插槽

- `<slot>` 元素用 name 属性，配置如何分发内容。具有插槽将匹配内容片段中，有对应 slot 特性的元素。
- 有具名插槽时，任然可以有一个没有 name 属性的匿名插槽，作为**默认插槽**，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，找不到匹配的内容部分，将不会显示。
- 设计组合使用的组件时，常用内容分发API机制

```html
<h1 slot="header"></h1>

<slot name="header"></slot>
```

编写可复用的组件
>一次性组件间可以紧密耦合，可复用组件，应定义清晰的公开接口，不对其使用的外层数据做出任何假设。

vue 组件API：prop - 事件 - 插槽：

- prop 允许外部环境向组件传递数据
- 事件，允许从组件内部触发外部环境的副作用，向父组件传递消息
- 插槽：允许外部环境将额外内容组合到组件中

子组件的引用：
> 用于在 javascript 中直接访问子组件。 使用属性 ref 为子组件指定 引用id

```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```

```javascript
var parent = new Vue({ el: '#parent' })
// 访问子组件实例
var child = parent.$refs.profile
```

组件的命名：

- 注册组件（或者prop）时，可用 kebab-case（短横线分隔命名）、camelCase（驼峰命名）或PascalCase（首字母大写命名）
- HTML模板中调用时，使用 kebab-case（短横线分隔命名）
- PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。