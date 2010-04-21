
Vf.TextInput = new Class({

  Extends: Vf.Input,

  options: {
    placeHolder: null
  },
  
  initialize: function() {
    this.parent.apply(this, arguments);
    this.initPlaceHolder();
  },

  /*
  *  API
  */

  blur: function() {
    this.parent();
    this.initPlaceHolder();
  },

  focus: function() {
    this.parent();
    this.initPlaceHolder();
  },
  
  /*
  *  Implementation
  */

  initPlaceHolder: function() {
    if(this.options.placeHolder && this.getValue() === "") {
      this.setValue(this.options.placeHolder);
    }
  }
});
