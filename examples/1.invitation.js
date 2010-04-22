/*
*
* Comparation of generic native MooTools code and Vf.Widgets code
* By implementing the inivitations management page.
* Let's say that we need to have 'Recall' and 'Resend' button near each pending 
* invitation to the project.
*
*/

/*
*
*  Expected DOM
*
*  <div id="invitation">
*    <%= invitation.receiver.email %>
*    <a href='<%= resend_invitation_url(invitation)%>' class='js-resend-invitation'> Resend </a>
*    <a href='<%= recall_invitation_url(invitation)%>' class='js-recall-invitation'> Recall </a>
*  </div>
*/

/*
*
* Here is how it may look like in native Mootools
*
*/
var Invitation = new Class({

  initialize: function(element) {
    this.element = element;
    this.recallLink = this.element.getElement('a.js-recall-invitation');
    if (recallLink) {
      this.recallLink.addEvent('click', function() {
        new Request({
          url: this.recallLink.href,
          method: 'delete',
          onSuccess: function() {
            this.element.destroy();
          }.bind(this)
        }).send();
      });
    }
    this.resendLink = this.element.getElement('a.js-resend-invitation');
    if (resendLink) {
      this.resendLink.addEvent('click', function() {
        new Request({
          url: this.resendLink.href,
          method: 'put',
          onSuccess: function() {
            new Element('span', {html: 'Resent'}).replaces(this.resendLink);
          }.bind(this)
        });
      });
    }
  },
});


/*
*
* Here is how it may look like in Vf.Widgets
*
*/
var Invitation = new Class({
  Extends: Vf.Controller,

  widgets: {
    resendLink: {
      clazz: Vf.Link,
      selector: 'a.js-resend-invitation',
      onSuccess: 'resend',
      method: 'put'
    },
    deleteLink: {
      clazz: Vf.Link,
      selector: 'a.js-expire-invitation',
      onSuccess: 'destroy',
      method: 'delete'
    }
  },

  resend: function(response) {
    new Element('div', {html: 'Resent'}).replaces(this.resendLink);
  }
});

/*
*
* If you think that second variant is easy and sweet
* then Vf.Widgets were made for you.
* See next examples for details how it works
*
*/
