[原文：Preparing for a Front-End Web Development Interview in 2017 by David Shariff](http://davidshariff.com/blog/preparing-for-a-front-end-web-development-interview-in-2017/#first-article)

在最近这几年里，我在亚马逊和雅虎面试了许多专注于前端开发的 Web 开发者和软件工程师。在这篇文章中，我想分享一些能帮助大家更好地准备面试的点。

> 声明：本文并没有罗列出以有在前端面试中可能遇到的问题，但你可以将其视为知识基准。

面试是很难的，作为候选人，你通常需要45分钟的时间来展示你能做什么。而作为面试官，也很难在这么短的时间内评估出这个人是不是适合。因为天下间没有唯一的面试标准，因此通常要求面试官从给定的一个范围里评判，除了提出的问题是由他们自己决定的。

我将从双方的角度出发，作为面试自己的面试官，尽量去覆盖所有重要的在面试中你可能会被问到的前端开发领域。

## 常见的误解

过去我看到面试者所犯的最大的错误之一是没有准备好应付琐碎的问题，如“什么是盒子模型？”或者“告诉我在JavaScript 里 == 和 === 之间的区别？”。虽然知道这些问题的答案很好的，但实际上并没有真正告诉面试官多少面试者的水平。

因为，你可能面对的是一个更现实些的面试——使用JavaScript，CSS 和 HTML 编写代码。在面试中被要求实现一些 UI，或构建一个小部件，或者根据一个库（如Lodash 和 Underscore.js）来编写常用的工具类函数。 例如下面这些：

1. 构建通用 Web 应用程序的布局和交互，如 Netflix 网站。
2. 实现小部件，如日期选择器，轮播或购物车。
3. 写一个类似于 debounce 的功能或者深度复制一个对象。

说到库，我常常看到的另一个错误是面试者完全依靠最新的框架来解决面试问题。你可能会想，如果我在实际开发中可以使用jQuery，React，Angular 等等，哪我为什么要重新造轮子呢，为什么不能在面试中使用呢？但是实际上呢，技术，框架和库都会随着时间的推移而变化——因此我更有兴趣看到你知道前端开发的基本原理，而不是依赖于更高层次的抽象。如果你无法回答面试问题，我希望你至少能够彻底解释和理解这些库到底在做些什么。

总的来说，你要明白的是大部分面试问的都是非常实际的编程问题和实在的问题。

## JavaScript

你需要知道 JavaScript 并且需要了解它的里里外外。你所面试的职位的级别越高，在该语言的知识就需要越深。 至少，下面列出的 JavaScript 主题应该知道：

1. 执行上下文，特别是词法作用域（lexical scope）和闭包。
2. 声明提升，函数与块作用域和函数表达式与声明。
3. 绑定——特别是 call，bind，apply 和词法 this（lexical this）。
4. 对象原型，构造函数和混合。
5. Composition and high order functions.
6. 事件委托和冒泡。
7. 类型判断（type coercion），使用typeof，instanceof和Object.prototype.toString。
8. 使用回调函数，Promise，await 和 async 处理异步调用。
9. 何时使用函数声明和表达式。
## DOM

知道如何遍历和操纵 DOM 是很重要的，然而大多数面试者强调他们一直依赖于 jQuery 或者最近一直在撰写很多 React ＆ Angular 类型的应用程序。在日常工作中你不太可能会这样做，因为我们大多数人正在使用抽象的类型，但是在不使用库的情况下，你应该知道如何执行以下操作：

1. 使用 `document.querySelector` 或旧浏览器 ` document.getElementsByTagName` 选择或查找节点。
2. 上下遍历——Node.parentNode, Node.firstChild, Node.lastChild 和 Node.childNodes。
3. 左右遍历——Node.previousSibling 和 Node.nextSibling。
4. 操作——在 DOM 树里添加，删除，复制，创建节点。你还应该知道如何改变一个节点的文本内容和切换，删除或添加一个 CSS 类名.
5. 性能——拥有大量节点的时候操作 DOM 的代价是昂贵的，你至少要知道 document fragments 和节点缓存。
## CSS

At a minimum, you would be expected to know how to layout elements on a page, how to target elements using child or direct descendant selectors and when to use classes vs IDs.

Layout – sitting elements next to each other and how to place elements in two columns vs three columns.
Responsive design – changing an element’s dimensions based on the browser width size.
Adaptive design – changing an element’s dimensions based on specific break points.
Specificity – how to calculate a selector’s specificity and how the cascade affects attributes.
Appropriate namespacing and naming of classnames.
## HTML

Knowing which HTML tags that best represent the content you are displaying and associated attributes should be back of the hand knowledge.

Semantic markup.
Tag attributes, such as disabled, async, defer and when to use data-*.
Knowing how to declare your doctype (most people are not writing new pages every day and forget this) and what meta tags are available to use.
Accessibility concerns, for example, making sure an input checkbox has a larger responding area (use label “for”). Also, role=”button”, role=”presentation”, etc.

System Design

System design interviews for folks working on the backend typically involve MapReduce, designing distributed key-value stores or require knowledge of CAP theorem and the likes. While your everyday front-end engineer shouldn’t need to have in-depth knowledge of how to design such systems, you shouldn’t be surprised when asked to design the front end architecture of common applications. These questions are usually vague, along the lines of “design a site like Pinterest” or “tell me how you would build a shopping checkout service?”. Below are areas to think about:

Rendering – client-side (CSR), server-side (SSR) and universal rendering.
Layout – if you’re designing a system used by multiple development teams, you need to think about building components and if you require teams to follow a consist markup to use said components.
State management such as choosing between unidirectional data flow or two-way data binding. You should also think about if your design will follow a passive or reactive programming model, and how components related to each other for example Foo–> Bar or Foo –>Bar.
Async flow – your components may need to communicate in real-time with the server. The design you propose should consider XHR vs bidirectional calls. If your interviewer asks you to support older browsers, your design will need to choose between hidden iFrames, script tags or XHR for messaging. If not, you could propose using websockets or you might decide server-sent events (SSE) are better.
Separation of concerns – Model-View-Controller (MVC), Model-View-ViewModel (MVVM) and Model-View-Presenter (MVP) patterns.
Multi-device support – Will your design use the same implementation for the web, mobile web, and hybrid apps or will they be separate implementations? If you were building a site like Pinterest, you might consider three columns on the web but only one column on mobile devices. How would your design handle this?
Asset delivery – In large applications, it’s not uncommon to have independent teams owning their own codebases. These different codebases probably have dependencies on each other and each usually has their own pipeline to release changes to production. Your design should consider how assets are built with dependencies (code splitting), tested (unit and integration tests) and deployed. You should also think about how you will vend assets through a CDN or inline them to reduce network latency.
Front end system design is a large topic that deserves more attention and I plan to write another blog post dedicated to it.

Web Performance

In addition to general programming best practices, you should expect for interviewers to look at your code or design and its performance implications. It used to be enough to put CSS at the top of a document and JS scripts at the bottom of a page but the web is moving fast and you should be familiar with the complexities in this space.

Critical rendering path.
Service workers.
Image optimizations.
Lazy loading and bundle splitting.
General implications of HTTP/2 and server-push.
When to prefetch and preload resources.
Reduce browser reflows and when to promote an element to the GPU.
Differences between the browser layout, compositing and painting.
Data Structures & Algorithms

This is probably controversial but having a basic understanding of Big-O time complexities and common runtimes such as O(N) and O(N Log N) won’t hurt you. Single page apps are more common now and understanding things like memory management helps. For example, if you were asked to build a client-side spell checker, knowing common data structures and algorithms is going to make your life a lot easier.

I’m not advocating you need a CS degree, but the industry has moved on from building simple web pages. There are a lot of resources online where you can pick up the basics fairly quickly.

General Web Knowledge

You will be expected to have a grasp of the technologies and paradigms that make up the web.

HTTP requests – GET and POST along with associated headers such as Cache-Control, ETag, Status Codes, and Transfer-Encoding.
REST vs RPC.
Security – when to use JSONP, CORs, and iFrame policies.
Summary

Being a developer or engineer building for the web requires a lot of knowledge. Don’t be phased by the depth of knowledge needed but keep an open mind to learning all the intricate pieces that make up the final end product your customers will use.

In addition to the technical topics covered here, you will be expected to talk about your past projects, describe interesting situations and the trade-offs you made.

I’m sure I’ve missed many areas of a front-end interview, I’d love to hear your experiences or let me know if I’ve missed anything of importance that you see being asked these types of interviews.

Thanks to ShihChih Huang of Facebook and Preethi Kasireddy of Coinbase for reviewing this post before publishing.