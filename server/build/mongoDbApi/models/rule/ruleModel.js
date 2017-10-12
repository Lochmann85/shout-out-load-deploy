'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleSchema = new _mongoose2.default.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
});

var duplicateErrorMessage = 'There already exists a rule with the given name.';

ruleSchema.plugin(_mongooseUniqueValidator2.default, { message: duplicateErrorMessage });

exports.default = {
   schema: ruleSchema,
   name: "Rule"
};