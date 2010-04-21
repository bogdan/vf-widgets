/**
 *
 * TODO: Under constraction
 *
 */

Vf.ConfirmDialog = new Class({

  Extends: Vf.Dialog,


  buttons: {
    confirmButton: {
      selector: 'a.js-confirm',
      onClick: 'success',
      required: true
    },

    cancelButton: {
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
