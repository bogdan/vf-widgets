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
      this.widgets.toggler.hideOnClick = options.toggler;
    }
    this.parent.apply(this, arguments);
    if (this.options.autohideToggler && this.toggler) { 
      if (this.isHidden()) { 
        this.toggler.hide();
      }
      this.addEvent('hide', function() {
        this.toggler.show();
      }.bind(this));
    }
  }


});
