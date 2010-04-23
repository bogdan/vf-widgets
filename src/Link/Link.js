
Vf.Link = new Class({

  Extends: Vf.Button,

  options: {
    spinnerTarget: null,
    submitOnClick: true,
    method: 'get'
  },

  /*
  *  API
  */

  click: function(event) {
    if (this.options.submitOnClick) {
      this.submit();
    }
    this.parent(event);
    return false;
  },

  submit: function() { 
    if ($(this.options.lock)) {
      this.lockMask = new Mask(this.options.lock);
      this.lockMask.show();
    }
    new Request({
      url: this.element.href,
      method: this.element.get('js-method') || this.options.method,
      evalResponse: false,
      evalScripts: false,
      onSuccess: this.success.bind(this),
      onFailure: this.failure.bind(this),
      onComplete: this.complete.bind(this),
      useSpinner: true,
      spinnerTarget: this.options.spinnerTarget
    }).send();
    this.fireEvent('submit');
  },

  /*
  *  Implementation
  */

  success: function(responseText) {
    this.fireEvent('success', responseText);
  },

  failure: function(xhr) {
    this.fireEvent('failure', xhr.responseText);
  },

  complete: function() {
    if (this.lockMask) {
      this.lockMask.destroy();
    }
    this.fireEvent('complete');
  }

});

Vf.Link.Factory = Vf.Link.Factory || {};
