(function () {

  var _carousel = carousel(), _mouse = {},
    TIME = 4000;

  _timer = setInterval(_carousel, TIME);

  $('.ads-box').on('touchstart', function (e) {
    _mouse.start = e.touches[0];
  });

  $('.ads-box').on('touchmove', function (e) {
    _mouse.end = e.touches[e.touches.length - 1]
  });

  $('.ads-box').on('touchend', function (e) {
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

  function carousel() {
    var $iconBox,
      $box = $('.footer .ads-container'),
      length = $box.find('.ads-item').length;

    if (length == 0) {
      return function () {
        clearInterval(_timer);
      };
    }

    var _index = 0,
      $items = $box.find('.ads-item'),
      boxWidth,
      _width = $items.eq(0).css('width').replace('px', '');
    var iconHTML = '';
    var prop = -_width;

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

    $iconBox = $box.parents('section').find('.ads-icon-container ul')
      .html(iconHTML);

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

  window.carousel = carousel;
}());