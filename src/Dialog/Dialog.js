Vf.Dialog = new Class({

  Extends: Vf.Controller,

  widgets: {
    overlay: {
      selector: '#dialog_overlay',
      global: true
    },
    closeButtons: {
      clazz: Vf.Button,
      selector: '.js-close-dialog',
      onClick: 'hide',
      multiple: true
    },
    openButton: {
      clazz: Vf.Button,
      selector: null, //rewrited from this.options.openButton
      global: true,
      onClick: 'show'
    }
  },

  options: {
    modalDialogClass: 'modal-dialog',
    hideOnOutsideClick: false, //TODO: implement
    hideOnEscape: false,
    disableScrolling: true,
    overlay: false,
    openButton: null,
    centerOnShow: true
  },

  initialize: function(element, options) {
    this.widgets.openButton.selector = options.openButton;
    this.parent.apply(this, arguments);
    this.addClass(this.options.modalDialogClass);
  },

  show: function() {
    if (this.options.overlay) {
      this.overlay.show();
    }
    if (this.options.centerOnShow) { 
      this.center();
    }
    this.parent();
    window.addEvent('keydown', this.onEscape.bind(this));

    if (this.options.disableScrolling) {
      $(document.body).setStyles({ overflow: 'hidden' });
    }

    return false;
  },

  hide: function() {
    if (this.options.overlay) {
      this.overlay.hide();
    }
    this.parent();
    window.removeEvent('keydown', this.onEscape.bind(this));


    if (this.options.disableScrolling) {
      $(document.body).setStyles({ overflow: 'auto' });
    }

    return false;
  },

  /*
  *  Implementation
  */

  onEscape: function(event) {
    if (event.key == 'esc' && this.options.hideOnEscape) {
      this.hide(); 
    }
  },

  center: function() {
    this.centerHorizontally();
    this.centerVertically();
  },

  centerHorizontally: function () {
    var size   = this.getSize();
    var margin = "-" + (size.x / 2) + 'px';
    this.setStyles({"margin-left": margin });
  },

  centerVertically: function () {
    var size   = this.getSize();
    var margin = "-" + (size.y / 2) + 'px';
    this.setStyles({"margin-top": margin });
  }

});


window.addEvent('domready', function() {
  var overlay = $('dialog_overlay');
  if (!overlay) {
    overlay = new Element('div', {id: 'dialog_overlay', 'class': 'dialog-overlay hidden'});
    $(document.body).grab(overlay);
  }
  Vf.Dialog.overlay = new Vf.Widget(overlay);
});
