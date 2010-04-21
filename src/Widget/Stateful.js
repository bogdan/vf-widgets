//Copypasted this wonderful peace of code from Orwik



Vf.Stateful = function(state, enabler, disabler, changer) {
  if (!(state && enabler && disabler)) {
    throw new Error('State, enabler and disabler for stateful widget should be defined');
  }
  var getter = 'is' + state.capitalize();
  var proto = {
    setStatefulClassName: function(state, value) {
      this[value ? 'addClass' : 'removeClass'](this.getClassName(state));
    },

    onStateChange: function(state, value, args) {
      return this.setStatefulClassName.apply(this, arguments);
    },

    getClassName: function(state) {
      return 'ui-' + state;
    }

  };

  proto[getter] = function() {
    return this.hasClass(this.getClassName(state));
  };

  proto[enabler] = function() {
    if (this[getter]()) return false;

    if (Class.hasParent(arguments)) {
      this.parent.apply(this, arguments);
    }

    this.fireEvent(enabler, arguments);
    this.onStateChange(state, true, arguments);
    return true;
  };

  proto[disabler] = function() {

    if (!this[getter]()) return false;

    if (Class.hasParent(arguments)) {
      this.parent.apply(this, arguments);
    }

    this.fireEvent(disabler, arguments);
    this.onStateChange(state, false, arguments);
    return true;
  };

  if (changer) {
    proto[changer] = function(enable) {
      if ($defined(enable) ? enable : !this[getter]()) {
        return this[enabler]();
      } else {
        return this[disabler]();
      }
    };    
  }

  return new Class(proto);
};

