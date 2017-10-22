"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var shoutSchema = new _mongoose2.default.Schema({
   message: {
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true
   },
   user: {
      type: ObjectId,
      ref: "User",
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
      id: "",
      message: "",
      type: "Empty",
      user: { id: "", name: "" },
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
      user: shoutData ? shoutData.user : "",
      type: "Custom",
      shouldBeShown: true
   };
};

exports.default = {
   schema: shoutSchema,
   name: "Shout"
};