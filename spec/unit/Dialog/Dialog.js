JSpec.describe("Vf.Dialog", function(){

  before_each(function(){
    html = new Element('div');
    widget = new Vf.Dialog(html);
  });  

  it("should add 'modalDialogClass' to the element", function(){
    expect(html.get('class')).to(be, widget.options.modalDialogClass);  
  });

  describe("if overlay is set", function(){
    before_each(function(){
      widget.options.overlay = true;  
    });  
    describe("on show", function(){
      before_each(function(){
        widget.show();  
      });
      it("should show overlay", function(){
        widget.overlay.isHidden().should.be(false);
      });  
      describe("on hide", function(){
        before_each(function(){
          widget.hide();  
        });  
        it("should hide overlay", function(){
          widget.overlay.isHidden().should.be(true);
        });
      });
    });


  });

  describe("with close button", function(){
    before_each(function(){
      closeButton = new Element('a', {'class': 'js-close-dialog'});
      html.grab(closeButton);
      widget.initWidgets();
    });

    describe("on close button click", function(){
      before_each(function(){
        closeButton.fireEvent('click');
      });  
      it("should hide dialog", function(){
        widget.isHidden().should.be(true);
      });
    });
  });

});
