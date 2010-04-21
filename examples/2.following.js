/*
*
* Follow/Unfollow button became very popular in social networks.
* This example demonstrate how it could be implemented
* using Vf.Widgets. 
*
* Expected DOM
*   
*   <div class='js-following'>
*     <a href="<%= follow_person_url(person)" class="js-follow"> Follow </a>
*     <a href="<%= unfollow_person_url(person)" class="js-unfollow ui-hidden"> Unfollow </a>
*   </div>
*
* Expected server side:
*   * follow person action - returned response doesn't matter
*   * unfollow person action - returned response doesn't matter
*
*/

Vf.Following = new Class({

  Extends: Vf.Controller,

  /*
  *  Definition of controller 'actors'
  */

  widgets: {
    followLink: {
      selector: 'a.js-follow', //widget selector scoped to current controller element
      clazz: Vf.Link, //class to wrap around selected element
      onSuccess: 'follow', //assigning this.follow function to be executed after ajax request successfuly completed
      method: 'post' //ajax request method that goes to server  
    },
    unfollowLink: {
      selector: 'a.js-unfollow',
      clazz: Vf.Link, //class to wrap around selected element
      onSuccess: 'unfollow', //assigning this.unfollow function to be executed after ajax request successfuly completed
      method: 'delete' //ajax request method that goes to server 
    }
  },


  /*
  *  Actions
  */

  follow: function() {
    this.followLink.hide();
    this.unfollowLink.show();
  },

  unfollow: function() {
    this.unfollowLink.hide();
    this.followLink.show();
  }
});

// wrapping Following controller around all element found on the page
$$('.js-following').each(function(element) {
  new Vf.Following(element);
});
