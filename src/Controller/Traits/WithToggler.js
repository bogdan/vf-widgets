Vf.Controller.WithToggler = new Class({

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

  /*
  * Implementation
  */
  initWidgets: function() {
    this.parent.apply(this, arguments);
    if (this.toggler) { 
      if (this.options.autohideToggler && this.isHidden()) { 
        this.toggler.hide();
      }
      this.addEvent('hide', function() {
        this.toggler.show();
      }.bind(this));
    }
  },

  preprocessWidgetOptions: function(options) {
    this.parent.apply(this, arguments);
    if (options.toggler) {
      this.widgets.toggler.selector = options.toggler;
    }
    if (options.autohideToggler) {
      this.widgets.toggler.hideOnClick = options.autohideToggler;
    }
  }


});
