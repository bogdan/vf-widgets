
Vf.Form.Factory.listAppender = function(element, targetList, formOptions) {
  var form = new Vf.Form(element, formOptions);
  if (targetList) {
    form.addEvent('success', function(responseHtml) {
      targetList.grab(responseHtml);
    });
  }
  return form;
};

