
Vf.Button.Factory.hider = function(element, target, options) {
  var dialogOpener = new Vf.Button(element, options);
  dialogOpener.addEvent('click', function() {
    target.hide();
  });
};
