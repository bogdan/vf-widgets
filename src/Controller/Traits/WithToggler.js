Vf.Controller.WithToggler = new Class({

  Extends: Vf.Controller,

  widgets: {
    toggler: {
      selector: null,
      clazz: Vf.Button,
      onClick: 'toggle',
      global: true,
      hideOnClick: false
    }
  },

  options: {
    toggler: null,
    autohideToggler: false
  },

  initialize: function(element, options) {
    if (options.toggler) {
      this.widgets.toggler.selector = options.toggler;
    }
    if (options.autohideToggler) {
      this.widgets.toggler.hideOnClick = options.autohideToggler;
    }
    this.parent.apply(this, arguments);
    if (this.toggler) { 
      if (this.options.autohideToggler && this.isHidden()) { 
        this.toggler.hide();
      }
    }
  },

  hide: function() {
    var result = this.parent.apply(this, arguments);
    if (result && this.toggler) {
      this.toggler.show();
    }
    return result;
  }


});
