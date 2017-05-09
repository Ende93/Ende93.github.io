## What is Vue?
Vue 是 Vue.js 的简称，其是一个 javascript 的库，是一个 MVVM 库即是用来构建 UI 的库。和 jQuery 这种 API 库所不同的是，Vue 是以数据驱动的控制视图的，而不是散乱的，数据结构零散的。jQuery 的优秀在于提供了良好的 API 兼容性以及简单好用还能链式调用的操作 DOM 的方法，但是呢这些方法之间相互是没有关系的，不成体系的。

## Why i should use Vue or React?
1.在项目前期提供了框架，简单的事件绑定，不需要手动绑定了，能快速开发；

2.提供了组件，一套体系方便复用和维护；

3.可以使用集成了 Webpack 的脚手架，这样便于构建，大部分也不需要再重复配置了，社区一般也有可参照的；

4.直接的数据联系，可以从数据上预计到视图的变化，增强了可维护性;

5.不需要 html 和 js 及 css 分开写了，打包工具会解决，对于全局的样式、less 变量仍旧需要单独文件再引入。

## Vue 的一些笔记
### 数据绑定及响应
使用的是 getter、setter 来实现对数据变动的响应。所以对于 data 的直接属性是需要提前声明，否则其变量会没有 getter、setter 因而不能响应其变动。到目前为止，仅依靠 getter 的 Vue 是检测不到对象属性的变化（添加或者删除）。所以 Vue 有一个 set 静态方法，可以解决上述问题。

### 组件的循环引用
假设你正在构建一个文件目录树，像是 Finder 或文件资源管理器。你可能有一个 tree-folder 组件:
```
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```
还有一个 tree-folder-contents 组件：
```
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```
当你仔细看这两段代码时就会发现在渲染树上这两个组件同时为对方的父节点和子节点——这点是矛盾的。当使用 Vue.component 将这两个组件注册为全局组件的时候，Vue 会自动为你解决这个矛盾，如果你是这样做的，就不用继续往下看了。

然而，如果你使用诸如 Webpack 或者 Browserify 之类的模块化管理工具来导入组件的话，就会报错了：
`Failed to mount component: template or render function not defined.`
为了解释为什么会报错，简单的将上面两个组件称为 A 和 B ，模块系统看到它需要 A ，但是首先 A 需要 B，但是 A 又需要 B，这样就陷入了一个死循环，模块系统会不知道到底应该先获取哪个模块。而要解决这个问题，我们需要在其中一个组件中（比如 A ）告诉模块化管理系统：A 虽然需要 B ，但是不需要优先导入 B。

在我们的例子中，我们选择在tree-folder 组件中来告诉模块化管理系统循环引用的组件间的处理优先级，我们知道引起矛盾的子组件是tree-folder-contents，所以我们在beforeCreate 生命周期钩子中去注册它：
```
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}
```
这样问题就解决了。

### router-link 的 @click 问题
router-link 上绑定 @click 的话是不触发对应的方法的，解决办法一是使用 @click.native 即给元素绑定原生事件而不是 vue 包装的事件，但是会有一个小问题。就是这个原生点击事件会在路由跳转之后再触发，而不是路由跳转之前。所以，假如你需要在路由跳转之前执行的话，那么你应该再内嵌一个 span 之类的元素，绑定上 @click，这样就没问题了。

### keep-alive
文档中提到的是这个主要用于保留组件状态或避免重新渲染。但是却搞不清楚怎么保留的，什么时候保留，什么时候更新，另外其在函数式组件中不能正常工作，因为它们没有缓存实例，所以不要和 <router-view> 一起用。

值得注意的是 v-once 只会渲染一遍。但是组件的 beforeCreate 仍旧会调用。

TODO: 看看源码的实现