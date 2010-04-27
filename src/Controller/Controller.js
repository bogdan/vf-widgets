/**
 *  Controller is a widget that controllers other widget 
 *  (in most cases nested within the controller)
 *  Controller provides simple DSL to define and initialize it's widgets
 *  @class Controller
 *  @extends Vf.Widget
 *  @namespace Vf
 */
Vf.Controller = new Class({

  Extends: Vf.Widget,

  /**
   *  Valid widget options
   *  <ul>
   *    <li>all Vf.Widget options</li>
   *    <li>
   *      useSpinner - determines if the controller uses spinner to indicate activity
   *      bypass this option to all defined widgets contructor. Default: false.
   *    </li>
   *    <li>spinnerTarget - element to draw a spinner. Default: this widget element.</li>
   *  </ul>
   *  @property options
   */
  options: {
    useSpinner: false,
    spinnerTarget: null //initialized in constructor
  },

  /**
   *  Contains a hash of widget descriptors.
   *  Each descriptor is used to build a widget and assign it to the property of controller object
   *  Descriptor key is used as the name of the property.
   *  <h4>Example</h4>
   *  <code>widgets: { submitButton: {clazz: Vf.Button, selector: '.js-submit'}}</code>
   *  this interpreted in the constructor as 
   *  <code>this.submitButton = new Vf.Button(this.getElement('.js-submit'))</code>
   *  <h4>Widget descriptor options</h4>
   *  <ul>
   *    <li>clazz - widget class that used as contructor. Default: Vf.Widget.</li>
   *    <li>selector - query that is used to find the widget. Default: null.</li>
   *    <li>
   *      global - if true the query is applied to whole document scope 
   *      otherwise only to relatively to current widget element. Default false
   *    </li>
   *    <li>
   *      multiple - if true finds all widgets that match query and wrap all of them with widget. Default: false.
   *    </li>
   *    <li>required - if true throws an error if element not found. Ignored if multiple is set to true. Default: false.</li>
   *  </ul>
   *  IMPORTANT: other options are forwarded to described widget constructor
   *  @property widgets
   */
  widgets: {
  },


  /**
   *  Constructor
   *  @constructor
   *  @param {Element|String} element
   *  @param {Hash} options
   */
  initialize: function(element, options) {
    this.options.spinnerTarget = $(element);
    this.parent.apply(this, arguments);
    this.initWidgets();
  },

  /*
  *  Implementation
  */

  /**
   *  Initialize every widget defined in #widgets property
   *  @method initWidgets
   */
  initWidgets: function() {
    this.buildWidgets(this.widgets, {useSpinner: this.options.useSpinner, spinnerTarget: this.options.spinnerTarget});
  },

  /**
   *  Initialize every widget from the given descriptors hash
   *  @param {Hash} widgets hash of widget descriptors
   *  @param {Hash} defaultOptions options that got merged to widget constructor options
   */
  buildWidgets: function(widgets, defaultOptions) {
    new Hash(widgets).each(function(options, property) {
      this.buildWidget(property, $merge(defaultOptions, options));
    }.bind(this));
  },

  /**
   *  Builds a widget from the descriptor and options
   *  @param {String} property property to assign the constructed widget class
   *  @param {Hash} widget descriptor
   */
  buildWidget: function(property, options) {
    var selector = options.selector;

    if (!selector) {
      this.throwErrorIfRequired(options);
      return;
    }

    this.preprocessOptions(options);
    var scope = options.global ? $(document.body) : this;
    if (options.multiple) {
      this[property] = [];
      var elements = $type(selector) == 'element' ? selector : scope.getElements(selector);
      elements.each(function(element) {
        this[property][this[property].length] = this.createWidget(element, options);
      }.bind(this));
    } else {
      var element = $type(selector) == 'element' ? selector : scope.getElement(selector);
      if (element) {
        this[property] = this.createWidget(element, options);
      } else {
        this.throwErrorIfRequired(options);
      }
    }
  },

  throwErrorIfRequired: function(options) {
    if (options.required) { 
      throw new Error("Element '" + options.selector + "' not found in " + scope);
    }   
  },

  createWidget: function(element, options) {
    var clazz = options.clazz || Vf.Widget;
    return new clazz(element, options);
  },
  
  preprocessOptions: function(options) {
    for (var option in options) {
      var value = options[option];
      if (/^on[A-Z]/.test(option) && $type(value) == 'string') {
        options[option] = this[value].bind(this);
      }
    }
  }

});
