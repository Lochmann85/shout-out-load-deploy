"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleSchema = new _mongoose2.default.Schema({
   name: {
      type: String,
      required: true
   },
   ruleset: {
      read: {
         type: Boolean,
         required: true
      },
      write: {
         type: Boolean,
         required: true
      },
      delete: {
         type: Boolean,
         required: true
      }
   }
});

exports.default = {
   schema: ruleSchema,
   name: "Rule"
};