Vf.Link.Factory.destroyer = function(element, target, options) {
  options = $merge({method: 'delete', lock: target}, options);

  var destroyer = new Vf.Link(element, options);
  destroyer.addEvent('success', function() {
    target.destroy();
  });
  return destroyer;

};
