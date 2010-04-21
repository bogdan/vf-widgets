describe("Vf.Controller", function(){
  before_each(function(){
    html = new Element('div');
    form = new Element('form');
    html.grab(form);
    subject = new Vf.Controller(html);  
  });  

  describe("#preprocessOptions", function(){
    before_each(function(){
      options = {a: 'hello', onSuccess: 'destroy'};
      subject.preprocessOptions(options);
    });  

    it("should convert on* attributes to functions", function(){
      $type(options.onSuccess).should.equal('function');
      options.onSuccess.toString().should.equal(subject.destroy.bind(subject).toString());
    });

    it("should not touch general options", function() {
      options.a.should.equal('hello');
    });

    describe("#createWidget", function(){

      it("should forward all given options to widget constructor", function(){
        widget = subject.createWidget(new Element('div'), {foo: 'bar'});
        widget.options.foo.should.equal('bar');
      });

      describe("when clazz option is not given", function(){
        before_each(function(){
          widget = subject.createWidget(new Element('div'), {});  
        });  
        it("should build new Vf.Widget", function(){
          widget.constructor.should.equal(Vf.Widget);
        });
      });
      describe("when clazz option is given", function(){
        before_each(function(){
          widget = subject.createWidget(new Element('div'), {clazz: Vf.Button});  
        });  
        it("should build new widget with class from 'clazz' option", function(){
          widget.constructor.should.equal(Vf.Button);
        });
      });
    });

    describe("#buildWidget", function(){
      describe("without multiple option", function(){
        
        before_each(function(){
          subject.buildWidget('form', {selector: 'form'});  
        });  
        
        it("should set given property to widget wraped arround found element", function(){
          subject.form.element.should.equal(form);
        });
      });
      describe("with multiple option", function(){
        
        before_each(function(){
          form2 = new Element('form');
          subject.grab(form2);
          subject.buildWidget('forms', {multiple: true, selector: 'form'});  
        });  
        
        it("should set given property to array of widgets wraped arround found elements", function(){
          subject.forms[0].element.should.equal(form);
          subject.forms[1].element.should.equal(form2);
        });

      });

      describe("#buildWidgets", function(){
        describe("without defaultOptions", function(){
          before_each(function(){
            subject.buildWidgets({form: {selector:'form'}});  
          });
            
          it("should #buildWidget for each property of given argument", function(){
            subject.form.element.should.be(form);
          });  
        });
        describe("with defaultOptions", function(){
          before_each(function(){
            subject.buildWidgets({form: {selector:'form'}}, {foo: 'bar'});  
          });
            
          it("should #buildWidget with specified default options mixed in", function(){
            subject.form.options.foo.should.be('bar');
          });  
        });
      });
    });
  });
});
