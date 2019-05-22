/*!
  * Bootstrap Tag Input v0.0.1 (https://iqbalfn.github.io/bootstrap-taginput/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global['bootstrap-tag-input'] = {}, global.jQuery));
}(this, function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'taginput';
  var VERSION = '0.0.1';
  var DATA_KEY = 'bs.taginput';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ENTER_KEYCODE = 13; // KeyboardEvent.which value for Enter key
  // const COMMA_KEYCODE      = 188 // KeyboardEvent.which value for Comma (,) key

  var COMMA_KEY = ',';
  var Default = {};
  var DefaultType = {};
  var Event = {
    CLICK_ITEM_DISMISS: "click.dismiss" + EVENT_KEY,
    FILTER_KEYDOWN: "keydown.filter" + EVENT_KEY
  };
  var ClassName = {
    CONTAINER: 'tag-input-container',
    FILTER: 'tag-input-filter',
    ITEMS: 'tag-input-items',
    VALUE: 'tag-input-value'
  };
  var Selector = {
    FILTER: "." + ClassName.FILTER,
    ITEMS: "." + ClassName.ITEMS,
    VALUE: "." + ClassName.VALUE,
    DISMISS_ITEM: ".close"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var TagInput =
  /*#__PURE__*/
  function () {
    function TagInput(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._parent = element.parentNode;
      this._items = this._parent.querySelector(Selector.ITEMS);
      this._input = this._parent.querySelector(Selector.VALUE);

      this._setInputListener();

      this._setFilterListener();

      this._setItemsListener();

      this._renderValue();
    } // Getters


    var _proto = TagInput.prototype;

    // Private
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._addItem = function _addItem(text) {
      if (this._values.includes(text)) return;
      var index = this._values.length;

      this._values.push(text);

      this._input.value = JSON.stringify(this._values);

      this._addListItem(text, index);
    };

    _proto._addListItem = function _addListItem(text, i) {
      var li = document.createElement('li');
      li.innerText = text;
      var btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', 'Delete');
      btn.setAttribute('data-dismiss', 'tag-item');
      btn.setAttribute('data-index', i);
      btn.classList.add('close');
      var span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = '&times;';
      btn.appendChild(span);
      li.appendChild(btn);

      this._items.appendChild(li);
    };

    _proto._removeItem = function _removeItem(index) {
      this._values.splice(index, 1);

      this._input.value = JSON.stringify(this._values);

      this._removeListItem(index);
    };

    _proto._removeListItem = function _removeListItem(index) {
      var el = this._items.querySelector('li:nth-child(' + (index + 1) + ')');

      this._items.removeChild(el);
    };

    _proto._setFilterListener = function _setFilterListener() {
      var _this = this;

      $(this._element).on(Event.FILTER_KEYDOWN, function (e) {
        if (e.keyCode !== ENTER_KEYCODE && e.key !== COMMA_KEY) return;
        e.preventDefault();

        var text = _this._element.value.trim();

        if (text) {
          _this._addItem(text);

          _this._element.value = '';
        }

        return false;
      });
    };

    _proto._setInputListener = function _setInputListener() {
      var _this2 = this;

      $(this._value).on('change', function () {
        _this2._renderValue();
      });
    };

    _proto._setItemsListener = function _setItemsListener() {
      var _this3 = this;

      $(this._items).on(Event.CLICK_ITEM_DISMISS, Selector.DISMISS_ITEM, function (e) {
        _this3._removeItem(parseInt(e.currentTarget.dataset.index));
      });
    };

    _proto._renderValue = function _renderValue() {
      $(this._items).html('');

      try {
        this._values = JSON.parse(this._input.value);
      } catch (e) {
        this._values = [];
      }

      if (!Array.isArray(this._values)) this._values = [];

      for (var i = 0; i < this._values.length; i++) {
        this._addListItem(this._values[i], i);
      }
    } // Static
    ;

    TagInput._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new TagInput(this, _config);
          $(this).data(DATA_KEY, data);
        }
      });
    };

    _createClass(TagInput, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return TagInput;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = TagInput._jQueryInterface;
  $.fn[NAME].Constructor = TagInput;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return TagInput._jQueryInterface;
  };

  exports.TagInput = TagInput;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap-tag-input.js.map
