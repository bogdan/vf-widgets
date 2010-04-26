

/**
 *  Button widget suppose to wrap any clickable element
 *  @class Button
 *  @for Button
 *  @extends Vf.Widget
 *  @namespace Vf
 */
Vf.Button = new Class({
  Extends: Vf.Widget,

  options: {
    hideOnClick: false
  },


  /**
   * Constructor
   * Valid options:
   *   * all options from Vf.Widget class
   *   * hideOnClick - autohides element on click. Default: false.
   * @constructor
   * @param {Mixed} element The DOM element or element id to be wraped under widget class.
   * @param {Hash} options hash with options
   */
  initialize: function(element, options) {
    this.parent(element, options);
    this.addEventToElement('click');
  },


  /*
   *  Implementation
   */
  click: function(event) {
    if (event) {
      event.stop();
    }
    if (this.options.hideOnClick) { 
      this.hide();
    }
    this.fireEvent('click');
  }

});

Vf.Button.Factory = Vf.Button.Factory || {};
