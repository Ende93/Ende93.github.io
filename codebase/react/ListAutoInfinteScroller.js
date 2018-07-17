import React from 'react';
export default class ListWithScrollWrapper extends React.Component {
  top = 0
  isNeedScroll = true
  start = 0
  clientHeight = 0

  clearScroll() {
    window.cancelAnimationFrame(this.rafId)
  }
  onScrollFirst(translateY, $ul) {
    [].slice.call($ul.children)
      .some(function ($ele) {
        let top = $ele.offsetTop
        if (translateY >= top && translateY <= (top + $ele.offsetHeight)) {
          const current = $ul.querySelector('.first')
          if (current) {
            current.classList.remove('first')
          }
          $ele.classList.add('first')
          return true
        }
      })
  }
  move($ele, top) {
    $ele.style.transform = `translateY(-${top}px)`
  }
  setScroll() {
    if (!this.isNeedScroll || !this.refs.$wrapper) {
      return
    }
    const $ele = this.refs.$wrapper.children[0]
    if (!$ele) {
      return
    }
    let top = this.top + 1
    if (top >= ($ele.clientHeight - this.clientHeight)) {
      let init = $ele.children[this.start + 1].offsetTop - this.clientHeight
      if (init < 0) {
        [].slice.call($ele.children).some((e, i) => {
          if (i > this.start && (i % this.originLength) === this.start) {
            init = $ele.children[i + 1].offsetTop - this.clientHeight
            return true
          }
          return false
        })
      }
      top = init
    }
    this.move($ele, top)
    this.onScrollFirst(top, $ele, this.clientHeight)
    

    this.top = top
    this.rafId = window.requestAnimationFrame(() => {
      this.setScroll()
    })
  }
  componentDidMount() {
    setTimeout(() => {
      this.clientHeight = this.refs.$wrapper.clientHeight
      this.setScroll()
    }, 0)
  }
  render() {
    let List = this.props.children
    let children = List.props.children
    let repairChildren = children.slice(0)
    const listLength = children.length
    const slideLength = this.props.slideLength || 5

    this.originLength = listLength
    // clone
    if (listLength > slideLength) {
      let fillLength;
      if ((listLength % slideLength) !== (listLength / slideLength)) {
        // 少于 n + 1 屏的情况，进行补充
        fillLength = (Math.floor(listLength / slideLength) + 2) * slideLength - listLength;
      } else {
        fillLength = slideLength
      }
      let i = 0;
      let count = 0;
      while (count < fillLength) {
        if (i > listLength - 1) {
          i = 0
        }
        repairChildren.push(
          React.cloneElement(children[i], {
            key: 'clone-' + children[i].key + count
          })
        )
        this.start = i
        i++;
        count++;
      }
    } else {
      this.isNeedScroll = false
    }
    List = React.cloneElement(List, { ...List.props }, repairChildren)
    return (
      <div className="list-scroller" ref="$wrapper" style={this.props.style}>
        {List}
      </div>
    )
  }
}
