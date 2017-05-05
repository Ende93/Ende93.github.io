## touchstart/click 多次触发
可以通过 touchmove, touchend 来设置标识 isMoving，根据 isMoving 来决定 touchstart 是否执行

## 弹跳
```
new iScroll(ele, {
  bounce: false
})
```

## scrollEnd event
iscroll 的 scrollEnd 事件实际上是滚动停止的时候触发的，而不是滚动到末端触发的，所以要在 handler 里做个判断：
```
// iscroll 4
myScroll = new iScroll(ele, {
  onScrollEnd: function () {
  if(myScroll.maxScrollY == myScroll.y ) {
    // do something
  }
}
```
iscroll 5 的话使用 myScroll.on('scrollEnd') 即可
## refresh
当 iscroll 的容器有内容更新即内容高度变大的时候，需要调用 .refresh() 静态方法来更新，否则将不能滚动。
## 滚动与高度
iscroll 将其分为两层，一是 wrapper,二是 scroller。scroller 是发生滚动的元素，即 transform 变化的，而 wrapper 是 scroller 的容器。需要注意的是 scroller 是 wrapper 的第一个子元素，如果你要滚动的元素不是的话，那么就会滚动不了了。还有一种情况也会不能滚动，即是 wrapper 和 scroller 高度一致的情况。这两点是需要注意的。
