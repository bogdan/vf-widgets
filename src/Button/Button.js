

Vf.Button = new Class({
  Extends: Vf.Widget,


  initialize: function(element, options) {
    this.parent(element, options);
    this.addEventToElement('click');
  },


  click: function(event) {
    if (event) {
      event.stop();
    }
    this.fireEvent('click');
  }

});

Vf.Button.Factory = Vf.Button.Factory || {};
