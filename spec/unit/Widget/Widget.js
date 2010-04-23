JSpec.describe('Vf.Widget', function(){
  before_each(function(){
    html = new Element('div');
    widget = new Vf.Widget(html);
  });


  describe('second wrap', function() {
    it('should return previous object', function() {
      expect(new Vf.Widget(html)).to(be, widget);
    });
  });

  describe('#hide', function(){
    before_each(function() {
      widget.hide();
    });

    it('should hide wrapped element', function(){
      expect(widget.isHidden()).should(equal, true);
    });
  });

  describe('#show', function(){
    before_each(function() {
      widget.hide();
      widget.show();
    });

    it('should show wrapped element', function(){
      expect(widget.isHidden()).should(equal, false);
    });
  });

  describe("#grab", function() {
    before_each(function() {
      widget.grab(new Element('i'));
    });

    it('should add element to inner html', function() {
      widget.getElement('i').should_not.be_null;
    });
  });

  describe("if widget is visible", function() {

    before_each(function() {
      widget.show();
    });

    describe("#toggle", function() {
      describe("without argument", function() {
        before_each(function() {
          widget.toggle();
        });
        it('should make widget hidden', function() {
          expect(widget.isHidden()).should(equal, true);
        });
      });
      describe("with false argument", function() {

        before_each(function() {
          widget.toggle(false);
        });

        it('should make widget hidden', function() {
          expect(widget.isHidden()).should(equal, true);
        });

      });
      describe("with true argument", function() {

        before_each(function() {
          widget.toggle(true);
        });

        it('should make widget visible(not hidden)', function() {
          expect(widget.isHidden()).should(equal, false);
        });

      });
    });

  });

  describe("if widget is hidden", function() {

    before_each(function() {
      widget.hide();
    });

    describe("#toggle", function() {
      describe("without argument", function() {
        before_each(function() {
          widget.toggle();
        });
        it('should make widget visible', function() {
          expect(widget.isHidden()).should(equal, false);
        });
      });
      describe("with false argument", function() {

        before_each(function() {
          widget.toggle(false);
        });

        it('should make widget hidden', function() {
          expect(widget.isHidden()).should(equal, true);
        });

      });
      describe("with true argument", function() {

        before_each(function() {
          widget.toggle(true);
        });

        it('should make widget visible', function() {
          expect(widget.isHidden()).should(equal, false);
        });

      });
    });

  });
  
  describe("#reinitialize", function(){
    describe("with string argument", function(){
      before_each(function(){
        widget.reinitialize("<div id='gg'>hello</div>");  
      });
      it("should replace existing element with new one", function(){

        widget.element.id.should.equal('gg');
      });
    });  
    describe("with element argument", function(){
      before_each(function(){
        widget.reinitialize(new Element('div', {id: 'gg'}));  
      });
      it("should replace existing element with new one", function(){
        widget.element.id.should.equal('gg');
      });
    });  
  });

  describe("#append", function(){
    before_each(function(){
      widget.append('<h1 id="new">new</h1>');    
    });    
    it("should append given text to inner html", function(){
      widget.getElement('h1').should_not.be_null;
    });
  });

});
