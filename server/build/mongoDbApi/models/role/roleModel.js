'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var roleSchema = new _mongoose2.default.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   isStatic: {
      type: Boolean
   },
   rules: [{ type: ObjectId, ref: "Rule" }]
}, { timestamps: true });

var duplicateErrorMessage = 'There already exists a role with the given name.';

roleSchema.plugin(_mongooseUniqueValidator2.default, { message: duplicateErrorMessage });

/**
 * @private
 * @function pre("findOneAndUpdate")
 * @description pre findOneAndUpdate middleware, states that the returned role is the new one
 */
roleSchema.pre("findOneAndUpdate", function (next) {
   this.options.runValidators = true;
   this.options.new = true;
   this.options.context = "query";
   next();
});

/**
 * @private
 * @function post("findOneAndUpdate")
 * @description post findOneAndUpdate middleware,
 * if the single role name validation does not pass the error message is changed
 */
roleSchema.post("findOneAndUpdate", function (error, user, next) {
   if (error.name === "MongoError" && error.code === 11000) {
      next({
         errors: [{
            key: "type",
            message: duplicateErrorMessage
         }]
      });
   } else {
      next(error);
   }
});

exports.default = {
   schema: roleSchema,
   name: "Role"
};