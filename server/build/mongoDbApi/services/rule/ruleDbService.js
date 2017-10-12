'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.findAllRules = undefined;

var _models = require('./../../models');

var _errorsApi = require('./../../../errorsApi');

/**
 * @public
 * @function findAllRules
 * @description looks for all rules
 * @returns {Promise} of rules
 */
var findAllRules = function findAllRules() {
   return _models.ruleModel.find().exec().catch(function (error) {
      return new _errorsApi.MongooseSingleError(error);
   });
};

exports.findAllRules = findAllRules;