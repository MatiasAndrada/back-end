"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// Language: javascript
var obj = {
  name: "coder",
  age: 2,
  country: "Argentina"
};
var name = obj === null || obj === void 0 ? void 0 : obj.name;

var Color = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, [{
    key: "get",
    value: function get() {
      var colorRandom = Math.floor(Math.random() * 16777215).toString(16);
      return "#".concat(colorRandom);
    }
  }]);

  return Color;
}();

var color = new color();
console.log(color.get());
