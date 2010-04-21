
JSpec.describe('Vf.Button', function(){
  before_each(function(){
    html = new Element('a', {href: 'http://google.com'});
    widget = new Vf.Button(html);
  });

  describe("#click", function(){
    it("should prevent default click event of the element", function(){
      html.fireEvent('click');
      widget.should_not.be_null;
    });  
  });

});
