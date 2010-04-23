Vf.Controller = new Class({

  Extends: Vf.Widget,

  options: {
    useSpinner: false,
    spinnerTarget: null //initialized in constructor
  },

  widgets: {
  },


  initialize: function(element, options) {
    this.options.spinnerTarget = $(element);
    this.parent.apply(this, arguments);
    this.initWidgets();
  },

  /*
  *  Implementation
  */

  initWidgets: function() {
    this.buildWidgets(this.widgets, {useSpinner: this.options.useSpinner, spinnerTarget: this.options.spinnerTarget});
  },

  buildWidgets: function(widgets, defaultOptions) {
    new Hash(widgets).each(function(options, property) {
      this.buildWidget(property, $merge(defaultOptions, options));
    }.bind(this));
  },

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
