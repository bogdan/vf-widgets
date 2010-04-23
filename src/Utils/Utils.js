Vf.Utils = {

  toElement: function(elementOrHtmlString) {
    var container = new Element('div');
    switch ($type(elementOrHtmlString))  {
      case 'string':
        container.set('html', elementOrHtmlString);
      break;
      case 'element':
        container.adopt(elementOrHtmlString);
      break;
      default:
        throw new Error('Element type not supported');
    }
    if (container.getChildren().length == 1) {
      return container.getChildren()[0];
    } else {
      throw new Error("Given input contains more then one element");
    }
  },

  toHtml: function(string) {
    var container = new Element('div');
    container.set('html', string);
    return container.children;
  },

};
