

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
    hideOnClick: false,
    preventDefault: true
  },


  /**
   * Constructor
   * Valid options:
   *   * all options from Vf.Widget class
   *   * hideOnClick - autohides element on click. Default: false.
   *   * preventDefault - set to prevent default click event of the element. Default: true.
   * @constructor
   * @param {Mixed} element The DOM element or element id to be wraped under widget class.
   * @param {Hash} options hash with options
   */
  initialize: function(element, options) {
    this.parent(element, options);
    this.addEventToElement('click');
  },

  /**
   *  Fires on click on the widget element
   *  @event click
   *  @param {Event} event
   */

  /*
   *  Implementation
   */
  click: function(event) {
    if (event && this.options.preventDefault) {
      event.preventDefault();
    }
    if (this.options.hideOnClick) { 
      this.hide();
    }
    this.fireEvent('click', event);
  }

});

Vf.Button.Factory = Vf.Button.Factory || {};
