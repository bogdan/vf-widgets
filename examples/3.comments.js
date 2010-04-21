/*
* This example represents a typical problem of comments posting.
* I call this pattern: List with appender(form)
*
* Expected DOM:
* <div id="comments">
*   <ul>
*     <li>
*       <div class='body'>
*         Nice post
*       </div>
*       <a href="<%= edit_comment_url %>" class="js-edit-comment"> Post </input>
*     </li>
*   </ul>
*   
*   <form action='<%= post_comment_url %>'>
*     <textarea name='body'/>
*     <input type='button' class='js-submit-form'> Edit </input>
*   </form>
* </div>
*
* Expected server side:
* 
*   * update comment action - returns html with comment layout
*     <div class='body'>
*       <%= comment.body %>
*     </div>
*     <a href="<%= edit_comment_url(comment) %>" class="js-edit-comment"> Edit </input>
*
*   * post comment action - returns html with comment layout
*     <div class='body'>
*       <%= comment.body %>
*     </div>
*     <a href="<%= edit_comment_url(comment) %>" class="js-edit-comment"> Edit </input>
*
*   * edit comment action - return html with comment form
*     <form action='<%= post_comment_url %>'>
*       <textarea name='body'><%= comment.body %></textarea>
*       <input type='button' class='js-submit-form'> Update </input>
*     </form>
*
*/


Vf.Comment = new Class({

  Extends: Vf.Controller,

  widgets: {
    editLink: {
      clazz: Vf.Link,
      select: 'a.js-edit-comment',
      onSuccess: 'edit'
    },
    form: {
      clazz: Vf.Form,
      select: 'form', 
      onSuccess: 'update'
    }
  },

  // responseText suppose to be an html with edit comment form
  edit: function(responseText) {
    this.append(responseText, 'bottom');
    this.buildWidget(this.widgets.form);
  },

  // responseText suppose to be an html with comment layout
  update: function(responseText) {
    this.reinitialize(responseText); //reinitializing widget with new received layout
  }


});

Vf.Comments = new Class({

  Extends: Vf.Controller,

  widgets: {
    comments: {
      clazz: Vf.List,
      selector: 'ul',
      itemClass: Vf.Comment
    },
    
    form: {
      clazz: Vf.Form,
      selector: 'form',
      itemClass: Vf.Form,
      onSuccess: 'append',
      resetOnSuccess: true
    }
  },


  //responseText suppose to be html layout of new created comment
  append: function(responseText) {
    //converting string to html and appending it to the bottom of the list
    // as new list element(<li>)
    this.list.grab(Utils.toHtml(responseText)); 
  },


});

new Vf.Comments('comments');
