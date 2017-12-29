'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _BaseJwtTokenHandler2 = require('./../BaseJwtTokenHandler');

var _BaseJwtTokenHandler3 = _interopRequireDefault(_BaseJwtTokenHandler2);

var _errorsApi = require('./../../errorsApi');

var _configurations = require('./../../configurations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignupTokenHandler = function (_BaseJwtTokenHandler) {
   _inherits(SignupTokenHandler, _BaseJwtTokenHandler);

   /**
   * @public
   * @function constructor
   * @description constructor of graphql jwt
    */
   function SignupTokenHandler() {
      _classCallCheck(this, SignupTokenHandler);

      var _this = _possibleConstructorReturn(this, (SignupTokenHandler.__proto__ || Object.getPrototypeOf(SignupTokenHandler)).call(this, _configurations.SIGNUP_JWT_SECRET, 60 * 30 /*30 min*/));

      _this._tokenExpiredError = function () {
         return new _errorsApi.CustomError("SignupTokenExpired", {
            message: "The signup E-Mail is expired. Please try again.",
            key: "token"
         });
      };

      return _this;
   }

   /**
    * @protected
    * @function _tokenExpiredError
    * @description the error which is used when the token is expired
    * @returns {object} error object
    */


   return SignupTokenHandler;
}(_BaseJwtTokenHandler3.default);

;

exports.default = SignupTokenHandler;