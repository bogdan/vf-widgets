Vf.Animators = { 
  
  generic: {
    show: function(element) {
      return element.show();
    },

    hide: function(element) {
      return element.hide();
    }
  },

  
  slider: {
    show: function(element) {
      return element.slide('down');
    },

    hide: function(element) {
      return element.slide('up');
    }
  },

  fader: {
    show: function(element) {
      return element.fade('in');
    },

    hide: function(element) {
      return element.fade('out');
    }
  }
};

