JSpec.describe("Vf.Link", function(){
  before_each(function(){
    html = new Element('a', {href: 'http://example.com', html: 'go'});
    widget = new Vf.Link(html);
  });  
  describe("#click", function(){
    it("should submit ajax request", function(){
      mock_request().and_return('Submited', 'text/html');
      widget.should.receive('submit');
      widget.click();  
    });  
  });
});
