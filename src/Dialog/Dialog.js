/**
 *  Dialog widget. Suppose to wrap modal dialogs.
 *  Has show and close buttons support
 *  Acts as a controller
 *  @class Dialog
 *  @extends Vf.Controller 
 *  @implements Vf.Controller.WithToggler
 */
Vf.Dialog = new Class({

  Extends: Class.inherit(
    Vf.Controller,
    Vf.Controller.WithToggler),

  widgets: {
    /**
     *  Dialog overlay, all dialogs share the overlay
     *  Default options:
     *  <ul>
     *    <li>selector = "#dialog_overlay"</li>
     *    <li>global = true</li>
     *  </ul>
     *  @property widgets.overlay
     *  @type Vf.Widget
     */
    overlay: {
      selector: '#dialog_overlay',
      global: true
    },
    /**
     *  Buttons to close dialog.
     *  Can contain many buttons
     *  <h4>Default options:</h4>
     *  <ul>
     *    <li>clazz: Vf.Button</li>
     *    <li>selector: ".js-close-dialog"</li>
     *    <li>onClick: 'hide'</li>
     *    <li>multiple: true</li>
     *  </ul>
     *  @property widgets.closeButtons
     *  @type Vf.Widget
     */
    closeButtons: {
      clazz: Vf.Button,
      selector: '.js-close-dialog',
      onClick: 'hide',
      multiple: true
    }  
  },

  options: {
    /**
     *  Modal dialog class. Automatically applied to widget element on intialize
     *  @property options.modalDialogClass
     *  @type String
     *  @default modal_dialog
     */
    modalDialogClass: 'modal-dialog',
    hideOnOutsideClick: false, //TODO: implement
    /**
     *  Determines if the dialog should be closed when ESC button pressed
     *  @property options.hideOnEscape
     *  @type Boolean
     *  @default false
     */
    hideOnEscape: false,
    /**
     *  Determines if the body scrolling should be disabled when dialog shown
     *  @property options.disableScrolling
     *  @type Boolean
     *  @default true
     */
    disableScrolling: true,

    /**
     *  Determines if the dialog should use overlay
     *  @property options.overlay
     *  @type Boolean
     *  @default false
     */
    overlay: false,
    /**
     *  Determines if the dialog should be automatically centered on show
     *  @property  options.centerOnShow
     *  @type Boolean
     *  @default true
     */
    centerOnShow: true
  },

  initialize: function(element, options) {
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
