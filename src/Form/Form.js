Vf.Form = new Class({

  Extends: Vf.Controller,

  inputs: {
  },

  buttons: {
    submitButton: {
      selector: "a.js-submit-form",
      onClick: "submit"
    },
    cancelButton: {
      selector: "a.js-cancel-form",
      onClick: "cancel"
    },
  },

  options: {
    validate: true,
    resetOnHide: true,
    mask: true,
    hideOnCancel: false,
    resetOnCancel: true,
    resetOnSuccess: true,
    hideOnSuccess: false,
  },

  initialize: function(element, options) {
    this.parent(element, options);
    if (this.options.validate) {
      this.errors = this.getElement('.js-form-errors');
    }
    this.addEventToElement('submit');
    if (this.options.mask) {
      this.mask = new Mask(this);
    }
  },

  initWidgets: function() {
    this.parent();
    this.buildWidgets(this.inputs, {clazz: Vf.Input});
  },

  submit: function(event) {
    if (event) {
      event.stop();
    }
    if (this.mask) {
      this.mask.position();
      this.mask.show();
    }
    new Form.Request(this.element, null, {
      onSuccess: this.success.bind(this),
      onFailure: this.failure.bind(this),
      onComplete: this.complete.bind(this),
    }).send();
    this.fireEvent('submit');
  },


  success: function(responseHtml) {
    var container = new Element('div');
    container.adopt(responseHtml);
    if (this.options.resetOnSuccess) {
      this.reset();
    }
    if (this.options.hideOnSuccess) {
      this.hide();
    }
    this.fireEvent('success', container.get('html'));
  },

  failure: function(xhr) {
    if (this.options.validate) {
      this.processErrors(xhr.responseText);
    }
    this.fireEvent('failure', xhr.responseText);
  },

  complete: function() {
    if (this.mask) {
      this.mask.hide();
    }
  },

  //TODO: Improve errors formatting
  processErrors: function(responseText) {
    this.resetErrors();

    JSON.decode(responseText).errors.each(function(error) {
      this.errors.grab(new Element('li', {
        html: error[0] + " " + error.getLast()
      }));
    }.bind(this));

  }, 

  cancel: function(event) {
    if (event) { 
      event.stop();
    }
    if (this.options.hideOnCancel) {
      this.hide();
    }
    if (this.options.resetOnCancel) {
      this.reset();
    }
    this.fireEvent('cancel');
    return false;
  },

  reset: function() {
    if (this.options.validate) {
      this.resetErrors();
    }
    this.element.reset();
  },

  resetErrors: function() {
    if (this.errors) { 
      this.errors.set('html', '');
    }
  },

  hide: function() {
    var result = this.parent();
    if (this.options.resetOnHide) {
      this.reset();
    }
    return result;
  }

});

Vf.Form.Factory = Vf.Form.Factory || {};
