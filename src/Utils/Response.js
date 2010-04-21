Vf.Response = new Class({

  initialize: function(text){
    this.text = text;
  }, 

  toJson: function(){
    return JSON.decode(this.text);
  }, 

  toElement: function(){
    return Utils.toElement(this.text);
  },

  toHtml: function() {
    return Utils.toHtml(this.text);
  },

  getScripts: function() {
    var javascript;
    text.stripScripts(function(script){
      javascript = script;
    });
    return javascript; 
  }

});
