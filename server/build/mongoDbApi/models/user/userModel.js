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

var _errorsApi = require('./../../../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_ROUNDS = 10;
var PASSWORD_LENGTH = 6;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var passwordValidate = {
   validator: function validator(newPassword) {
      return newPassword.length >= PASSWORD_LENGTH;
   },
   message: "The new password is not of the required length (6+)"
};

var userSchema = new _mongoose2.default.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      validate: passwordValidate,
      required: true
   },
   role: {
      type: ObjectId,
      ref: "Role",
      required: true
   }
}, { timestamps: true });

var duplicateErrorMessage = "There already exists a user with the given name.";

userSchema.plugin(_mongooseUniqueValidator2.default, { message: duplicateErrorMessage });

/**
 * @private
 * @function _continueWithHashedPassword
 * @description hashes the passwor dand continues
 * @param {function} next - next step in pre mongoose middleware
 * @param {object} user - user object
 * @returns {Promise} of hash action
 */
var _continueWithHashedPassword = function _continueWithHashedPassword(next, user) {
   return _bcrypt2.default.hash(user.password, SALT_ROUNDS).then(function (hashedPassword) {
      user.password = hashedPassword;
      next();
   }).catch(function (error) {
      next(error);
   });
};

/**
 * @private
 * @function pre("save")
 * @description pre save middleware, hashes the password of each new user
 */
userSchema.pre("save", function (next) {
   var newUser = this;

   // only hash the password if it has been modified (or is new)
   if (!newUser.isModified("password")) return next();

   _continueWithHashedPassword(next, newUser);
});

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
      if (passwordValidate.validator(update["$set"].password)) {
         _continueWithHashedPassword(next, update["$set"]);
      } else {
         next({
            errors: { new: { message: passwordValidate.message } }
         });
      }
   } else {
      this.options.runValidators = true;

      return next();
   }
});

/**
 * @private
 * @function post("findOneAndUpdate")
 * @description post findOneAndUpdate middleware,
 * if the single username validation does not pass the error message is changed
 */
userSchema.post("findOneAndUpdate", function (error, user, next) {
   if (error.name === "MongoError" && error.code === 11000) {
      next({
         errors: { name: { message: duplicateErrorMessage } }
      });
   } else {
      next(error);
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
   var _this = this;

   return new Promise(function (resolve, reject) {
      _bcrypt2.default.compare(password, _this.password).then(function (isMatch) {
         if (isMatch) {
            resolve(_this);
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

exports.default = {
   schema: userSchema,
   name: "User"
};