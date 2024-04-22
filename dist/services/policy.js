"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePolicy = exports.savePolicy = exports.getAllPolicy = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _policy = _interopRequireDefault(require("../collections/policy"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var COMMON = _interopRequireWildcard(require("./common"));
var Mail = _interopRequireWildcard(require("../utilities/mail"));
var _config = _interopRequireDefault(require("config"));
var _mailchimp_marketing = _interopRequireDefault(require("@mailchimp/mailchimp_marketing"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: policy.js
 * @description: It Contain function layer for policy service.
 * @author: Siddhant Singh
 */

const {
  mailchimp_key,
  mailchimp_audience_id
} = _config.default.get('app');
_mailchimp_marketing.default.setConfig({
  apiKey: mailchimp_key,
  server: 'us2'
});

/********** Save Policy **********/
const savePolicy = async payload => {
  console.log(payload, "pauload");
  let saveData = await _policy.default.savePolicy(payload);
  return {
    saveData
  };
};

/********** Get policy  **********/
exports.savePolicy = savePolicy;
const getAllPolicy = async () => {
  const queryObj = _policy.default.find();
  let count = await queryObj;
  return count;
};

/********** Update Policy **********/
exports.getAllPolicy = getAllPolicy;
const updatePolicy = async payload => {
  const update = await _policy.default.findByIdAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload._id)
  }, payload, {
    new: true
  });
  console.log(update);
  return update;
};
exports.updatePolicy = updatePolicy;