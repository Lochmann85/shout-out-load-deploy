"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseChecker2 = require("./BaseChecker");

var _BaseChecker3 = _interopRequireDefault(_BaseChecker2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReadRoleChecker = function (_BaseChecker) {
   _inherits(ReadRoleChecker, _BaseChecker);

   function ReadRoleChecker() {
      _classCallCheck(this, ReadRoleChecker);

      return _possibleConstructorReturn(this, (ReadRoleChecker.__proto__ || Object.getPrototypeOf(ReadRoleChecker)).apply(this, arguments));
   }

   _createClass(ReadRoleChecker, [{
      key: "_internalCheck",


      /**
       * @protected
       * @function _internalCheck
       * @description the internal check of the inherited class
       * @param {object} args - the args of the request
       * @param {object} viewer - the user model of the viewer
       * @returns {Promise} of permission
       */
      value: function _internalCheck(args, viewer) {
         return viewer.has("readRole");
      }
   }]);

   return ReadRoleChecker;
}(_BaseChecker3.default);

;

exports.default = ReadRoleChecker;