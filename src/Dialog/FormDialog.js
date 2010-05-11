/**
 *  wraps around the dialog that contains only a form.
 *  Forwards 'success' all form events
 *  @class FormDialog
 *  @namespace Vf
 *  @extends Vf.Dialog
 */
Vf.FormDialog = new Class({
  Extends: Vf.Dialog,

  widgets: {
    /**
     *  Form widget descriptor
     *  <h4>Default options</h4>
     *  <ul>
     *    <li>clazz: Vf.Form</li>
     *    <li>selector: 'form'</li>
     *    <li>required: true</li>
     *    <li>hideOnCancel: false</li>
     *    <li>onSuccess: 'success'</li>
     *    <li>onCancel: 'hide'</li>
     *  </ul>
     *  @property widgets.form
     *  @type Hash
     */
    form: {
      clazz: Vf.Form,
      selector: 'form',
      required: true,
      hideOnCancel: false,
      onSuccess: 'success',
      onCancel: 'hide'
    }
  },

  /*
  * Implementation
  */

  success: function(response) {
    this.hide();
    this.fireEvent('success', response);
  },

  hide: function() {
    this.parent();
    this.form.reset();
  }

});
