describe("Vf.Form", function(){
  before_each(function(){
    html = new Element('form');
    submitButton = new Element('a', {'class': 'js-submit-form'});
    html.grab(submitButton);
    cancelButton = new Element('a', {'class': 'js-cancel-form'});
    html.grab(cancelButton);
    widget = new Vf.Form(html);
  });
    
  describe("on initialize", function(){

    it("should assign submit on click on submitButton", function(){
      widget.submitButton.$events['click'].should_not.be_null;
    });

    it("should assign cancel on click on cancelButton", function(){
      widget.cancelButton.$events['click'].should_not.be_null;
    });

  });
                
});
