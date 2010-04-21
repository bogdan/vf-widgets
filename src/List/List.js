Vf.List = new Class({

  Extends: Vf.Controller,

  options: {
    counter: null,
    itemClass: Vf.Widget,
    counterFormat: function(size) {
      return size;
    },
    grabPosition: 'bottom'

  },

  widgets: {
    items: {
      selector: 'li',
      multiple: true
    },
    counter: {
      selector: null,
      global: true
    }
  },

  initialize: function(element, options) {
    this.widgets.counter.selector = options.counter;
    this.parent.apply(this, arguments);
    this.widgets.items.clazz = this.options.itemClass;
    this.each(this.subscribeToItem.bind(this));
    this.updateCounter();
  },

  /*
  *  API
  */

  grab: function(item, position) {
    var li = new Element(
      this.getItemTag(), 
      {'class': this.getItemClass()}
    ).adopt(item);
    if (!$defined(position)) {
      position = this.options.grabPosition;
    }
    this.parent(li, position);
    var newItem = new this.widgets.items.clazz(li);
    this.subscribeToItem(newItem);
    if (position == 'top') {
      this.items = [newItem].combine(this.items);
    } else {
      this.items[this.size()] = newItem;
    }
    
    this.updateCounter();
  },

  each: function(processor) {
    this.items.each(function(item) {
      processor(item);
    });
  },

  size: function() {
    return this.items.length;
  },



  /*
  *  Implementation
  */

  updateCounter: function() {
    if (this.counter) {
      this.counter.set('html', this.options.counterFormat(this.size()));
    }
  },

  subscribeToItem: function(item) {
    item.addEvent('destroy', this.itemDestroy.bind(this, item));
  },

  itemDestroy: function(item) {
    this.items = this.items.erase(item);
    this.updateCounter();
  },

  getItemTag: function() {
    return this.widgets.items.selector.split('.')[0];
  },

  getItemClass: function() {
    return this.widgets.items.selector.split('.')[1];
  }



});
