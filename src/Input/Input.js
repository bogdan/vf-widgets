Vf.Input = new Class({

  Extends: Vf.Widget,
  
  options: {
    focusOnShow: true,
    withLabel: true,
    clearOnHide: true,
  },

  initialize: function(element, options) {
    this.parent(element, options);
    if (this.options.withLabel) {
      this.label = this.getForm().getElement('label[for=' + this.getId() + ']');
    }
    this.addEventToElement('click', 'blur', 'focus');
  },

  /*
  *  API
  */

  show: function() {
    this.parent();
    if (this.label) {
      this.label.show();
    }
    if (this.options.focusOnShow) { 
      this.focus();
    }
  },

  
  hide: function() {
    this.parent();
    if (this.label) {
      this.label.hide();
    }
    if (this.options.clearOnHide) {
      this.clear();
    }
  },

  focus: function() {
    this.element.focus();
    this.fireEvent('focus');
  },


  blur: function() {
    this.element.blur();
    this.fireEvent('blur');
  },

  click: function() {
    this.fireEvent('click');
  },

  isChecked: function() {
    return this.element.checked;
  },

  getForm: function() {
    return this.element.form;
  },

  setValue: function(value) {
    this.set('value', value);
  },

  getValue: function() {
    return this.get('value');
  },

  clear: function() {
    this.setValue('');
  }

});
