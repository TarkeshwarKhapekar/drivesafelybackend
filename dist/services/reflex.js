"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReflex = exports.saveReflexScreen = exports.getReflexScreen = exports.deleteReflexImage = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _reflex = _interopRequireDefault(require("../collections/reflex"));
var _messages = _interopRequireDefault(require("../utilities/messages"));
var _universal = require("../utilities/universal");
var COMMON = _interopRequireWildcard(require("./common"));
var Mail = _interopRequireWildcard(require("../utilities/mail"));
var _config = _interopRequireDefault(require("config"));
var _mailchimp_marketing = _interopRequireDefault(require("@mailchimp/mailchimp_marketing"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: notification.js
 * @description: It Contain function layer for notification service.
 * @author: Manas Agrawal
 */

const {
  mailchimp_key,
  mailchimp_audience_id
} = _config.default.get('app');
_mailchimp_marketing.default.setConfig({
  apiKey: mailchimp_key,
  server: 'us2'
});
const {
  frontendUrl
} = _config.default.get("app");
const formidable = require("formidable");
const form = formidable({
  multiples: true
});

/********** Save notification **********/
const saveReflexScreen = async payload => {
  let saveData = await _reflex.default.saveReflexScreen(payload);
  console.log(saveData);
  return saveData;
};

/********** Get Reflex Screen **********/
exports.saveReflexScreen = saveReflexScreen;
const getReflexScreen = async payload => {
  const queryObj = _reflex.default.find();
  return await queryObj;
};

/********** Update Reflex **********/
exports.getReflexScreen = getReflexScreen;
const updateReflex = async payload => {
  const {
    _id,
    reflexscreen1,
    reflexscreen2
  } = payload;
  const updateFields = {};
  if (typeof reflexscreen1 === 'string' && reflexscreen1.trim() !== '') {
    updateFields.reflexscreen1 = reflexscreen1;
  }
  if (typeof reflexscreen2 === 'string' && reflexscreen2.trim() !== '') {
    updateFields.reflexscreen2 = reflexscreen2;
  }
  if (Object.keys(updateFields).length === 0) {
    // No valid fields to update, return early
    return null;
  }
  const data = await _reflex.default.findByIdAndUpdate({
    _id: _id
  }, {
    $set: updateFields
  }, {
    new: true
  });
  return data;
};
exports.updateReflex = updateReflex;
const deleteReflexImage = async payload => {
  const {
    id,
    image,
    identifier
  } = payload;
  console.log(payload, "payload");
  let delImg;
  if (identifier == 'img1') {
    delImg = {
      $unset: {
        reflexscreen1: image
      }
    };
  }
  if (identifier == 'img2') {
    delImg = {
      $unset: {
        reflexscreen2: image
      }
    };
  }
  const data = await _reflex.default.findByIdAndUpdate({
    _id: _mongoose.default.Types.ObjectId(id)
  }, delImg, {
    new: true
  });
  console.log(data, "data");
  return data;
};
exports.deleteReflexImage = deleteReflexImage;