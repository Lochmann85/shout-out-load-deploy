'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.removeShoutsOfUser = exports.createShout = exports.cycle = exports.findAllShouts = undefined;

var _configurations = require('./../../../configurations');

var _models = require('./../../models');

var _convertMongooseToReadableError = require('./../../convertMongooseToReadableError');

var _convertMongooseToReadableError2 = _interopRequireDefault(_convertMongooseToReadableError);

var _errorsApi = require('./../../../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @function _populated
 * @description adds the needed shout population
 * @returns {Promise} of mongoose query
 */
var _populated = function _populated(query) {
   return query.populate("user").exec();
};

/**
 * @public
 * @function findAllShouts
 * @description looks for all Shouts
 * @returns {Promise} of Shouts
 */
var findAllShouts = function findAllShouts() {
   return _populated(_models.shoutModel.find()).then(function (shoutsQueue) {
      return shoutsQueue.reverse();
   }).catch(function (error) {
      return new _errorsApi.MongooseSingleError(error);
   });
};

/**
 * @private
 * @function _manageQueueSize
 * @description checks if the queue size is too large, if so deletes the first
 * @param {array} shownShoutsQueue - array of shown shouts
 * @returns {Promise} of shown shouts queue
 */
var _manageQueueSize = function _manageQueueSize(shownShoutsQueue) {
   var length = shownShoutsQueue.length;
   if (length > _configurations.MAX_SHOWN_SHOUTS) {
      return _models.shoutModel.findByIdAndRemove(shownShoutsQueue[length - 1].id).exec().then(function () {
         shownShoutsQueue.pop();
         return shownShoutsQueue;
      });
   } else {
      return shownShoutsQueue;
   }
};

/**
 * @public
 * @function cycle
 * @description cycles the table of shouts adds the new at front and deletes the last
 * @param {object} shoutModel - data for the new Shout
 * @returns {Promise} of shouts queue
 */
var cycle = function cycle(shoutModel) {
   return shoutModel.save().then(function (newShout) {
      return findAllShouts().then(function (allShouts) {
         return _manageQueueSize(allShouts);
      });
   }).catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function createShout
 * @description creates the new shout
 * @param {object} shoutData - data for the new Shout
 * @returns {Promise} of validated shout
 */
var createShout = function createShout(shoutData) {
   return new Promise(function (resolve, reject) {
      var shout = new _models.shoutModel(_models.shoutModel.alterShoutInput(shoutData)); // eslint-disable-line new-cap
      shout.validate(function (error) {
         if (error) {
            (0, _convertMongooseToReadableError2.default)(error).catch(reject);
         } else {
            resolve(shout);
         }
      });
   });
};

/**
 * @public
 * @function removeShoutsOfUser
 * @description removes all shouts of a given user
 * @param {object} userId - user id
 * @returns {Promise} of deleted shouts
 */
var removeShoutsOfUser = function removeShoutsOfUser(userId) {
   return _models.shoutModel.remove({ user: userId }).exec();
};

exports.findAllShouts = findAllShouts;
exports.cycle = cycle;
exports.createShout = createShout;
exports.removeShoutsOfUser = removeShoutsOfUser;