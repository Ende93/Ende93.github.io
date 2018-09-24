export default class List {
  timerId = null
  viewElement = null
  lastElementKey = -1

  currentTop = 0
  restartTop = 0
  viewHeight = 0
  listHeight = 0
  isNeedScroll = true
  originListLength = 0
  slideLength = 0

  constructor(wrapperEle, slideLength) {
    this.slideLength = slideLength
    this.originListLength = wrapperEle.children.length
    this.listHeight = wrapperEle.clientHeight
    this.setRestartTop() 
  }


  clear() {
    window.cancelAnimationFrame(this.timerId)
  }
  
  move() {
    if (this.viewElement && this.viewElement.nodeType === 1) {
      this.viewElement.style.transform = `translateY(-${this.currentTop}px)`
    }
  }

  getFillElementsIndexs() {
    const ret = []
    if (this.originListLength > this.slideLength || this.viewHeight < this.listHeight) {
      let fillLength = 0
      if ((this.originListLength % this.slideLength) !== (this.originListLength / this.slideLength)) {
        // 补充至 n + 2 屏
        fillLength = (
            Math.floor(this.originListLength / this.slideLength) + 2
          ) * this.slideLength - this.originListLength
      } else {
        return ret
      }
      let i = 0;
      let count = this.slideLength;
      while (count < fillLength) {
        if (i > this.originListLength - 1) {
          i = 0
        }
        ret.push({
          key: i,
          index: count
        })
        this.lastElementKey = i
        i++;
        count++;
      }
    }
    return ret;
  }

  setRestartTop() {
    [].slice.call(this.wrapperEle.children).some((e, i) => {
      if (i > this.lastElementKey && (i % this.originListLength) === this.lastElementKey) {
        init = $ele.children[i + 1].offsetTop - this.viewHeight
        return true
      }
      return false
    })
  }
  getLastElementTop() { 
    return this.wrapperEle.children[
      this.lastElementKey + 1
    ].offsetTop - this.viewHeight
  }

  onScrollFirst() {}

  setScroll() {
    if (!this.isNeedScroll) {
      return
    }

    let top = this.currentTop + 1
    if (this.isNeedReset(top)) {
      if (this.getLastElementTop() < 0) {
        top = this.restartTop
      }
    }
    this.move(top)
    this.onScrollFirst()

    this.currentTop = top
    this.rafId = window.requestAnimationFrame(() => {
      this.setScroll()
    })
  }
}