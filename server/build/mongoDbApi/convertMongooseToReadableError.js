'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _errorsApi = require('./../errorsApi');

/**
 * @public
 * @function convertMongooseError
 * @description converts a mongoose error to a readable error
 * @param {object} mongooseError - the error object
 * @returns {Promise} of errors
 */
var convertMongooseError = function convertMongooseError(mongooseError) {
   var errors = [];
   if (mongooseError.errors) {
      Object.keys(mongooseError.errors).forEach(function (key) {
         errors.push({
            message: mongooseError.errors[key].message,
            key: key
         });
      });
   } else if (mongooseError.message) {
      errors.push({
         message: mongooseError.message,
         key: mongooseError.path
      });
   } else {
      errors.push({ message: mongooseError });
   }

   var error = new _errorsApi.MongooseValidationError(errors);
   return Promise.reject(error);
};

exports.default = convertMongooseError;