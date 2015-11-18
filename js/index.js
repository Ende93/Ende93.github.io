window.onload = function() {
  var snake = [{
      'left': 0,
      'top': 0,
      'div': document.getElementById("snakehead")
    }],
    cubesize = 20,
    timer,
    delay = 200,
    randombox,
    box = document.getElementById("box"),
    lastkeydown,
    container = {
      top: box.offsetTop + document.body.scrollTop,
      left: box.offsetLeft,
      bottom: box.offsetTop + document.body.scrollTop + 600,
      right: box.offsetLeft + 600
    };

  window.onkeydown = function(e) {
    var event = e || window.event;

    switch (event.keyCode) {
      case 32: //space
        break;
      case 37: //left
        if (lastkeydown !== 37) {
          clearInterval(timer);
          move('left', delay, -cubesize);
        }
        break;
      case 38: //up
        if (lastkeydown !== 38) {
          clearInterval(timer);
          move('top', delay, -cubesize);
        }
        break;
      case 39: //right
        if (lastkeydown !== 39) {
          clearInterval(timer);
          move('left', delay, cubesize);
        }
        break;
      case 40: //down
        if (lastkeydown !== 40) {
          clearInterval(timer);
          move('top', delay, cubesize);
        }
        break;
      case 82: //r
        clearInterval(timer);
        snake[0].div.style.left = 0;
        snake[0].div.style.top = 0;
        snake[0].left = 0;
        snake[0].top = 0;
        //snake.splice(1);
        break;
    }
    
    lastkeydown = event.keyCode;
  };

  function move(direction, delay, size) {
    return timer = setInterval(function() {
      var head = snake.length - 1;
      if (document.getElementsByClassName("randombox").length === 0) {
        createRandomDiv(Math.abs(size), box);
      }
      if (size < 0 && snake[head][direction] + size < 0) {
        clearInterval(timer);
        return false;
      } else if (size > 0 && snake[head][direction] + size > 580) {
        clearInterval(timer);
        return false;
      }

      if (snake[head].div.style.left == randombox.style.left && snake[head].div.style.top == randombox.style.top) {
        randombox.className = "snake";
        snake.unshift({
          left: parseInt(randombox.style.left, 10),
          top: parseInt(randombox.style.top, 10),
          div: randombox
        });
        head += 1;
      }
      for (var i = 0; i < head; i++) {
        snake[i].left = snake[i + 1].left;
        snake[i].top = snake[i + 1].top;
        snake[i].div.style.left = snake[i + 1].div.style.left;
        snake[i].div.style.top = snake[i + 1].div.style.top;
      }
      snake[head][direction] += size;
      snake[head].div.style[direction] = snake[head][direction] + 'px';

    }, delay);
  }

  function createRandomDiv(size, parent) {
    randombox = document.createElement("div");
    randombox.className = "snake randombox";

    randombox.style.left = size * parseInt(Math.random() * 29, 10) + 'px';
    randombox.style.top = size * parseInt(Math.random() * 29, 10) + 'px';

    parent.appendChild(randombox);
  }
};
