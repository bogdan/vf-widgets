Vf.FormDialog = new Class({
  Extends: Vf.Dialog,

  widgets: {
    form: {
      clazz: Vf.Form,
      selector: 'form',
      required: true,
      hideOnCancel: false,
      onSuccess: 'success',
      onCancel: 'hide'
    }
  },


  success: function(response) {
    this.hide();
    this.fireEvent('success', response);
  },

  hide: function() {
    this.parent();
    this.form.reset();
  }

});
