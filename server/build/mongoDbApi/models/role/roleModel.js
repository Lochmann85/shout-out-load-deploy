'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _ruleModel = require('./ruleModel');

var _ruleModel2 = _interopRequireDefault(_ruleModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {
//    possibleRules,
//    possibleRulesets
// } from './../../../authorizationApi/possibleRules';

var roleSchema = new _mongoose2.default.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   isStatic: {
      type: Boolean
   },
   rules: [_ruleModel2.default.schema]
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

/**
 * @public
 * @function buildRoleWithRules
 * @description builds a new role with the selected rules
 * @param {object} roleData - user input
 * @returns {Promise} of new Instance of role model
 */
// roleSchema.statics.buildRoleWithRules = function (roleData) {
//    return new Promise((resolve, reject) => {
//       const Rule = this.internalModels.Rule,
//          rules = [];
//       possibleRules.forEach(possibleRule => {
//          const rule = {
//             name: possibleRule.name,
//             ruleset: {}
//          };
//          const foundRule = roleData.rules.find(rule => rule.name === possibleRule.name);
//          if (foundRule)
//             rule.ruleset = foundRule.ruleset;
//          else
//             possibleRulesets.forEach(possibleRule => {
//                rule.ruleset[possibleRule] = false;
//             });
//          rules.push(new Rule(rule));
//       });

//       resolve(new this({
//          name: roleData.name,
//          rules,
//          isStatic: false
//       }));
//    });
// };

/**
 * @public
 * @function instantiateInternalModels
 * @description instantiates the models of the internally used schemas
 * @param {object} mongoDbConnection - the connection to the mongoDb
 */
roleSchema.statics.instantiateInternalModels = function (mongoDbConnection) {
   this.internalModels = {};
   this.internalModels[_ruleModel2.default.name] = mongoDbConnection.model(_ruleModel2.default.name, _ruleModel2.default.schema);
};

exports.default = {
   schema: roleSchema,
   name: "Role"
};