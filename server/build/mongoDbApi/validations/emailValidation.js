"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _validator = require("validator");

exports.default = {
   validator: function validator(newEMail) {
      return (0, _validator.isEmail)(newEMail) && !(0, _validator.isEmpty)(newEMail);
   },
   message: "Please provide a correct E-Mail."
};