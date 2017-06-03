(function () {

  var _carousel = carousel(),
    _mouse = {},
    TIME = 4000;

  var _html = `<section class="ads-box">
    <ul class="ads-container"></ul>
    <ul class="ads-icon-container"></ul>
  </section>
  `
  var _width = 0;
  var _timer = setInterval(_carousel, TIME);
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
      t.push('<li><img src="' + srcs[i] + '"></li>');
    }
    t.push( t[0] );
    t.unshift( t.slice(-2, -1) );
    ele.querySelector('.ads-container').innerHTML = t.join('');

    _width = $items.eq(0).css('width').replace('px', '');

    $box.css({
      'width': (boxWidth = _width * (length + 2) + 'px'),
      'left': prop + 'px'
    });

    setTimeout(function () {
      $box.css('transition', 'all .6s ease-in-out');
    });

    for (var i = 0; i < length; i++) {
      iconHTML += '<i class="ads-icon ' + (i == 0 ? 'current-icon' : '') + '"/>';
    }

    $items.eq(0).clone().appendTo($items.parent());
    $items.eq(0).before($items.eq(-1).clone());

    _$icon = $box.parents('section').find('.ads-icon-container ul')
      .html(iconHTML);


    return {
      view: ele.querySelector('.ads-box'),
      box: ele.querySelector('.ads-container'),
      icon: ele.querySelector('.ads-icon-container')
    }
  }

  function init(ele, pics, time) {
    var t = mount(ele)
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

  }

  function carousel() {
    var $iconBox,
      length = _$box.querySelectorAll('.ads-item').length;

    if (length == 0) {
      return function () {
        clearInterval(_timer);
      };
    }

    var _index = 0,
      $items = $box.find('.ads-item'),
      boxWidth,
      
    var iconHTML = '';
    var prop = -_width;

    function move(offset) {
      _index += offset || 1;

      prop = -_width * (_index + 1);

      if (_index == -1) {
        prop = 0;

        setTimeout(function () {
          _index = 1;
          $box.css({
            transition: 'initial',
            left: -_width * length + 'px'
          });
        }, 700)
      }

      $box.css({
        transition: 'all .6s ease-in-out',
        'left': prop + 'px'
      });

      if (_index == length) {
        _index = 0;
        prop = -_width;

        setTimeout(function () {
          $box.css({
            transition: 'initial',
            left: prop + 'px'
          });
        }, 700)
      }

      $iconBox.find('.current-icon').removeClass('current-icon');
      $iconBox.find('i').eq(_index).addClass('current-icon');
    }

    return move;
  }

  window.carousel = init;
}());