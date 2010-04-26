Vf.Widget.Slider = new Class({
  show: function(element) {
    return element.slide('down');
  },

  hide: function(element) {
    return element.slide('up');
  }
});

Vf.Widget.Fader = new Class({
  show: function(element) {
    return element.fade('in');
  },

  hide: function(element) {
    return element.fade('out');
  }
});

