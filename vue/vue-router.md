# vue-router 路由

> 使用路由：将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们

- cdn 使用：在vue.js 引入之后，引入vue-router.js

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

```

## 使用路由

> 注入路由后，可以通过在组件内部 **this.$router** 访问当前路由对象

通过在 Vue 根实例的 router 配置传入 router 实例，下面这些属性成员会被注入到每个子组件。

- $router: router 实例
- $route: 当前激活的路由信息对象。只读。

 #路由信息对象: 在组件内，通过 this.$route 获取对象

>一个 route object（路由信息对象） 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）。 route object 出现在多个地方:

 #路由信息对象属性
- $route.path
  - **String** , 字符串，对应当前路由的路径，解析为绝对路径，如"/foo/bar"
- $route.params
  - **Object** , key/value对象，包含了动态片段和全匹配片段，如果没有路由参数，则为空对象
- $route.query
  - **Object** , key/value对象，URL查询参数。如果没有查询参数，则为空对象
- $route.hash
  - **String**, 当前路径的Hash 值，没有hash，为空字符串
- $route.fullPath
  - **Srting**, 完成解析后的URL，包含查询参数和 hash 的完整路径
- $route.matched
  - **Array`<RouteRecord>`**
- $route.name
  - 当前路由名称，如果设置了。

```javascript
// 定义路由,每个路由应该映射一个组件。 其中"component" 可以是通过Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 创建 router 实例，然后传 `routes` 配置（必须使用 routes 配置） ，还可以传别的配置参数
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 创建和挂载根实例，必须 通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
  router  //缩写，在vue中相当于 router: router
}).$mount('#app')
```

## 动态路由匹配 - routes 配置

> 将某种模式匹配到所有路由，全部映射到同个组件。使用动态路由参数(dynamic segment) 实现

- 路由参数使用冒号 : 标记，当匹配到一个路由时，参数会被设置到 `this.$route.params`，可以在每个组件内使用。
- 可以在一个路由中设置多段 路径参数，对应值都会设置到 `$route.params` 中
  - `/user/:username/post/:post_id` , `$route.params {user: 'john', post: '123'}`

```javascript
const User = {
  template: '<div>User  {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})

//像 /user/foo 和 /user/bar 都将映射到相同的路由
//<router-link to="/user/foo"> User <router-link>
//<router-link to="/user/bar"> User <router-link>
```

 #响应路由参数变化
当时用动态路由参数时，例如从组件 **/user/foo** 导航到组件 **/user/bar** ,时，**原来的组件实例会被复用**，导致组件的**生命周期钩子不会被再次调用**。复用组件时，需要对路由参数的变化做出响应时，可以 watch （监测变化）`$route` 对象 , 又或使用 **beforeRouteUpdate**,

```javascript
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  },
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

## 嵌套路由 - 嵌套视图 - routes 配置

>URL 中各段动态路径也按某种结构对应嵌套的各层组件， 一个被渲染组件同样可以包含自己的嵌套 `<router-view>`， 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: 'user/:id', component: User,
      children: [
        // 当访问 /user/foo时，匹配 空的子路由
        // UserHome 会被渲染在 User  的 <router-view> 中，
        {
          path: '',
          component: UserHome
        },
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        {
          path: 'profile',
          component: UserProfile
        },
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        {
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
});
```

## 编程式导航

- router.push()
  - 该方法的参数可以是一个字符串路径，或者一个描述地址的对象。注意：如果提供了 `path` ，`params` 会被忽略。
  ```javascript
  // 字符串
  router.push('home')
  // 对象
  router.push({ path: 'home' })
  // 命名的路由
  router.push({ name: 'user', `params`: { userId: 123 }})
  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }}

  const userId = 123
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  router.push({ path: `/user/${userId}` }) // -> /user/123
  // 这里的 params 不生效
  router.push({ path: '/user', params: { userId }}) // -> /user
  ```
- router.replace()
- router.go(n)

点击 **`<router-link :to="...">` 等同于调用 router.push(...)。**

## 命名路由 - routes 配置

 >通过一个名称来标识一个路由，在 **routes** 配置中给某个路由设置名称 **name** 属性

 要链接到一个命名路由，可以给 `route-link` 的 to 属性传一个对象：和调用 `router.push()` 同样效果
 ```html
 <router-link :to="{ name: 'user', params: {userId: 123} }"> User <router-link>
   <!-- 路由导航到 /user/123/ 路径 -->
 ```
 ```javascript
  const router = new VueRouter({
    routes: [
      {
        path: '/user/:userId',
        name: 'user',
        component: User
      }
    ]
  });
 ```

## 命名视图 - routes 配置

> 同时（同级）展示多个视图，而不是嵌套展示。比如创建布局。通过命名视图，在同一界面拥有多个单独命名的视图。 **name** 属性，未设置 name ,默认为default

一个视图使用一个组件渲染，因此同个路由，多个视图需要多个组件，使用`components` 配置

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## 重定向和别名 - routes 配置

 #重定向 ：通过routes 配置完成
 ```javascript
 // 从 /a 重定向到 /b
 const router = new VueRouter({
   routes : [
     {path: '/a', redirect: '/b'}
     // 重定向到命名路由
     {path: '/a', redirect: {name: 'foo'}}
     // 方法，动态返回重定向目标
     {path: '/a', redirect: to => {
       // 方法接收 目标路由 作为参数
       // return 重定向的 字符串路径 / 路径对象
     }}
   ]
 })
 ```

 #别名 ： 通过 routes 配置
 > /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。  `routes` 配置，属性 `alias`

 ```javascript
 const router =  new VueRouter({
   routes: [
     {path: '/a', component: A, alias: '/b'}
   ]
 });
 ```

## 路由组件传参

> 在组件中使用 `$route` 对象会使组件 和 对应路由形成 高度耦合，使组件只能在特定 URL 上使用，限制了灵活性。 使用 `props` 将组件 和 路由解耦：

```javascript
// 组件 与路由耦合
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

// 通过 props 解耦
//如果 props 被设置为 true，route.params 将会被设置为组件属性。
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

## 路由 HTML标签

```html
  <!-- 使用 router-link 组件来导航. -->
  <!-- 通过传入 `to` 属性指定链接. -->
  <router-link to="/foo">Go to Foo</router-link>
  <router-link to="/bar">Go to Bar</router-link>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
```

- `<router-view>` **组件**是一个 functional 组件，渲染路径匹配到的视图组件。 `<router-view>` 可以内嵌自己的 `<router-view>` ，根据嵌套路径，渲染嵌套组件。
  - name 属性，默认为 default ,设置了 name 属性的 `<router-view>` 组件，会渲染对应的路由配置中，**components** 下相应的组件。
  ```html
  <!-- 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）： -->
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view>
  ```
  ```javascript
  const router = new VueRouter({
    routes: [
      {
        path: '/',
        components: {
          default: Foo,
          a: Bar,
          b: Baz
        }
      }
    ]
  })
  ```

## 参考链接

- [vue-router - gitbook](https://router.vuejs.org/zh-cn/advanced/transitions.html)
- []()
- []()
- []()
- []()