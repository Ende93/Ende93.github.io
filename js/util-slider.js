var utils = {
  html2node: function(str, className) {
    var container = document.createElement('div');
    if (className)
      container.className = className;
    container.innerHTML = str;

    return container.children[0];
  },
  extend: function(a, b) {
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      for (var i in b) {
        if (b.hasOwnProperty(i) && !a[i]) {
          a[i] = b[i];
        }
      }
    } else
      return false;
  },

  addClass: function(node, name) {
    if (node.nodeType && node.className.indexOf(name) === -1) {
      node.className += ' ' + name;
    }
    return node;
  },

  delClass: function(node, name) {
    if (node.nodeType) {
      node.className = node.className.replace(name, ' ')
    }
  },

  createEle: function(tag, opt, info) {
    var keys = Object.keys(opt);
    var e = document.createElement(tag);
    var t;

    if(tag === 'img') {
      e.style.height = info.height + 'px';
      e.style.width = info.width + 'px';
    }
    for (var i in keys) {
      t = opt[keys[i]];

      switch (keys[i]) {
        case 'className':
          e.className = t;
          break;
        case 'titleContent':
          e.innerHTML = t;
          break;
        case 'src':
          e.src = t;
          break;
        default:
          break;
      }
    }

    return e;
  }
};

function Slider(opt) {
	//utils.extend(this, utils.emitter);
  utils.extend(this, opt);

  if(!this.temp) {
  	this.temp = '<div class="m-slider">' 
                  + '<div class="m-slider-left">'
                  + '</div>'    
                  + '<div class="m-slider-right">'
                    + '<div class="m-slider-items">'
                    + '</div>'
                  + '</div>'
                + '</div>';
  } 

  this.init();
  
  return this;
}

Slider.prototype = {
  next: function() {
    this.X += -this.width || 0;
    
    if(this.X === this.max * this.width) {
      this.X = 3 * this.width;
    }
    this.body.style.transform = 'translateX(' + this.X + 'px) translateZ(0)';

    return this;
  },

  prev: function() {
    this.X -= -this.width || 0;

    if(this.X === 0) {
      this.X = 5 * this.width;
    }
    this.body.style.transform = 'translateX(' + this.X + 'px) translateZ(0)';

    return this;
  },

  nav: function(n, next) {
    if (this.current.fn && this.current !== next) {
      this.current.fn.stop();
      this.current.state = 'stop';
    }
    if(next && next.fn) {
      if(!next.exist) {
        next.fn.init(next.box);
        next.exist = true;
      } else if(next.state === 'stop') {
        next.fn.run();
        next.state = 'running';
      }
    }

    this.X = n * -this.width;
    this.body.style.transform = 'translateX(' + this.X + 'px) translateZ(0)'

    this.current = next || {};
    this.current.index = n;
  },

  init: function() {
    this.X = 0;
    this.max = 0;
    this.titleTag = 'i';
    this.titleClassName = 'title';
    
    this.container = utils.html2node(this.temp);

    this.body = this.container.getElementsByClassName('m-slider-items')[0];
    this.body.style.transitionDuration = '0.3s';
    //console.log(this.sliders.length / 2);
    this.body.style.width = this.width * this.sliders.length + 'px';

    this.menu = this.container.getElementsByClassName('m-slider-left')[0];

    this.current = 0;

    if(this.sliders && this.sliders.length > 0) {
      var self = this, 
        arr = self.sliders;
      var e, e2;
      for(var i in arr) {
        // create element
        e = utils.createEle(arr[i].tag, arr[i], {
          height: self.height,
          width: self.width
        });
        
        // create clickable element
        e2 = utils.createEle(self.titleTag, {
          className: self.titleClassName,
          titleContent: arr[i].content
        });

        // add click event
        if(self.current !== undefined) {
          (function(i) {
            //console.log(11);
            e2.addEventListener('click', function() {
              // move 
              self.nav(i, arr[i]);
            });
          })(i);
        }
        
        arr[i].box = e;
        // add node

        self.menu.appendChild(e2);
        self.body.appendChild(e);

      }
      this.nav(0, arr[0]);
    }

    document.body.appendChild(this.container);
  }


}
