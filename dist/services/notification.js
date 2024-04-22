"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotification = exports.saveNotification = exports.getNotification = exports.getAllNotification = exports.deleteNotification = exports.deleteImage = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _notification = _interopRequireDefault(require("../collections/notification"));
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
 * @author: Pankaj Chaudhari
 */

var {
  sendNotification,
  webNotification
} = require('../services/fcmService');
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
const saveNotification = async payload => {
  let saveData = await _notification.default.saveUser(payload);

  // Send notification using fcm firebase notification
  // let notify = await sendNotification(receiver,message,type,sendData,title );
  console.log(saveData);
  return {
    saveData
  };
};

/********** Get notification by id **********/
exports.saveNotification = saveNotification;
const getNotification = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _notification.default.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    password: 0
  });
  return await queryObj;
};

/********** Get all notification **********/
exports.getNotification = getNotification;
const getAllNotification = async payload => {
  let sort = {
    [payload.sortBy ? payload.sortBy : "createdAt"]: -1
  };
  let limit = payload.count ? JSON.parse(payload.count) : 20;
  payload.page = payload.page ? payload.page : 1;
  let skip = JSON.parse((payload.page - 1) * limit);
  let matchObj = {
    isDeleted: false
  };

  /****************Condition to check Search Parameters****************/
  if (payload.search) {
    payload.search = payload.search.toLowerCase();
    const regex = new RegExp(`${payload["search"]}`, "i");
    matchObj = {
      ...matchObj,
      $or: [{
        type: {
          $regex: regex
        }
      }]
    };
  }
  const queryObj = _notification.default.find(matchObj, {
    type: 1,
    title: 1,
    image: 1,
    message: 1,
    createdAt: 1
  });
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    notifications: data,
    total: count.length
  };
};

/********** Delete Notification **********/
exports.getAllNotification = getAllNotification;
const deleteNotification = async payload => {
  return await _notification.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload.id)
  }, {
    isDeleted: true
  }, {
    fields: {
      _id: 1
    },
    new: true
  });
};

/********** Update Notification **********/
exports.deleteNotification = deleteNotification;
const updateNotification = async payload => {
  console.log(payload);
  return await _notification.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload.id)
  }, payload, {
    new: true
  });
};
exports.updateNotification = updateNotification;
const deleteImage = async payload => {
  const {
    id,
    image
  } = payload;
  console.log(payload);
  const data = await _notification.default.findByIdAndUpdate(id, {
    $pull: {
      image: image
    }
  }, {
    new: true
  });
  console.log(data, "data");
  return data;
};
exports.deleteImage = deleteImage;