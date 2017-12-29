'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _validations = require('./../../validations');

var _errorsApi = require('./../../../errorsApi');

var _passwordEncription = require('./../../passwordEncription');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var userSchema = new _mongoose2.default.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      validate: _validations.emailValidation
   },
   name: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      validate: _validations.passwordValidation
   },
   resetPasswordToken: {
      type: String
   },
   role: {
      type: ObjectId,
      ref: "Role",
      required: true
   }
}, { timestamps: true });

var duplicateErrorMessage = "There already exists a user with the given {PATH}.";

userSchema.plugin(_mongooseUniqueValidator2.default, { message: duplicateErrorMessage });

/**
 * @public
 * @function saveWithHashedPassword
 * @param {object} userData - the new user data
 * @description hashes the password of each new user
 */
userSchema.methods.saveWithHashedPassword = function () {
   var _this = this;

   return new Promise(function (resolve, reject) {
      (0, _passwordEncription.continueWithHashedPassword)(function (error) {
         if (error) {
            reject(error);
         } else {
            _this.save().then(resolve).catch(reject);
         }
      }, _this);
   });
};

/**
 * @private
 * @function pre("findOneAndUpdate")
 * @description pre findOneAndUpdate middleware, states that the returned user is the new one
 */
userSchema.pre("findOneAndUpdate", function (next) {
   this.options.new = true;
   this.options.context = "query";

   var update = this.getUpdate();
   if (update["$set"] && update["$set"].hasOwnProperty("password")) {
      if (_validations.passwordValidation.validator(update["$set"].password)) {
         (0, _passwordEncription.continueWithHashedPassword)(next, update["$set"]);
      } else {
         next({ errors: { new: { message: _validations.passwordValidation.message } } });
      }
   } else {
      this.options.runValidators = true;
      return next();
   }
});

/**
 * @public
 * @function comparePassword
 * @description compares the given password with the password from the database
 * @param {string} password - password of user
 * @returns {Promise} of user
 */
userSchema.methods.comparePassword = function (password) {
   var _this2 = this;

   return new Promise(function (resolve, reject) {
      _bcrypt2.default.compare(password, _this2.password).then(function (isMatch) {
         if (isMatch) {
            resolve(_this2);
         } else {
            reject(new _errorsApi.CustomError("WrongPassword", {
               message: "Please provide the correct password.",
               key: "password"
            }));
         }
      }).catch(function (error) {
         return reject(new _errorsApi.InternalServerError({
            message: error.message,
            key: "BCRYPT_ERROR"
         }));
      });
   });
};

/**
 * @public
 * @function check
 * @description checks the allowance dependend on the own rules
 * @param {object} allowance - the needed allowance
 * @param {object} args - the args of the request
 * @returns {Promise} of permission granted
 */
userSchema.methods.check = function (allowance, args) {
   var _this3 = this;

   return new Promise(function (resolve, reject) {
      if (_this3.role && Array.isArray(_this3.role.rules)) {
         resolve(true);
      } else {
         reject(new _errorsApi.ForbiddenError());
      }
   }).then(function () {
      return allowance.check(args, _this3);
   });
};

/**
 * @public
 * @function has
 * @description checks if the user has a rule
 * @param {string} ruleName - the name of the rule
 * @returns {Promise} of found rule
 */
userSchema.methods.has = function (ruleName) {
   var _this4 = this;

   return new Promise(function (resolve, reject) {
      var foundRule = _this4.role.rules.find(function (viewerRule) {
         return viewerRule.name === ruleName;
      });
      if (foundRule) {
         resolve(true);
      } else {
         reject(new _errorsApi.ForbiddenError());
      }
   });
};

exports.default = {
   schema: userSchema,
   name: "User"
};