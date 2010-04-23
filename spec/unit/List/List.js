JSpec.describe("Vf.List", function(){
  before_each(function(){
    html = new Element('ul');
    counter = new Element('div');
    widget = new Vf.List(html, {counter: counter});
  });

  describe("on initialize", function(){
    it("should update counter", function(){
      widget.counter.get('html').should.equal('0');
    });  

    describe("#size", function(){
      it("should be 0", function(){
        widget.size().should.be(0);
      });  
    });
  });

  describe("#grab", function(){

    before_each(function(){
      item = new Element('div');
      widget.grab(item);
    });

    it("should increase size to 1", function(){
      widget.size().should.equal(1);
    });  

    it("should set counter to 1", function(){
      widget.counter.get('html').should.equal("1");
    });

    it("should occlude element with widget", function(){
      item.getParent().retrieve('widget').should_not.be_null;
    });


  });

  describe("#add", function(){
    before_each(function(){
      widget.add('<span id="new">hello</span>');
    });    
    it("should convert given string to html and add it as list item", function(){
      widget.getElement('span').should_not.be_null;
    });
  });

  describe("with two items", function(){
    before_each(function(){
      item = new Element('div');
      widget.grab(item);
      item = new Element('div');
      widget.grab(item);
    });  

    it("#size should be 2", function(){
      widget.size().should.be(2);
    });

    it("should have counter equal 2", function(){
      widget.counter.getHtml().should.be("2");
    });

    describe("#each", function(){
      before_each(function(){
        widget.each(function(item) {
          item.set('html', 'hello');
        });
      });  

      it("should iterate over items", function(){
        widget.items[0].get('html').should.equal('hello');
        widget.items[1].get('html').should.equal('hello');
      });
    });

    describe("on item destroy", function(){
      before_each(function(){
        widget.items[0].destroy();
      });

      it("should update counter", function(){
        widget.counter.getHtml().should.be("1");
      });  
    });
  });

});
