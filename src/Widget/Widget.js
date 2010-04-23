Vf.Widget = new Class({

  Extends: Vf.Stateful('hidden', 'hide', 'show', 'setHidden'),

  Implements: [
    Events,
    Log,
    Options,
    Class.Occlude
  ],

  property: 'widget',

  options: {
    animator: Vf.Animators.generic,
    styles: { }
  },

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
    this.setStyles(this.options.styles);
    this.fireEvent('instantiate');
  },

  /*
  *  API
  */

  reinitialize: function(elementOrHtmlString) {
    var element = Vf.Utils.toElement(elementOrHtmlString);
    if (this.element.parentNode) {
      element.replaces(this.element);
    }
    this.initialize(element);
  },

  hide: function() {
    var result = this.parent.apply(this, arguments);
    if (result) {
      this.options.animator.hide(this.element);
    }
    return result;
  },

  show: function() {
    var result = this.parent.apply(this, arguments);
    if (result) {
      this.options.animator.show(this.element);
    }
    return result;
  },

  getElement: function(query) {
    return this.element.getElement(query);
  },

  getElements: function(query) {
    return this.element.getElements(query);
  },

  grab: function(item, where) {
    return this.element.grab(item, where);
  },

  adopt: function() {
    return this.element.adopt(arguments);
  },

  append: function(text) {
    return this.adopt(Vf.Utils.toHtml(text));
  },

  addClass: function(name) {
    return this.element.addClass(name);
  },

  removeClass: function(name) {
    return this.element.removeClass(name);
  },

  destroy: function() {
    this.hide();
    this.element.destroy();
    this.fireEvent('destroy');
  },

  get: function(attr) {
    return this.element.get(attr);
  },

  set: function(attr, value) {
    return this.element.set(attr, value);
  },

  setStyles: function(styles) {
    return this.element.setStyles(styles);
  },

  setStyle: function(style, value) {
    return this.element.setStyle(style, value);
  },

  empty: function() {
    return this.element.empty();
  },

  toElement: function() {
    return this.element;
  },

  getSize: function() {
    return this.element.getSize();
  },

  getId: function() {
    return this.element.id;
  },

  addClass: function(clazz) {
    return this.element.addClass(clazz);
  },

  hasClass: function(clazz) {
    return this.element.hasClass(clazz);
  },

  getParent: function() {
    return this.element.getParent();
  },

  getHtml: function() {
    return this.get('html');
  },

  setHtml: function(html) {
    return this.set('html', html);
  },

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
  }


});

