window.onload = function init() {

  var snake = [{
      'left': 0,
      'top' : 0,
      'div' : document.getElementById("snakehead")
    }],
    cubesize = 20,    
    delay    = 200,
    maxspeed = 50,
    increasespeed = 1,
    randombox, timer, lastkeydown;

  window.onkeydown = function(e) {
    var event = e || window.event;

    switch (event.keyCode) {
      case 32: //space
        break;
      case 37: //left
        if (lastkeydown !== 37 && lastkeydown !== 39) {
          clearInterval(timer);
          move('left', -cubesize, event.keyCode);
        }
        break;
      case 38: //up
        if (lastkeydown !== 38 && lastkeydown !== 40) {
          clearInterval(timer);
          move('top', -cubesize, event.keyCode);
        }
        break;
      case 39: //right
        if (lastkeydown !== 39 && lastkeydown !== 37) {
          clearInterval(timer);
          move('left', cubesize, event.keyCode);
        }
        break;
      case 40: //down
        if (lastkeydown !== 40 && lastkeydown !== 38) {
          clearInterval(timer);
          move('top', cubesize, event.keyCode);
        }
        break;
      case 82: //r
        clearInterval(timer);

        // remove snake body in document
        Array.prototype.slice.call(
            document.getElementsByClassName("snake"))
          .forEach(function(e, i) {
            if (e.id !== "snakehead")
              e.remove();
          });
        
        // remove snake body in array
        snake.splice(0, snake.length - 1);

        snake[0].left = 0;
        snake[0].top = 0;
        snake[0].div.style.top = 0;
        snake[0].div.style.left = 0;

        break;
    }
  };

  function move(direction, size, keyCode) {
    return timer = setInterval(function() {
      var head = snake.length - 1;

      if (document.getElementsByClassName("randombox").length === 0) {
        createRandomDiv(Math.abs(size), document.getElementById("box"));
      }

      if (size < 0 && snake[head][direction] + size < 0) {
        clearInterval(timer);
        return false;
      } 
      if (size > 0 && snake[head][direction] + size > 580) {
        clearInterval(timer);
        return false;
      }

      if (snake[head].div.style.left == randombox.style.left 
      	&& snake[head].div.style.top == randombox.style.top) {

        randombox.className = "snake";
        snake.unshift({
          div: randombox
        });
        head += 1;

        if(delay > maxspeed)
          delay -= increasespeed;
      }

      for (var i = 0; i < head; i++) {
        snake[i].div.style.left = snake[i + 1].div.style.left;
        snake[i].div.style.top  = snake[i + 1].div.style.top;
      }
      snake[head][direction] += size;
      snake[head].div.style[direction] = snake[head][direction] + 'px';

      for (i = 0; i < head; i++) {
        if (head > 1 && snake[head].div.style.left === snake[i].div.style.left 
        	&& snake[head].div.style.top === snake[i].div.style.top) {
          clearInterval(timer);

          return false;
        }
      }
      
      lastkeydown = keyCode;

    }, delay);
  }

  function createRandomDiv(size, parent) {
  	var len  = snake.length,
  	  i = 0, style, outbody = true;

    randombox = document.createElement("div");
    randombox.className = "snake randombox";

    try {
      while (len <= 300 && outbody) {
        style = randomStyle(size);

        outbody = snake.some(function(e) {
          if (e.div.style.left == style.left 
          	&& e.div.style.top == style.top) {
            return true;
          } else {
            return false;
          }
        });
      }

      randombox.style.left = style.left;
      randombox.style.top  = style.top;

	} catch (e) {
      console.log(e);
    }
    parent.appendChild(randombox);

    function randomStyle(size) {
      var left = size * Math.floor(Math.random() * 29) + 'px';
      var top = size * Math.floor(Math.random() * 29) + 'px';

      return {
      	left : left,
      	top : top
      };
    }
      
  }
  
};
