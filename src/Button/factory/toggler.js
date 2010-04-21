Vf.Button.Factory.toggler = function(element, target, options) {
  var dialogOpener = new Vf.Button(element, options);
  dialogOpener.addEvent('click', function() {
    target.toggle();
  });
};
