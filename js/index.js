window.onload = function() {
  var snake = [{
      'left': 0,
      'top': 0
    }],
    timer,
    delay = 100,
    container = {
      top: document.getElementsByClassName("container")[0].offsetTop + document.body.scrollTop,
      left: document.getElementsByClassName("container")[0].offsetLeft,
      bottom: document.getElementsByClassName("container")[0].offsetTop + document.body.scrollTop + 600,
      right: document.getElementsByClassName("container")[0].offsetLeft + 600
    };

  window.onkeydown = function(e) {
    var event = e || window.event;
    var snakehead = document.getElementById("snakehead");
    switch (event.keyCode) {
      case 32: //space
        break;
      case 37: //left
        clearInterval(timer);
        timer = move('left', delay, -20);
        break;
      case 38: //up
        clearInterval(timer);
        timer = move('top', delay, -20);
        break;
      case 39: //right
        clearInterval(timer);
        timer = move('left', delay, 20);
        break;
      case 40: //down
        clearInterval(timer);
        timer = move('top', delay, +20);
        break;
      case 82: //r
        break;
    }
  };

  function move(direction, delay, step) {
    return setInterval(function() {
      if (step < 0 && snake[0][direction] + step < 0) {
        clearInterval(timer);
        return false;
      } else if (step > 0 && snake[0][direction] + step > 580) {
        clearInterval(timer);
        return false;
      }
      snake[0][direction] += step;
      snakehead.style[direction] = snake[0][direction] + 'px';
    }, delay);
  }
};
