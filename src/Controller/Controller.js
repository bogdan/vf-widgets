/**
 *  Controller is a widget that controlls other widgets 
 *  (in most cases nested within the controller)
 *  Controller provides simple DSL to define and initialize it's widgets
 *  @class Controller
 *  @extends Vf.Widget
 *  @namespace Vf
 */
Vf.Controller = new Class({

  Extends: Vf.Widget,

  options: {
    /**
     *  Determines if the controller uses spinner to indicate activity
     *  bypass this option to all defined widgets contructor. Default: false.
     *  @property options.useSpinner
     *  @type Boolean
     *  @default false
     */
    useSpinner: false,
    /**
     *  Element to draw a spinner. Default: this widget element.
     *  @property options.spinnerTarget
     *  @type {Element|String}
     *  @default this
     */
    spinnerTarget: null //initialized in constructor
  },

  /**
   *  Contains a hash of widget descriptors.
   *  Each descriptor is used to build a widget and assign it to the property of controller object
   *  Descriptor key is used as the name of the property.
   *  <h4>Example</h4>
   *  <code class="js">widgets: { 
   *    submitButton: {
   *      clazz: Vf.Button, 
   *      selector: '.js-submit',
   *      onClick: 'submit'
   *    },
   *    cancelButton: {
   *      clazz: Vf.Button,
   *      selector: '.js-cancel',
   *      onClick: 'cancel'
   *    }
   *  }</code>
   *  this interpreted in the constructor as 
   *  <code class="js">
   *  this.submitButton = new Vf.Button(this.getElement('.js-submit'));
   *  this.submitButton.addEvent('click', this.submit.bind(this));
   *  this.cancelButton = new Vf.Button(this.getElement('.js-cancel'))
   *  this.cancelButton.addEvent('click', this.cancel.bind(this));
   *  </code>
   *  
   *  <h4>IMPORTANT: options are forwarded to described widget constructor</h4>
   *  @property widgets
   *  @type Hash
   *  @default {}
   */
  widgets: {
    /**
     *  Widget Descriptor options
     *  @property widgets.descriptor
     *  @type Hash
     */

    /**
     *  widget class that used as contructor
     *  @property widgets.descriptor.clazz
     *  @type Object
     *  @default Vf.Widget
     */

    /**
     *  Query that is used to find the widget
     *  @property widgets.descriptor.selector 
     *  @type String
     *  @default null
     */

    /**
     *  If true the query is applied to whole document body scope 
     *  otherwise relatively to current widget element
     *  @property widgets.descriptor.global 
     *  @type Boolean
     *  @default false
     */

    /**
     *  If true finds all widgets that match query, wrap all of them with widget and assigns the array of constructed widget to the property
     *  If false finds first widget that match the query, wraps it with widget and assigns constructed objet to the property
     *  @property widgets.descriptor.multiple
     *  @type Boolean
     *  @default false
     */

    /**
     *  If true throws an error if element not found. Ignored if multiple is set to true.
     *  @property widgets.descriptor.required
     *  @type Boolean
     *  @default false
     */

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
   *  @param {String} property property name to assign the constructed widget class
   *  @param {Hash} options widget descriptor
   */
  buildWidget: function(property, options) {
    var selector = options.selector;

    if (!selector) {
      this.throwErrorIfRequired(options);
      return;
    }

    this.bindEventsToMethods(options);
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
  
  bindEventsToMethods: function(options) {
    for (var option in options) {
      var value = options[option];
      if (/^on[A-Z]/.test(option) && $type(value) == 'string') {
        options[option] = this[value].bind(this);
      }
    }
  }

});
