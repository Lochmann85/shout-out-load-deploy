"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shoutSchema = new _mongoose2.default.Schema({
   message: {
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true
   },
   shouldBeShown: {
      type: Boolean,
      required: true
   }
}, { timestamps: true });

/**
 * @public
 * @function getEmptyShout
 * @description get empty shout skeleton
 * @returns {object} empty shout skeleton
 */
shoutSchema.statics.getEmptyShout = function () {
   return {
      message: "",
      type: "Empty",
      shouldBeShown: false
   };
};

/**
 * @public
 * @function alterShoutInput
 * @description adds to the shout input data for the shout skeleton
 * @returns {object} empty shout skeleton
 */
shoutSchema.statics.alterShoutInput = function (shoutData) {
   return {
      message: shoutData ? shoutData.message : "",
      type: "Custom",
      shouldBeShown: true
   };
};

exports.default = {
   schema: shoutSchema,
   name: "Shout"
};