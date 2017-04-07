var snake = (function() {
  var snake = [{
      'left': 0,
      'top' : 0,
      'div' : document.body
    }],
    cubesize = 20,    
    delay    = 200,
    maxspeed = 50,
    boxSize = {
      width: 540,
      height: 400
    },
    maxCubes = 200,
    increasespeed = 1,
    randombox, timer, lastkeydown;

  var randomStyle = function(size) {
    var left = size * Math.floor(Math.random() * (boxSize.width/20) ) + 'px';
    var top = size * Math.floor(Math.random() * (boxSize.height/20) ) + 'px';

    return {
      left: left,
      top: top
    };
  };

  return {
    init: function(node, opt) {
      if(!opt) {
        opt = {};
      }
      if(opt.boxSize)
        boxSize = opt.boxSize;
      maxCubes = boxSize.width * boxSize.height / (cubesize * cubesize);
      node.style.backgroundColor = 'lightblue';
      
      var head = document.createElement('div');
      head.setAttribute('id', opt.headID || 'snakehead');
      head.className = opt.className || 'snake';
      node.appendChild(head);

      snake[0].div = head;

      window.onkeydown = this.keydown(this);
    },

    keydown: function(self) {
      return function(e) {
        var event = e || window.event;
        console.log(event.keyCode);
        switch (event.keyCode) {
          // space, do nothing
          case 32: 
            break;
          // left arrow, move left
          case 37: 
            if (lastkeydown !== 39) {
              clearInterval(timer);
              self.move('left', -cubesize, event.keyCode);
            }
            break;
          // up arrow, move up
          case 38:
            if (lastkeydown !== 40) {
              clearInterval(timer);
              self.move('top', -cubesize, event.keyCode);
            }
            break;
          // right arrow, move right
          case 39:
            if (lastkeydown !== 37) {
              clearInterval(timer);
              self.move('left', cubesize, event.keyCode);
            }
            break;
          // down arrow, move down
          case 40:
            if (lastkeydown !== 38) {
              clearInterval(timer);
              self.move('top', cubesize, event.keyCode);
            }
            break;
          // 'r', restart game
          case 82:
            clearInterval(timer);

            // remove snake body in document
            Array.prototype.slice.call(
                document.getElementsByClassName("snake")
            ).forEach(function(e, i) {
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
    },

    move: function(direction, size, keyCode) {
      // clear last record, and push new data
      // for stop and run function
      var self = this;

      return timer = setInterval(function() {
        var head = snake.length - 1;

        if (document.getElementsByClassName("randombox").length === 0) {
          self.createRandomDiv(Math.abs(size), snake[head].div.parentNode);
        }

        if (size < 0 && snake[head][direction] + size < 0) {
          clearInterval(timer);
          lastkeydown = -1;
          return false;
        }
        if ( (direction === 'left' && snake[head][direction] + size >= boxSize.width)
          || (direction === 'top' && snake[head][direction] + size >= boxSize.height)
        ) {
          clearInterval(timer);
          lastkeydown = -1;
          return false;
        }

        // get randombox
        if (snake[head].div.style.left == randombox.style.left 
          && snake[head].div.style.top == randombox.style.top) {

          randombox.className = "snake";
          snake.unshift({
            div: randombox
          });
          head += 1;

          if (delay > maxspeed)
            delay -= increasespeed;
        }
        // add snake length
        for (var i = 0; i < head; i++) {
          snake[i].div.style.left = snake[i + 1].div.style.left;
          snake[i].div.style.top = snake[i + 1].div.style.top;
        }

        snake[head][direction] += size;
        snake[head].div.style[direction] = snake[head][direction] + 'px';
        // if snake's head touch the body
        for (i = 0; i < head; i++) {
          if (head > 1 
            && snake[head].div.style.left === snake[i].div.style.left 
            && snake[head].div.style.top === snake[i].div.style.top) {
            clearInterval(timer);

            return false;
          }
        }
        // record the key
        lastkeydown = keyCode;
      // delay means the speed
      }, delay);
    },

    createRandomDiv: function(size, node) {
      var len = snake.length,
        i = 0,
        style, outbody = true;

      randombox = document.createElement("div");
      randombox.className = "snake randombox";

      try {
        while (len <= maxCubes && outbody) {
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
        randombox.style.top = style.top;

      } catch (e) {
        console.log(e);
      }
      node.appendChild(randombox);
    },

    stop: function() {
      clearInterval(timer);
    },

    run: function() {
      this.keydown(this)({
        keyCode: lastkeydown
      });
    }
  };
 
})();
