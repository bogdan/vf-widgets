/**
 * Wrapping namespace for all widgets
 * @module Vf
 */

/**
 * Base class for all widgets. Provides many utility methods
 * @class Widget
 * @for Widget
 * @namespace Vf
 */
Vf.Widget = new Class({

  Extends: Vf.Stateful('hidden', 'hide', 'show', 'setHidden'),

  Implements: [
    Events,
    Log,
    Options,
    Class.Occlude
  ],

  property: 'widget',

  /**
   *  Widget options
   *  @property options
   *  @type Hash
   *  @default {} 
   */
  options: {
  },

  /**
   * Constructor
   * @constructor
   * @param {Mixed} element The DOM element or element id to be wraped under widget class.
   * @param {Hash} options Widget options
   */
  initialize: function(element, options) { 
    this.enableLog();
    this.element = $(element);
    if (this.element === null) {
      throw "Element is null";
    }
    if (this.occlude()) {
      this.log("Element ", this.element, " already wraped with widget");
      return this.occluded;
    }
    if ($chk(options)) {
      this.setOptions(options);
    }
  },

  /*
  *  API
  */

  /**
   * Replaces current widget element with new received element
   * and initialize current widget over new element
   * @method reinitialize
   * @param {String|Element} elementOrHtmlString with html or element to replace
   */
  reinitialize: function(elementOrHtmlString) {
    var element = Vf.Utils.toElement(elementOrHtmlString);
    if (this.element.parentNode) {
      element.replaces(this.element);
    }
    this.initialize(element);
  },

  /**
   *  Adds ui-hidden class to element
   *  and do the hide animated
   *  @method hide
   *  @return {Boolean} true if widget was not hidden and false if it was
   */
  hide: function() {
    var result = this.parent.apply(this, arguments);
    //if (result) {
      //this.options.animator.hide(this.element);
    //}
    return result;
  },

  /**
   *  Removes ui-hidden class from element
   *  and do the show animation
   *  @method show
   *  @return {Boolean} true if widget was not shown and false if it was
   */
  show: function() {
    var result = this.parent.apply(this, arguments);
    //if (result) {
      //this.options.animator.show(this.element);
    //}
    return result;
  },

  /**
   * Gets first nested element that match the query
   * @method getElement
   * @param {String} selector 
   * @return {Element} queried element
   */
  getElement: function(query) {
    return this.element.getElement(query);
  },

  /**
   * Gets all nested elements that match the query
   * @method getElements
   * @param {String} selector 
   * @return {Array} queried elements array
   */
  getElements: function(query) {
    return this.element.getElements(query);
  },

  /**
   *  Grabs given element and append to the list of childs for widget
   *  @method grab
   *  @param {Element} element
   *  @param {String} position of the element. Could be 'top' or bottom'. Default 'bottom'
   *  @return {Vf.Widget} This widget
   */
  grab: function(element, where) {
    this.element.grab(element, where);
    return this;
  },

  /**
   *  Appends given list of element to the list of childs for widget
   *  @method adopt
   *  @param {Array|Element} elementOrArrayOfElements could be array of elements. Can accept any number of arguments.
   *  @return {Vf.Widget} This widget
   */
  adopt: function() {
    this.element.adopt(arguments);
    return this;
  },

  /**
   *  Appends given html string to the bottom of inner html
   *  @method append
   *  @param {String} htmlString
   *  @return {Vf.Widget} this widget
   */
  append: function(text) {
    return this.adopt(Vf.Utils.toHtml(text));
  },

  /**
   *  Applies given class to the widget element if it is not applied yet
   *  @method addClass
   *  @param {String} className
   *  @return {Vf.Widget} this widget
   */
  addClass: function(className) {
    this.element.addClass(className);
    return this;
  },

  /**
   *  Removes the given class from the widget element
   *  @method removeClass
   *  @param {String} className
   *  @return {Vf.Widget} this widget
   */
  removeClass: function(name) {
    this.element.removeClass(name);
    return this;
  },

  /**
   *  Impties all children of the element and removes it from DOM and garbages the element
   *  @return {undefined}
   */
  destroy: function() {
    this.hide();
    this.element.destroy();
    this.fireEvent('destroy');
  },

  /**
   *  Gets attribute of widget element
   *  @param {String} attribute
   *  @return {String} Attribute value
   */
  get: function(attr) {
    return this.element.get(attr);
  },

  /**
   *  Sets attribute of widget element
   *  @param {String} attribute
   *  @param {Mixed} value
   *  @return {Vf.Widget} this widget
   */
  set: function(attr, value) {
    this.element.set(attr, value);
    return this;
  },

  /**
   *  Sets the styles attribute of the element
   *  @param {Object} styles hash 
   *  @return {Vf.Widget} this widget
   */
  setStyles: function(styles) {
    this.element.setStyles(styles);
    return this;
  },

  /**
   *  Sets the specified style attribute of the element to the given value
   *  @param {String} attribute
   *  @param {Mixed} value
   *  @return {Vf.Widget} this widget
   */
  setStyle: function(attribute, value) {
    this.element.setStyle(attribute, value);
    return this;
  },

  /**
   *  Removes all child nodes of the widget element
   *  @return {Vf.Widget} this widget
   */
  empty: function() {
    this.element.empty();
    return this;
  },

  /**
   *  Gets widget element size
   *  @return {Dimention} 
   */
  getSize: function() {
    return this.element.getSize();
  },

  /**
   *  Gets the id attribute of the widget element
   *  @return {String} id
   */
  getId: function() {
    return this.element.id;
  },

  /**
   *  Determines if the widget element has specified class
   *  @param {String} className
   *  @return {Boolean}
   */
  hasClass: function(className) {
    return this.element.hasClass(className);
  },

  /**
   *  Gets parent element to the widget element
   *  @return {Element} parent element
   */
  getParent: function() {
    return this.element.getParent();
  },

  /**
   *  Gets the inner html of the widget element
   *  @return {String} inner html
   */
  getHtml: function() {
    return this.get('html');
  },

  /**
   *  Sets the inner html of the widget element
   *  @param {String} htmlString
   *  @return {Vf.Widget} this widget
   */
  setHtml: function(html) {
    this.set('html', html);
    return this;
  },

  /**
   *  Manages the 'ui-hidden' class on the widget element
   *  Toggles class if the value is undefined
   *  removes the class if the value is true 
   *  removes the class if the value is false 
   *  @param {Boolean} value
   *  @returns {Boolean} true if the ui state was chaged and false otherwise
   *
   */
  toggle: function(value) {
    return this.setHidden($defined(value) ? !value : undefined);
  },

  /*
  * Implementation
  */

  addEventToElement: function(event1, event2) {
    $A(arguments).each(function(event) {
      this.element.addEvent(event, this[event].bind(this));
    }.bind(this));
  },

  toElement: function() {
    return this.element;
  }

});

