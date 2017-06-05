(function () {

  var _carousel,
    _timer,
    _mouse = {},
    TIME = 4000;

  var _html = `<section class="ads-box">
    <ul class="ads-container"></ul>
    <ul class="ads-icon-container"></ul>
  </section>
  `
  var _width = 0;
  var _$box = null,
    _$view = null,
    _$icon = null;

  var $ = function (selector) {
    return document.querySelector(selector);
  }

  function mount(ele, srcs) {
    var div = document.createElement('div');
    var iconHTML = '', t = [];

    div.innerHTML = _html;
    ele.appendChild(div.children[0]);
    for(var i in srcs) {
      t.push('<li class="ads-item"><img src="' + srcs[i] + '"></li>');
    }
    t.push( t[0] );
    t.unshift( t.slice(-2, -1) );
    ele.querySelector('.ads-container').innerHTML = t.join('');

    _width = ele.querySelector('li').getBoundingClientRect().width;

    ele = ele.querySelector('.ads-container');
    ele.style.width = _width * t.length + 'px';
    ele.style.left  = -_width + 'px';
    ele.style.transition = 'all .6s ease-in-out';

    for (var i = 0; i < srcs.length; i++) {
      iconHTML += '<li class="ads-icon ' + (i == 0 ? 'current-icon' : '') + '"></li>';
    }

    ele.parentNode.querySelector('.ads-icon-container').innerHTML = iconHTML

    return {
      view: ele.parentNode,
      box: ele,
      icon: ele.parentNode.querySelector('.ads-icon-container')
    }
  }

  function init(ele, pics, time) {
    var t = mount(ele, pics);

    _length = pics.length;
    _$view = t.view;
    _$box = t.box;
    _$icon = t.icon;

    TIME = time || TIME;

    _$view.addEventListener('touchstart', function (e) {
      _mouse.start = e.touches[0];
    });

    _$view.addEventListener('touchmove', function (e) {
      _mouse.end = e.touches[e.touches.length - 1]
    });

    _$view.addEventListener('touchend', function (e) {
      var t = _mouse.end.clientX - _mouse.start.clientX;
      if (t > 30) {
        _carousel(-1);
      } else if (t < -30) {
        _carousel(1);
      } else {
        return;
      }

      clearInterval(_timer);
      _timer = setInterval(_carousel, TIME);
    });

    _carousel = carousel();
    _timer = setInterval(_carousel, TIME);
  }

  function carousel() {
    if (_length == 0) {
      return function () {
        clearInterval(_timer);
      };
    }

    var _index = 0,
      boxWidth;
      
    var iconHTML = '';
    var prop = -_width;

    function move(offset) {
      _index += offset || 1;

      prop = -_width * (_index + 1);

      if (_index == -1) {
        prop = 0;

        setTimeout(function () {
          _index = 1;
          _$box.style.transition = 'initial';
          _$box.style.left = -_width * _length + 'px';
        }, 700);
      }

      _$box.style.transition = 'all .6s ease-in-out',
      _$box.style.left =  prop + 'px';
      

      if (_index == _length) {
        _index = 0;
        prop = -_width;

        setTimeout(function () {
          _$box.style.transition = 'initial',
          _$box.style.left =  prop + 'px';
        }, 700)
      }

      let t = _$icon.querySelector('.current-icon')
      t.className = t.className.replace('current-icon', '');
      t = _$icon.querySelectorAll('.ads-icon')[_index];
      t.className = t.className + ' ' + 'current-icon';
    }

    return move;
  }

  window.carousel = init;
}());