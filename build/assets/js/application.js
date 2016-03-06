(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _phoenix = require("./phoenix");

var _phoenix2 = _interopRequireDefault(_phoenix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "ws://0.0.0.0:8080/websocket";

var Application = new _phoenix2.default(url),
    ApplicationElement = document.getElementById("application");

m.route.mode = "hash";
m.route(ApplicationElement, "/", {
  "/": Application.index,
  "/users/:userId": Application.users
});

},{"./phoenix":3}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(name) {
    _classCallCheck(this, Event);

    this.callbacks = [];
  }

  _createClass(Event, [{
    key: "registerCallback",
    value: function registerCallback(callback) {
      this.callbacks.push(callback);
    }
  }, {
    key: "unregisterCallback",
    value: function unregisterCallback(callback) {
      this.callbacks.filter(function (x) {
        return x == callback;
      });
    }
  }]);

  return Event;
}();

exports.default = Event;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webSocketHandler = require("./webSocketHandler");

var _webSocketHandler2 = _interopRequireDefault(_webSocketHandler);

var _index = require("./phoenix/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Phoenix = function Phoenix(url) {
  _classCallCheck(this, Phoenix);

  this.wsh = new _webSocketHandler2.default(url);
  this.index = _index2.default.init();
};

exports.default = Phoenix;

},{"./phoenix/index":4,"./webSocketHandler":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User() {
  var name = arguments.length <= 0 || arguments[0] === undefined ? m.prop("") : arguments[0];

  _classCallCheck(this, User);

  this.name = name;
};

var Index = {
  init: function init(wsh) {
    this.wsh = wsh;
  }
};

Index.controller = function () {
  var user = new User();
  return {
    user: user,
    login: function login(e) {
      console.log(user.name());
    }
  };
};

Index.view = function (ctrl) {
  return [m("input", { value: ctrl.user.name(), onchange: m.withAttr("value", ctrl.user.name) }), m("button", { onclick: function onclick(e) {
      return ctrl.login(e);
    } }, "Log in")];
};

exports.default = Index;

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require("./event");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebSocketHandler = function () {
  function WebSocketHandler(hostname) {
    var _this = this;

    _classCallCheck(this, WebSocketHandler);

    this.ready = false;
    this.ws = new WebSocket(hostname);
    this.ws.addEventListener("open", function (event) {
      return _this.onopen;
    });
  }

  _createClass(WebSocketHandler, [{
    key: "onopen",
    value: function onopen() {
      var _this2 = this;

      this.events = [];
      this.ws.addEventListener("message", function (event) {
        return _this2.onmessage;
      });
      this.ready = true;
    }
  }, {
    key: "send",
    value: function send(data) {
      var serializedData = JSON.stringify(data);
      this.ws.send(serializedData);
    }
  }, {
    key: "registerEvent",
    value: function registerEvent(event) {
      this.events[event] = new _event2.default(event);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, callback) {
      if (!this.events.hasOwnProperty(event)) {
        this.registerEvent(event);
      }
      this.events[event].registerCallback(callback);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event, callback) {
      if (this.events.hasOwnProperty(event)) {
        var index = this.events[event].callbacks.indexOf(callback);
        if (index == -1) {
          console.error("Tried to remove an unregistered callback function");
        } else {
          if (this.events[event].callbacks.length == 1) {
            delete this.events[event];
          } else {
            this.events[event].callbacks[index] = this.events[event].callbacks.pop();
          }
        }
      }
    }
  }, {
    key: "onmessage",
    value: function onmessage(event) {
      var data = JSON.parse(e.data);
      this.dispatchEvent(date.type, data);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event, state) {
      if (this.events.hasOwnProperty(event)) {
        this.events[event].callbacks.map(function (callback) {
          return callback(state);
        });
      } else {
        console.error(event + " is not registered.");
      }
    }
  }]);

  return WebSocketHandler;
}();

exports.default = WebSocketHandler;

},{"./event":2}]},{},[1])


//# sourceMappingURL=application.js.map
