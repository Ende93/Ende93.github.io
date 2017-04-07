var $ = function(selector) {
  return [].slice.call(document.querySelectorAll(selector))
};

var slider = new Slider({
  width: 540,
  height: 400,
  parent: document.getElementById('slider'),
  sliders: [{
    tag: 'div',
    className: 'm-slider-item snake-box',
    content: 'snake',
    fn: snake
  }, {
    tag: 'div',
    className: 'm-slider-item cube-box',
    subNode: [{
      tag: 'div',
      className: 'vert-align'
    }, {
      tag: 'div',
      className: 'm-cube'
    }],
    content: 'cube',
    fn: animationCube
  }]
});
