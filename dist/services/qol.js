"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQol = exports.saveQol = exports.getQolResult = exports.getQol = exports.getAllQol = exports.deleteQolVideo = exports.deleteQolImage = exports.deleteQol = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _qol = _interopRequireDefault(require("../collections/qol"));
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
 * @file: qol.js
 * @description: It Contain function layer for qol service.
 * @author: Siddhant Singh
 */

const {
  mailchimp_key,
  mailchimp_audience_id
} = _config.default.get("app");
_mailchimp_marketing.default.setConfig({
  apiKey: mailchimp_key,
  server: "us2"
});
const {
  frontendUrl
} = _config.default.get("app");
const formidable = require("formidable");
const form = formidable({
  multiples: true
});

/********** Save qol **********/
const saveQol = async payload => {
  let saveData = await _qol.default.saveQol(payload);
  return {
    saveData
  };
};

/********** Get qol by id **********/
exports.saveQol = saveQol;
const getAllQol = async payload => {
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
        description: {
          $regex: regex
        }
      }]
    };
  }

  // Add filter based on the 'type' field
  if (payload.type) {
    matchObj = {
      ...matchObj,
      type: payload.type
    };
  }
  const queryObj = _qol.default.find(matchObj, {
    type: 1,
    title: 1,
    description: 1,
    min_value: 1,
    max_value: 1,
    level: 1,
    createdAt: 1
  });
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length
  };
};

/********** Get qol by id **********/
exports.getAllQol = getAllQol;
const getQol = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _qol.default.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0
  });
  return await queryObj;
};

/********** Update qol **********/
exports.getQol = getQol;
const updateQol = async payload => {
  return await _qol.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload.id)
  }, payload, {
    new: true
  });
};

/********** Delete Content **********/
exports.updateQol = updateQol;
const deleteQol = async payload => {
  return await _qol.default.findOneAndUpdate({
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

/********** Get qolresult from config **********/
exports.deleteQol = deleteQol;
const getQolResult = async payload => {
  // let matchObj = { QOL_value: payload.QOL_value }

  // const queryObj = QOLMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
  // return await queryObj

  try {
    let QOL_value = payload.QOL_value;
    console.log(QOL_value, "ppppppp");
    const result = await _qol.default.find({
      $and: [{
        min_value: {
          $lte: QOL_value
        }
      }, {
        max_value: {
          $gte: QOL_value
        }
      }]
    });
    console.log(result);
    return result[0];
  } catch (error) {
    throw error;
  }
};
exports.getQolResult = getQolResult;
const deleteQolImage = async payload => {
  const {
    id,
    image
  } = payload;
  console.log(payload);
  const data = await _qol.default.findByIdAndUpdate(id, {
    $pull: {
      images: image
    }
  }, {
    new: true
  });
  console.log(data, "data");
  return data;
};

/********** Delete Qol Video **********/
exports.deleteQolImage = deleteQolImage;
const deleteQolVideo = async payload => {
  const {
    id,
    video,
    videoID
  } = payload;
  console.log(payload, "servicepayload");
  const data = await _qol.default.findByIdAndUpdate({
    _id: _mongoose.default.Types.ObjectId(id)
  }, {
    $pull: {
      videos: {
        videoURL: video
      }
    }
  }, {
    new: true
  });
  console.log(data, "data");
  return data;
};
exports.deleteQolVideo = deleteQolVideo;