/**
 *
 * TODO: Under constraction
 *
 */

Vf.ConfirmDialog = new Class({

  Extends: Vf.Dialog,


  widgets: {
    confirmButton: {
      clazz: Vf.Button,
      selector: 'a.js-confirm',
      onClick: 'success',
      required: true
    },

    cancelButton: {
      clazz: Vf.Button,
      selector: 'a.js-cancel',
      onClick: 'cancel',
      required: true
    }
  },

  success: function() {
    this.hide();
    this.fireEvent('success');
  },

  cancel: function() {
    this.hide();
    this.fireEvent('cancel');
  }

});
