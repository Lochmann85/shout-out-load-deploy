'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseChecker2 = require('./BaseChecker');

var _BaseChecker3 = _interopRequireDefault(_BaseChecker2);

var _errorsApi = require('./../../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotOwnRoleChecker = function (_BaseChecker) {
   _inherits(NotOwnRoleChecker, _BaseChecker);

   function NotOwnRoleChecker() {
      _classCallCheck(this, NotOwnRoleChecker);

      return _possibleConstructorReturn(this, (NotOwnRoleChecker.__proto__ || Object.getPrototypeOf(NotOwnRoleChecker)).apply(this, arguments));
   }

   _createClass(NotOwnRoleChecker, [{
      key: '_internalCheck',


      /**
       * @protected
       * @function _internalCheck
       * @description the internal check of the inherited class
       * @param {object} args - the args of the request
       * @param {object} viewer - the user model of the viewer
       * @returns {Promise} of permission
       */
      value: function _internalCheck(args, viewer) {
         return new Promise(function (resolve, reject) {
            if (args.roleId !== viewer.role.id) {
               resolve(true);
            } else {
               reject(new _errorsApi.ForbiddenError());
            }
         });
      }
   }]);

   return NotOwnRoleChecker;
}(_BaseChecker3.default);

;

exports.default = NotOwnRoleChecker;