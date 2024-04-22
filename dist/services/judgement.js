"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.saveJudgement = exports.getJudgementResult = exports.getAll = exports.get = exports.del = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _judgement = _interopRequireDefault(require("../collections/judgement"));
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
 * @file: judgement.js
 * @description: It Contain function layer for judgement service.
 * @author: Pankaj Chaudhari
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

/********** Save config **********/
const saveJudgement = async payload => {
  let saveData = await _judgement.default.saveJudgement(payload);
  return {
    saveData
  };
};

/********** Get config by id **********/
exports.saveJudgement = saveJudgement;
const getAll = async payload => {
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
        title: {
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
  const queryObj = _judgement.default.find(matchObj);
  let count = await queryObj;
  let data = await queryObj.skip(skip).limit(limit).sort(sort);
  return {
    data: data,
    total: count.length
  };
};

/********** Get config by id **********/
exports.getAll = getAll;
const get = async payload => {
  let matchObj = {
    _id: _mongoose.default.Types.ObjectId(payload.id)
  };
  const queryObj = _judgement.default.find(matchObj, {
    updatedAt: 0,
    loginToken: 0,
    createdAt: 0,
    password: 0
  });
  return await queryObj;
};

/********** Update config **********/
exports.get = get;
const update = async (payload, jdgId) => {
  return await _judgement.default.findOneAndUpdate({
    _id: _mongoose.default.Types.ObjectId(payload._id)
  }, payload, {
    new: true
  });
};

/********** Delete Content **********/
exports.update = update;
const del = async payload => {
  return await _judgement.default.findOneAndUpdate({
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

/********** Get configresult from config **********/
exports.del = del;
const getJudgementResult = async payload => {
  // let matchObj = { Config_value: payload.Config_value }

  // const queryObj = CONFIGMODEL.find(matchObj, { updatedAt: 0, loginToken: 0, createdAt: 0, password: 0 });
  // return await queryObj

  try {
    let Config_value = payload.Config_value;
    console.log(Config_value, "ppppppp");
    const result = await _judgement.default.find({
      $and: [{
        min_value: {
          $lte: Config_value
        }
      }, {
        max_value: {
          $gte: Config_value
        }
      }]
    });
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
exports.getJudgementResult = getJudgementResult;