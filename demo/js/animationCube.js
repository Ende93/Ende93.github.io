var animationCube = (function() {
  var temp =
    '<div class="m-cube-box">'
      + '<div class="m-cube-item front">'
        + 'Front'
      + '</div>'
      + '<div class="m-cube-item right">'
        + 'Right'
      +'</div>'
      + '<div class="m-cube-item left">'
        + 'Left'
      + '</div>'
      + '<div class="m-cube-item bottom">'
        + 'Bottom'
      + '</div>'
      + '<div class="m-cube-item back">'
        + 'Back'
      + '</div>'
      + '<div class="m-cube-item top">'
        + 'Top'
      + '</div>'
    + '</div>'

  return {
    init: function(node, className) {
      var len = node.children.length;
      var child = document.createElement('div');
      if (className)
        child.className = className;
      child.innerHTML = temp;
      
      node.children[len - 1].appendChild(child.children[0]);
    },

    stop: function() {

    },

    run: function() {
		
    }
  };
})();
