Vf.Animators = {};
Vf.Animators.Slider = new Class({
  show: function(element) {
    return element.slide('down');
  },

  hide: function(element) {
    return element.slide('up');
  }
});

Vf.Animators.Fader = new Class({
  show: function(element) {
    return element.fade('in');
  },

  hide: function(element) {
    return element.fade('out');
  }
});

