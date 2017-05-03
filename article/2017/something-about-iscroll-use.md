## touchstart/click 多次触发

可以通过 touchmove, touchend 来设置标识 isMoving，根据 isMoving 来决定 touchstart 是否执行

## 弹跳

new iScroll(ele, {
  bounce: false
})

## scrollEnd event

iscroll 的 scrollEnd 事件实际上是滚动停止的时候触发的，而不是滚动到末端触发的，所以要在 handler 里做个判断：

```
myScroll = new iScroll(ele, {
  onScrollEnd: function () {
  if(myScroll.maxScrollY == myScroll.y ) {
    // do something
  }
}
```

## refresh

当 iscroll 的容器有内容更新即内容高度变大的时候，需要调用 .refresh() 静态方法来更新，否则将不能滚动。


